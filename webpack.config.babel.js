import path from 'path';
import webpack from 'webpack';
import fs from 'fs';

const app_name = 'magic.js';

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
      plugins: [ "@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-class-properties" ],
      presets: [
        [
          '@babel/preset-env',
          {
            "shippedProposals": true,
            "modules": "umd"
          }
        ]
      ]
    }
  },
  {
    test: /\.html$/,
    loader: "html"
  },
  {
    test: /\.less$/,
    loader: "style-loader!css-loader!less-loader"
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
  alias: {
    "@core": path.join(__dirname, 'src', 'core')
  }
};

export let development = {
  entry: {
    'sailplay-magic': path.join(__dirname, 'src', app_name),
    'sailplay-magic-widgets': widgets,
    'sailplay-magic-vendor':  vendors
  },
  resolve: resolve,
  output: {
    path: path.join(__dirname, 'dist', 'dev'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: loaders
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('sailplay-magic-vendor', 'sailplay-magic-vendor.js', Infinity)
  ]
};

export let production = {

  entry: {
    'sailplay-magic': [ path.join(__dirname, 'src', app_name) ].concat(widgets)
  },
  resolve: resolve,
  output: {
    path: path.join(__dirname, 'dist', 'prod'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: loaders
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

export default development;
