import { Config } from './config/models'

/**
 * Utils
 * ---
 * Please do NOT export, these are intended for reducing code duplication in here
 */
abstract class WithConfig {
  protected readonly config: Config

  constructor ({ config }: {config: Config}) {
    /**
     * Config is always injected into any domain piece
     */
    this.config = config
  }
}

/**
 * Domain models
 * ---
 * Exportable models so domain pieces inherit from these
 */
export abstract class Repository extends WithConfig {}
export abstract class Mapper<Input, Output> extends WithConfig {
  abstract map (input: Input): Output
}
export abstract class Service extends WithConfig {
  abstract execute (...args: unknown[]): Promise<unknown>
}
export abstract class UseCase extends Service {}

/**
 * Re-export some core models for convinience
 */
export type { Config }
