// Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra
const antdTheme = require('./src/theme.js')
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  disableEsLint,
  addDecoratorsLegacy,
} = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy(),
  // useEslintRc(),
  disableEsLint(),
  fixBabelImports('import', {
    libraryName: 'antd', libraryDirectory: 'es', style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antdTheme
  })
)