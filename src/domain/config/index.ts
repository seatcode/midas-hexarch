import type { Config } from './types'

import merge from 'deepmerge'
import devConfig from './envs/development'
import proConfig from './envs/production'
import commonConfig from './common'

function makeConfigForEnvironment (): Config {
  const objectsToMerge = import.meta.env.MODE === 'production'
    ? [commonConfig, proConfig]
    : [commonConfig, devConfig]

  return merge.all<Config>(objectsToMerge)
}

export default makeConfigForEnvironment()
