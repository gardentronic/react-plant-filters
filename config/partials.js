import cors from 'cors'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'

export const devServer = ({
                            hot, host, port,
                            base,
                            https = false,
                            cert = null,
                            allowedHosts = null
                          } = {}) => {
  const config = {
    devServer: {
      hot,
      contentBase: base,
      historyApiFallback: true,
      overlay: {
        errors: true,
        warnings: true,
      },
      port,
      before(app) {
        app.use(cors())
      }
    }
  }

  if (allowedHosts) {
    config.devServer.allowedHosts = allowedHosts
  }

  if (https) {
    config.devServer.https = https
    console.log('Configured as https')
  }

  return config
}

export const loadFonts = () => ({
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'assets/[name].[ext]',
              publicPath: '/static/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
              publicPath: '/static/'
            }
          }
        ]
      }
    ]
  }

})

export const loadSCSS = ({isDev} = {isDev: true}) => ({
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        //exclude: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader'
        ]
      }
    ],
  }
})

export const loadCSS = ({isDev} = {isDev: true}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        //exclude: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          }
        ]
      }
    ],
  }
})
