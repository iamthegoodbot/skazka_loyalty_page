import path from 'path';
import webpack from 'webpack';
import fs from 'fs';

const app_name = 'magic.js';

var ExtractTextPlugin = require("extract-text-webpack-plugin");

/*
  load dependencies and chunk them to vendor file
*/
const PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));
let vendors = Object.keys(PACKAGE.dependencies);

console.log('vendors:', vendors);

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
      plugins: ['transform-decorators-legacy', 'transform-runtime' ],
      presets: ['es2015', 'es2017', 'es2016', 'stage-0']
    }
  },
  {
    test: /\.html$/,
    loader: "html"
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract(
      "style-loader",
      "css-loader!less-loader"
      )
  },
  //fonts loaders
  { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml' },
  { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff' },
  { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2' },
  { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream' },
  { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject' },
  //image loaders
  {
    test: /\.png/, loader: 'url?limit=65000&mimetype=image/png'
  }
];

let resolve = {
  root: __dirname,
  modulesDirectories: ['node_modules'],
  alias: {
    "@core": path.join(__dirname, 'src', 'core')
  }
};

console.log("magic: "+ [ path.join(__dirname, 'src', app_name) ])
console.log("widgets: " + widgets)

let entry = {
  'sailplay-magic': [ path.join(__dirname, 'src', app_name) ].concat(widgets)
}

let plugins = [
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
]

export let development = {
  entry: entry,
  resolve: resolve,
  output: {
    path: path.join(__dirname, 'dist', 'dev'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: loaders
  },
  plugins: plugins,
  devtool: "eval"
};

let prodResolve = resolve

let prodLoaders = loaders.concat(
  //angular commonjs kostyl
  {
    test: /angular.min.js$/,
    loader: 'exports?angular'
  }
  )

prodResolve.alias.angular = "node_modules/angular/angular.min.js"

let prodPlugins = plugins.concat(
  new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings:     false,
        drop_console: true,
        unsafe:       false
      },
      
      mangle: false
    })
  )

export let production = {
  entry: entry,
  resolve: prodResolve,
  output: {
    path: path.join(__dirname, 'dist', 'prod'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: prodLoaders
  },
  devtool: "source-map",
  plugins: prodPlugins
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

export let migrator = {
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
  }
};
