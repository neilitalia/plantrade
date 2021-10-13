import camelCase from 'lodash/camelCase'

const requireModule = require.context(".", false, /\.js$/)

const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const regex = /(\.\/|\.js)/g
  const moduleName = camelCase(fileName.replace(regex, ""))
  module[moduleName] = requireModule(fileName).default
})

export default modules;