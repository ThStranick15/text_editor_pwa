const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');
const is_prod = process.env.NODE_ENV === 'production'

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
const plugins = [
  new HtmlWebpackPlugin({
  template: './index.html' //uses index.html as template for output file
})
]

const prodPlugins = [
  new GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }),
  new InjectManifest({
    swSrc: './src-sw.js', // Path to your service worker source file
    swDest: 'sw.js', // Output path for the generated service worker file
    include: [/\.html$/, /\.js$/, /\.css$/], // Files to precache
  }),
  new WebpackPwaManifest({
    name: 'Text Editor',
    short_name: 'TE',
    description: 'Text Editor PWA',
    background_color: '#555',
    publicPath: '/',
    theme_color: '#fff',
    ios: true,
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/images/logo.png'),
        size: '1024x1024',
        purpose: 'maskable'
      }
    ]
  })
]

if(is_prod){
  plugins.push(...prodPlugins)
}

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      hot: true,
      port: 8080,
      proxy: [
        {
          context: ['/'],
          target: 'http://localhost:3000',
          secure: false
        }
      ],
      watchFiles:{
        paths:['./index.html']
      }
    },
  };
};
