import merge from 'deepmerge'
import { isPlainObject } from 'is-plain-object'

import { Config } from './models'

import baseConfig from './config'
import devConfig from './config.development'
import testConfig from './config.test-env'
import proConfig from './config.production'

function mergePartialConfigs (...configs: Array<{ [key: string]: unknown }>): Config {
  return merge.all<Config>(configs, { isMergeableObject: isPlainObject })
}

function makeConfigForEnvironment (): Config {
  if (import.meta.env.MODE === 'production') {
    return mergePartialConfigs(baseConfig, proConfig)
  }
  if (import.meta.env.MODE === 'test') {
    return mergePartialConfigs(baseConfig, devConfig, testConfig)
  }
  return mergePartialConfigs(baseConfig, devConfig)
}

export default makeConfigForEnvironment()
