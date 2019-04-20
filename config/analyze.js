import merge from 'webpack-merge'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import prodConfig from './prod'

export default ({env, options}) => {
  
  const strategy = {
    'module.rules': 'append',
    'plugins': 'append',
  }
  
  const config = prodConfig({env, options})
  
  return merge.strategy(strategy)(
    config,
    {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
          // generateStatsFile: true,
          statsFilename: 'stats.json'
        })
      ]
    },
  )
}
