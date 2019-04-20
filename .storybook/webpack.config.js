const path = require("path")

module.exports = async ({config, mode}) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [

        {
          loader: require.resolve('style-loader'),
          options: {
            singleton: true
          }
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          }
        },
        require.resolve('sass-loader'),
      ],
      include: path.resolve(__dirname, "../")
    },
  )
  config.devtool = 'source-map'

  config.module.rules.push(
    {
      test: /\.css$/,
      use: [

        {
          loader: require.resolve('style-loader'),
          options: {
            singleton: true
          }
        },
        {
          loader: require.resolve('css-loader'),
        },
      ],
      include: path.resolve(__dirname, "../")
    }
  )

  const resolve = {
    alias: {
      'src':
        path.resolve(__dirname, '../src'),
    }
  }

  return {...config, resolve: resolve}

}
