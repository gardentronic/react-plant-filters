import {resolve, basename, relative} from 'path'
import merge from 'webpack-merge'
import BundleTracker from 'webpack-bundle-tracker'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import glob from 'glob'

const document_root = '..'

import * as partials from './partials'

const DOMAIN = process.env.DOMAIN || 'gardentronic.local'
const PORT = process.env.PORT || 8080
const PROTOCOL = process.env.PROTOCOL || 'https'

export const paths = {
  hot: resolve(__dirname, '../hot'),
  dev: resolve(__dirname, '../dist.dev'),
  prod: resolve(__dirname, '../dist.prod'),
  analyze: resolve(__dirname, '../dist.analyze'),
}

// Build a bundle for each directory in pages, except common
const context_path = resolve(__dirname, '..')
const files = glob.sync(resolve(__dirname, '../src/pages/*'))
let entries = {}
files.map(f => {
  const b = basename(f)
  if (b != 'common') {
    entries[b] = ['./' + relative(context_path, f+'/index.js')]
  }
})


export default ({env, options}) => {

  if (options.verbose) {
    console.log(`Generating base build for ${env.stage}`)

  }
  const isDev = /hot|dev/.test(env.stage)

  const strategy = {
    'module.rules': 'append'
  }

  return merge.strategy(strategy)({
      context: context_path,
      entry: entries,
      mode: options.mode,
      output: {
        path: paths[env.stage],
        publicPath: '/static/',
        filename: 'js/[name].js',
        libraryTarget: 'var',
        library: '[name]',
        libraryExport: 'default',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
        ]
      },
      resolve: {
        alias: {
          'src': resolve(__dirname, '../src'),
          'HomePage': resolve(__dirname, '../src/HomePage'),
          'FeaturedGarden': resolve(__dirname, '../src/FeaturedGarden'),
        }
      },
      plugins: [
        new BundleTracker({
          path: paths[env.stage],
          filename: 'webpack-stats.json',
          logTime: true,
          indent: 4,
        }),
        new MiniCssExtractPlugin({
          filename: isDev ? 'css/[name].css' : 'css/[name]_[hash].css',
          chunkFilename: '[id].css',
        }),
      ]
    },
    partials.loadCSS({isDev: isDev}),
    partials.loadSCSS({isDev: isDev}),
    partials.loadFonts(),
  )
}
