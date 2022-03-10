import type { Config } from './config/types'

/**
 * Re-export some core types for convinience
 */
export { Config }

/**
 * Use Cases
 */
export type UseCaseFactory = (deps: {config: Config}) => UseCase
export interface UseCaseParams {[key: string]: unknown}
export abstract class UseCase {
  protected readonly config: Config

  constructor ({ config }: {config: Config}) {
    this.config = config
  }

  abstract execute (params?: UseCaseParams): Promise<unknown>
}
