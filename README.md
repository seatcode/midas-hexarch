<img alt="Hexagonal Architecture MIDAS FE" width="584" src="https://user-images.githubusercontent.com/4168389/161611798-da1be7af-4c88-4d01-94ad-0e153aea7710.png" />

> Reference for Hexagonal Architecture in the MIDAS project

- [Disclaimer](#disclaimer)
- [Introduction](#introduction)
- [Usage from React](#usage-from-react)
- [Concepts](#concepts)
  - [Domain](#domain)
  - [Config](#config)
  - [Models in general](#models-in-general)
  - [Types](#types)
  - [Context](#context)
- [Domain pieces](#domain-pieces)
  - [Dependency Injection](#dependency-injection)
    - [Import rules](#import-rules)
    - [Factory](#factory)
  - [Models](#models)
  - [Use Cases](#use-cases)
  - [Services](#services)
  - [Mappers](#mappers)
  - [Repositories](#repositories)

## Disclaimer

> ⚠️ **This is definitely not a complete guide to Hexagonal Architecture.**

The  contents of this file are 100% tailored to the MIDAS Frontend project, and may or may not agree to any other Hexagonal Architecture implementations.

Also, be aware that this is still new to the project and not every possible scenario is covered. The topic is huge, but we hope that this document helps in grasping what's needed to start applying it.

That said, if you feel something is missing (which will) feel free to raise it so we can progressively reach the point where no important doubts are left.

## Introduction

A Frontend framework like [React](https://reactjs.org) is awesome, it brings in a modular approach to our UI logic while still providing relationships to understand how every piece relates each other.

But a complex business product needs more than UI logic. As the project grows, we may realize there's a growing amount of logic in no man's land.

Of course you can move that logic into separated files, but then you'll lack relationships and that's a problem you'll eventually suffer from.

This is [business logic](https://en.wikipedia.org/wiki/Business_logic), and some [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) exist to deal with it. Proven ways of organizing and relating all of its relevant pieces. [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) is one of those patterns.

## Usage from React

Imagine you're building an online shop and you've got this fancy Cart component:

```tsx
function Cart({ items }) {
  return (
    <div>
      {items.map(item => <ProductCard item={item} />)}
    </div>
  )
}
```

Now, we want to be able to remove a product from the cart. To do that, let's add a handler function as always:

```diff
function Cart({ items }) {
+ const handleRemove = async id => {
+   // TODO: Remove a product from the cart API
+ }

  return (
    <div>
-     {items.map(item => <ProductCard item={item} />)}
+     {items.map(item => (
+       <ProductCard item={item} onRemove={handleRemove} />
+     ))}
    </div>
  )
}
```

Then, the function is ready to be filled with the API call, dealing with the response, transforming it, updating the local storage entry for the cache... OR, we can have all that done by the domain.

To use the domain, we have to import the hook and consume it:

```diff
+import { useDomain } from 'domain/react'

function Cart({ items }) {
+ const domain = useDomain()
```

And we're good to go:

```tsx
const handleRemove = async id => {
  // We first get the use case
  const removeItem = await domain.cart.RemoveItemUseCase.get()
  // Then we can execute it
  await removeItem.execute({ id })
}
```

You may be wondering why there's two steps to it. Why do I have to "get" the use case first? Why not just execute the use case as if it were a function? Well, the answer is [code splitting](https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting).

By doing this, the code from `RemoveItemUseCase` will not be downloaded until the remove button is clicked, which reduces the whole app bundle size. This has many performance benefits.

Now, let's take a closer look at the parts:

<p align="center"><image width="656" src="https://user-images.githubusercontent.com/4168389/161741685-2268ff49-8f0a-4119-951c-05fa5d9bf892.png" /></p>

So, after awaiting the promise that `get()` returns, we have the requested use case ready to use in a variable. No mystery here, all use cases have a single method called execute:

<p align="center"><image width="502" src="https://user-images.githubusercontent.com/4168389/161743734-2e1e6fc5-08e2-43f5-a613-b66b450f4674.png" /></p>

And that's it! Now we obviously would have to implement the RemoveItemUseCase so it does what it's supposed to do. But before we can go down that road we need to make some concepts clear.

## Concepts

### Domain

The whole business logic is enclosed within the domain. The inner pieces of the domain can interact with each other, but can't interact with the outside.

From the outside perspective, the domain is a black box. The only thing you can see from the domain in the React side is:

- A list of use cases grouped by context.
- The domain's config object.

There is an actual folder in the project that is called `domain` and looks like this:

```
domain
|- config/
|- [contextA]/
|- [contextB]/
|- [contextC]/
|- types/
|- entry.ts
|- models.ts
|- react.ts
```

### Config

- It's a plain object that can be read from any domain piece.
- It can also be read from the outside of the domain.
- It's aware of the environment.

The config folder looks like this:

```
config
|- config.development.ts
|- config.production.ts
|- config.test-env.ts
|- config.ts
```

### Models in general
  - They're private, meant to be consumed from the inside of the domain.
  - They're contracts to ensure a certain structure is enforced in specific domain pieces or data you create afterwards.
  - They're TypeScript types and abstract classes.
  - Cannot be used outside the domain.

### Types
  - They're public, meant to be consumed from the outside of the domain.
  - They're only written inside the use cases, to support dealing with use case execution results from the outside.
  - Cannot be used inside the domain.

### Context

A context is a group of logic that is related by some topic. Providing a clear name for a context is especially important, as it will give sense to everything it contains.

Any domain piece must be enclosed within a specific context, and the resulting directory for a `cart` context looks like this:

```
cart
|- models/
|- useCases/
|- services/
|- mappers/
|- repositories/
```

Let's dig into what those domain pieces are.

## Domain pieces

If the building blocks of React are components, then the building blocks of the domain are:

- Models
- Use Cases
- Services
- Mappers
- Repositories

All of them can use models, but not all of them can use every other kind of piece. For example, a repository cannot use a mapper. All the constraints are covered per each piece below.

### Dependency Injection

This a technique in which a class instance receives all it needs from the constructor, rather than directly importing the required modules at the beginning of the file as it's usually done in JS.

This is done in Hexagonal Arquitechture for two reasons:

- The entire domain works as a singleton.
  - This way we have a single instance of the config that is readable from any point of the domain.
- Any domain piece can be easily replaced by another dependency that meets the criteria (adapter pattern).

For all of this to happen, we must respect some (not to) import rules and use something called factory pattern, which is covered below.

#### Import rules

- ✅ Models can be directly imported everywhere inside the domain.
- 🚫 **Importing something else that is not a model is strictly forbidden out of factories.**

Use cases, services, mappers and repositories that are not models can only be injected as dependencies through a factory.

#### Factory

This is a file that is present in every domain piece folder and it's in charge of creating an instance for its adjacent domain piece.

Factories can import:

- Other factories
- 3rd party packages

The purpose of a factory is supporting the injection of dependencies by providing the domain piece that is instantiated with the dependencies it requires.

> Note: The config should always be injected as a dependency.

### Models

They're contracts so we clearly know:

- The shape of any piece of data we're using accross all the domain pieces.
- The shape that a given repository implementation has to match (adapter pattern).

All the models are actually TypeScript interfaces, types, and abstract classes. But they are named after the following categories:

| Name pattern | It's an... | Purpose |
|-|-|-|
| `[DataName]Entity` | _Interface_ | Unique data that has an `id` |
| `[DataName]Value` | _Interface_ | Data that is not unique |
| `[DataName]Response` | _Interface_ | A response from a specific repository method |
| `[Object]Repository` | _Abstract class_ | An expected repository implementation |

Some name examples: `ProductEntity`, `ProductListValue`, `ProductListResponse`, `ProductRepository`.

### Use Cases

Name pattern: `[Action][Object]UseCase`

A use case is a public action that can be triggered from the outside of the domain. It's impelemented as a class with a single public asynchronous method called `execute`.

It can only use:
- Models
- Services
- Mappers
- Repositories

> **Note:** It CANNOT use other use cases. If you need to reuse logic from a use case consider creating a service.

Example:

```
useCases
|- RemoveItemUseCase
   |- index.ts <-- Code
   |- factory.ts <-- Dependency Injection
```
```ts
// factory.ts
import { Config } from 'domain/models'

// We import the factories for all the dependencies required by the use case.
// In this case there's only one apart from the config, this repository:
import apiCartRepositoryFactory from '../../repositories/ApiCartRepository/factory'
// And we import the use case itself...
import RemoveItemUseCase from '.'

//                   v--- `config` comes from the place the factory's run
export default ({ config }: { config: Config }): RemoveItemUseCase =>
  new RemoveItemUseCase({ // <-- ...so we can instantiate it...
    // ...and pass in the required dependencies:
    config,
    cartRepository: apiCartRepositoryFactory({ config })
  })
```

```ts
// index.ts
// Since this is not a factory, we are only allowed to import models
import { Config, UseCase } from 'domain/models'
import { CartRepository } from 'domain/cart/models'

//    Remember extending from the proper model ---v
export default class RemoveItemUseCase extends UseCase {
  // Everything the use case needs is a private property
  private readonly cartRepository

  // Dependencies are received here from the `factory.ts` file
  constructor (dependencies: {
    config: Config
    cartRepository: CartRepository
  }) {
    // `super` sets the config property from dependencies...
    super(dependencies)
    // ...and every other dependency is manually set as a property...
    this.cartRepository = dependencies.cartRepository
  }

  async execute ({ id }: { id: number }): Promise<void> {
    // ...so we can use it ---v
    return await this.cartRepository.delete(id)
  }
}
```

👀 You can also have a look at the `ListDatapoolsUseCase` in MIDAS, which was the first use case to be implemented, for a more extensive example.

### Services

Name pattern: `[Action][Object]Service`

A service is the same thing as a use case but it's private, meaning it cannot be consumed from the outside of the domain.

It can only use:
- Models
- Other services
- Mappers
- Repositories

Example:

```
services
|- GetItemService
   |- index.ts <-- Code
   |- factory.ts <-- Dependency Injection
```

```ts
// TODO: write the code example
```

👀 No service has been implemented in MIDAS just yet.

### Mappers

Name pattern: `From[Input]To[Output]Mapper`

A mapper is a data transformer. It's meant to transform domain data. It has a public synchronous `map` method that accepts an input argument and returns something else as an output.

It can only use:
- Models
- Other mappers

Example:

```
mappers
|- FromProductListResponseToProductListValue
   |- index.ts <-- Code
   |- factory.ts <-- Dependency Injection
```

Or, although it will not always be possible, we can optionally cut the part of the name that is repeated at the beginning (ProductList) for brevity:

```diff
mappers
-|- FromProductListResponseToProductListValue
+|- FromResponseToProductListValue
   |- index.ts <-- Code
   |- factory.ts <-- Dependency Injection
```

```ts
// TODO: write the code example
```

👀 You can also have a look at the `FromResponseToDatapoolListValueMapper` in MIDAS, which was the first mapper to be implemented, for a more extensive example.

### Repositories

Name pattern: `[Source][Object]Repository`

A repository is a source of data. You can think of it as an API client as it provides an open list of public asynchronous methods for a given subject, like CRUD methods (but not necessarily) such as list, get, delete, and so on.

It deals with all the logic that is necessary to connect and manage the access to any data source that is outside of the app, such as API endpoints, but also local storage, session storage, cookies, or other kind of sources.

It can only use models.

Example:

```
repositories
|- ApiCartRepository
   |- index.ts <-- Code
   |- factory.ts <-- Dependency Injection
```

```ts
// TODO: write the code example
```

👀 You can also have a look at the `ApiDatapoolRepository` in MIDAS, which was the first repository to be implemented, for a more extensive example.
