<img alt="Hexagonal Architecture MIDAS FE" width="584" src="https://user-images.githubusercontent.com/4168389/161611798-da1be7af-4c88-4d01-94ad-0e153aea7710.png" />

> All you need to know to do with Hexagonal Architecture in the MIDAS project

- [Introduction](#introduction)
- [Using from React](#using-from-react)
- [Getting inside](#getting-inside)
- [Concepts](#concepts)
  - [Domain](#domain)
  - [Config](#config)
  - [Context](#context)
  - [Models](#models)
  - [Types](#types)
- [Domain pieces](#domain-pieces)
  - [Use Cases](#use-cases)
  - [Services](#services)
  - [Mappers](#mappers)
  - [Repositories](#repositories)
  - [Models](#models-1)
    - [Entities](#entities)
    - [Values](#values)
    - [Responses](#responses)
    - [Adapters (for repositories)](#adapters-for-repositories)
- [Dependency injection](#dependency-injection)
- [File structure](#file-structure)
  - [Config directory](#config-directory)
  - [@context directory](#context-directory)
    - [useCases](#usecases)
    - [services](#services-1)
    - [mappers](#mappers-1)
    - [repositories](#repositories-1)
    - [models](#models-2)
  - [Types directory](#types-directory)
  - [Root files](#root-files)

## Introduction

A Frontend framework like [React](https://reactjs.org) is awesome, it brings in a modular approach to our UI logic while still providing relationships to understand how every piece relates each other.

But a complex business product needs more than UI logic. As the project grows, we may realize there's a growing amount of logic in no man's land.

Of course you can move that logic into separated files, but then you'll lack relationships and that's a problem you'll eventually suffer from.

This is [business logic](https://en.wikipedia.org/wiki/Business_logic), and some [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) exist to deal with it. Proven ways of organizing and relating all of its relevant pieces. [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) is one of those patterns.

## Using from React

```tsx
import { useDomain } from 'domain/react'

// ...

const domain = useDomain()
const useCase = domain.
```

## Getting inside

## Concepts

### Domain

The whole business logic is enclosed within the domain. The inner pieces of the domain can interact with each other, but can't interact with the outside.

From the outside perspective, the domain is a black box. The only thing you can see about the domain from React is:

- A list of use cases, which are essentially actions you can execute.
- The domain's config object.

### Config

- It's a plain object that can be read from any domain piece.
- It can also be read from the outside of the domain.
- It's aware of the environment.

### Context

A context is a business topic to group all its related logic. Any domain piece must be enclosed within a specific context.

For a given context, we can find:

- Models
  - Entities
  - Values
  - Responses
  - Adapters (for repositories)
- Repositories
- Mappers
- Services
- Use Cases (with public types)

### Models
  - They're private, meant to be consumed from the inside of the domain.
  - They're contracts to ensure a certain structure is enforced in specific domain pieces or data you create afterwards.
  - They're TypeScript types and abstract classes.
  - Cannot be used outside the domain.

### Types
  - They're public, meant to be consumed from the outside of the domain.
  - They're only written inside the use cases, to support dealing with use case execution results from the outside.
  - Cannot be used inside the domain.

## Domain pieces

### Use Cases

### Services

### Mappers

### Repositories

### Models

#### Entities
#### Values
#### Responses
#### Adapters (for repositories)

## Dependency injection


## File structure

When doing Hexagonal Architecture we find a folder called `domain`. This is the place where all of the Hexagonal Architecture related logic lives:

```
domain
|- config/
|- @context/
|- types/
|- entry.ts
|- models.ts
|- react.ts
```

### Config directory

```
config
|- config.development.ts
|- config.production.ts
|- config.test-env.ts
|- config.ts
```

### @context directory

```
@context
|- useCases/
|- services/
|- mappers/
|- repositories/
|- models/
```

#### useCases

```
@context
|- useCases/
   |- GetSomethingUseCase
      |- index.ts
      |- factory.ts
```

#### services
#### mappers
#### repositories
#### models

### Types directory

```
types
|- @context.ts
```

### Root files

```
domain
|- ...
|- entry.ts ✅ <- You'll need to add every new use case in here
|- models.ts 🚫
|- react.ts 🚫
```

🚫 Be aware that you won't edit these, but here is what they do:

| File | Purpose |
|-|-|
| models.ts | Exports common models from which you'll extend your domain pieces. |
| react.ts | Exports hooks so you can use the domain from React. |

