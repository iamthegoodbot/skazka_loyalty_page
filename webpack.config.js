const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const _ = require('lodash');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");


const PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const app_name = 'magic.js';


/*
 load all widgets and chunk them to
*/
const get_file_list = (dir, filelist = []) => {

  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? get_file_list(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });

  return filelist;
};

let widgets = get_file_list('./widgets/').filter((file) => {
  return file.match(/.*\.js$/);
}).map((file) => {
  return './' + file;
});

console.log(widgets);

//loaders
let loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'ng-annotate'
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      // plugins: ['transform-decorators-legacy', 'transform-runtime' ],
      // presets: ['es2015', 'es2017', 'es2016', 'stage-0']
      presets: ['es2015']
    }
  },
  {
    test: /\.html$/,
    loader: "html"
  },
  {
    test: /\.less$/,
    loader: "style-loader!css-loader?sourceMap=true!less-loader?sourceMap=true"
  },
  //fonts loaders
  { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml' },
  { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff' },
  { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2' },
  { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream' },
  { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject' },
  //image loaders
  {
    test: /\.(png|jpe?g)/, loader: 'url?limit=65000&mimetype=image/png'
  },
  // plugin for scroll
  { test: /jquery-mousewheel/, loader: "imports?define=>false&this=>window" },
  { test: /malihu-custom-scrollbar-plugin/, loader: "imports?define=>false&this=>window" },
  { test: /angular-ellipsis/, loader: "imports?define=>false&this=>window" }
];

// common config

let resolve = {
  root: __dirname,
  modulesDirectories: ['node_modules'],
  alias: {
    "@core": path.join(__dirname, 'src', 'core')
  }
};

console.log("magic: "+ [ path.join(__dirname, 'src', app_name) ])
console.log("widgets: " + widgets)

const styles = path.join(__dirname, 'src', 'theme-2', 'main.less')

/*
const vendor = [
  path.join(__dirname, 'src', 'vendor', 'jquery.mCustomScrollbar.js'),
  path.join(__dirname, 'src', 'vendor', 'jquery.nicescroll.js'),
]
*/
let entry = {
  'sailplay-magic': [ path.join(__dirname, 'src', app_name) ].concat(widgets).concat(styles)//.concat(vendor)
}

const MAGIC_VERSION = PACKAGE.version

let plugins = [
  new webpack.DefinePlugin({
    MAGIC_VERSION: JSON.stringify(MAGIC_VERSION),
    SAILPLAY_HOST: 'http://dev.sailplay.ru'
  }),
  new webpack.NoErrorsPlugin(),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en/)
]

//dev config

module.exports.development = function(opts){
  const wdsHost = opts.wdsHost
  const wdsPort = opts.wdsPort
  const devEntry = _.mapValues(entry, (v, k)=>{
    return v.concat(['webpack-dev-server/client?http://' + wdsHost + ':' + wdsPort, 'webpack/hot/dev-server'])
  })
  const devPlugins = plugins
    .concat(new webpack.HotModuleReplacementPlugin())
  console.log(devEntry)
  return {
    entry: devEntry,
    resolve: resolve,
    output: {
      path: path.join(__dirname, 'dist', 'prod'),
      publicPath: "/dist/prod/",
      filename: "[name].js",
      libraryTarget: 'umd'
    },
    module: {
      loaders: loaders
    },
    devtool: "eval-source-map",
    plugins: devPlugins
  }
}

// prod config

let prodResolve = _.cloneDeep(resolve)

let prodLoaders = loaders.concat(
  //angular commonjs kostyl
  {
    test: /angular.min.js$/,
    loader: 'exports?angular'
  }
  )

prodResolve.alias.swiper = "node_modules/swiper/dist/js/swiper.jquery.umd.min.js"
prodResolve.alias.angular = "node_modules/angular/angular.min.js"

let prodPlugins = plugins.concat(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings:     false,
          drop_console: true,
          unsafe:       false
        },
        exclude: /angular-ellipsis.js$/i,
        mangle: false
      })
    )

module.exports.production = {
  entry: entry,
  resolve: prodResolve,
  output: {
    path: path.join(__dirname, 'dist', 'prod'),
    publicPath: "/dist/prod/",
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: prodLoaders
  },
  devtool: "source-map",
  plugins: prodPlugins,
  externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
  }
};

/*
 load migrations
 */
let migrations = get_file_list('./migrator/migrations').filter((file) => {
  return file.match(/.*\.js$/);
}).map((file) => {
  return './' + file;
});

console.log(migrations);

module.exports.migrator = {
  entry: {
    'sailplay-magic-migrator': [ path.join(__dirname, 'migrator', 'migrator.js') ].concat(migrations)
  },
  resolve: resolve,
  output: {
    path: path.join(__dirname, 'dist', 'migrator'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: loaders
  },
  plugins: plugins
};
