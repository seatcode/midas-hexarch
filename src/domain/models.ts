import { Config } from './config/models'

/**
 * Common
 * ---
 * Please do NOT export, these are intended for internal usage only
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
 * Public
 * ---
 * Exportable models so domain pieces inherit from these
 */
export abstract class Repository extends WithConfig {}
export abstract class Mapper extends WithConfig {}
export abstract class Service extends WithConfig {
  abstract execute (...args: unknown[]): Promise<unknown>
}
export abstract class UseCase extends Service {}

/**
 * Re-export some core models for convinience
 */
export type { Config }
