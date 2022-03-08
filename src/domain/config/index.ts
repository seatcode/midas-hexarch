import type { Config } from './types'

import merge from 'deepmerge'
import baseConfig from './config'
import devConfig from './config.development'
import proConfig from './config.production'

function makeConfigForEnvironment (): Config {
  const objectsToMerge = import.meta.env.MODE === 'production'
    ? [baseConfig, proConfig]
    : [baseConfig, devConfig]

  return merge.all<Config>(objectsToMerge)
}

export default makeConfigForEnvironment()
