import type { Config } from './config/types'

/**
 * Re-export some core types for convinience
 */
export { Config }

/**
 * Use Cases
 */
export interface UseCaseParams {[key: string]: unknown}

export interface UseCase {
  execute: (params: UseCaseParams) => Promise<unknown>
  config?: Config
}

export type UseCaseFactory = (deps: {config: Config}) => UseCase
