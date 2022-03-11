import type { Config } from './config/types'

/**
 * Re-export some core types for convinience
 */
export { Config }

/**
 * Use Cases
 */
export abstract class UseCase {
  protected readonly config: Config

  constructor ({ config }: {config: Config}) {
    this.config = config
  }

  abstract execute (...args: unknown[]): Promise<unknown>
}

/**
 * Repositories
 */
export abstract class Repository {
  protected readonly config: Config

  constructor ({ config }: {config: Config}) {
    this.config = config
  }
}
