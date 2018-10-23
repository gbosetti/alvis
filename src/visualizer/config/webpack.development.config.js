const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const commonPaths = require('./common-paths')

const URL_BASE = ''

const config = {
  /* entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
  ], */
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline : true,
    port : 8091,
    headers: { 'Access-Control-Allow-Origin': '*' },
    public: URL_BASE,
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: commonPaths.template,
        to: commonPaths.outputPath,
        transform: content => {
          return Buffer.from(
            content.toString()
              .replace('<!-- base -->', '')
              .replace(new RegExp('{{base}}', 'g'), ''),
            'utf8'
          )
        }
      },
      {
        from: commonPaths.favicon,
        to: commonPaths.outputPath,
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}

module.exports = config
