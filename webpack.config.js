const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  stats: {
    assets: true,
    children: false,
    chunks: false,
    modules: false,
    source: false,
  },
  entry: {
    bundle: path.join(__dirname, 'index.web.js'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'typeof __DEV__': JSON.stringify('boolean'),
      __DEV__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    extensions: [
      //构造web时增加钩子
      '.web.js',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.android.js',
      '.ios.js',
    ],
    alias: {
      // "@": path.resolve(__dirname, "src"), // zmas热更新不支持别名
      'react-native': 'react-native-web',
    },
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx|ts|tsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
              emitFile: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // path.resolve(__dirname, "node_modules/@react-native-community/art"),
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'web'),
          path.resolve(__dirname, 'test'),
          path.resolve(__dirname, 'node_modules/react-native-swiper'),
          path.resolve(__dirname, 'setup.ts'),
          path.resolve(__dirname, 'App.tsx'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['babel-plugin-react-native-web'],
            },
          },
          {
            loader: 'source-map-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              emitFile: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8090,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  output: {
    libraryTarget: 'umd',
    filename: 'build.js',
    chunkFilename: 'build.js',
  },
  devtool: 'inline-source-map',
};
