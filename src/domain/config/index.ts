import { Config } from './models'

import baseConfig from './config'
import devConfig from './config.development'
import proConfig from './config.production'

function makeConfigForEnvironment (): Config {
  return import.meta.env.MODE === 'production'
    ? { ...baseConfig, ...proConfig }
    : { ...baseConfig, ...devConfig }
}

export default makeConfigForEnvironment()
