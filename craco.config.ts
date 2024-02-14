import path from 'path'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
}
