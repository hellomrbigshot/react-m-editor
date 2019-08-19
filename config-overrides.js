const { override, addWebpackModuleRule } = require('customize-cra');
module.exports = override(
  config => ({
    ...config,
    output: {
      ...config.output,
      globalObject: 'this'
    },
  }),
  addWebpackModuleRule(
    {
      test: /\.md$/,
      use: { loader: 'text-loader' }
    }
  )
)
