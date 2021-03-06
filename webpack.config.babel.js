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
  // console.log(file);
  return file.match(/.*\.js$/);
}).map((file) => {
  return './' + file;
});

console.log('widgets: ', widgets);

//loaders
let loaders = [

  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'ng-annotate-loader'
  },

  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-runtime'
      ]
    }
  },

  {
    test: /\.html$/,
    exclude: /(node_modules|bower_components)/,
    loader: "html-loader"
  },

  {
    test: /\.(png|jpe?g|gif|svg|otf|woff|woff2|ttf|eot|ico)$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader'
  },

  {
    test: /\.less$/,
    exclude: /(node_modules|bower_components)/,
    use: [{
      loader: "style-loader" // creates style nodes from JS strings
    }, {
      loader: "css-loader" // translates CSS into CommonJS
    },
    {
      loader: "less-loader" // compiles Less to CSS
    }]
  },
  // {
  //   test: /\.css$/,
  //   exclude: /(node_modules|bower_components)/,
  //   use: [
  //     // {
  //     //   loader: "css-loader" // translates CSS into CommonJS
  //     // },
  //     {
  //       loader: 'postcss-loader',
  //       options: {
  //         ident: 'postcss',
  //         plugins: (loader) => [
  //           // require('postcss-import')({ root: loader.resourcePath }),
  //           // require('postcss-preset-env')(),
  //           require('postcss-class-prefix')('spm--')
  //         ]
  //       }
  //     }
  //   ]
  // },

  {
    test: /\.styl$/,
    exclude: /(node_modules|bower_components)/,
    use: [{
      loader: "style-loader" // creates style nodes from JS strings
    }, {
      loader: "css-loader" // translates CSS into CommonJS
    }, 
    {
      loader: 'postcss-loader', // Run post css actions
    },
    {
      loader: "stylus-loader" // compiles Stylus to CSS
    }]
  },

  {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader' // inject CSS to page
      },
      {
        loader: 'css-loader' // translates CSS into CommonJS modules
      },
      {
        loader: 'postcss-loader', // Run post css actions
      },
      {
        loader: 'sass-loader' // compiles Sass to CSS
      }
    ]
  }

];

let resolve = {
  alias: {
    "@core": path.join(__dirname, 'src', 'core'),
    "@theme": path.join(__dirname, 'src', 'theme')
  }
};

export let development = {
  context: path.join(__dirname),
  devtool: 'source-map',
  entry: {
    'sailplay-magic': path.join(__dirname, 'src', app_name),
    'sailplay-magic-widgets': widgets,
    'sailplay-magic-vendor': vendors
  },
  resolve: resolve,
  output: {
    path: path.join(__dirname, 'dist', 'dev'),
    filename: "[name].js"
  },
  module: {
    rules: loaders
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'sailplay-magic-vendor',
      filename: 'sailplay-magic-vendor.js'
    })
  ]
};

export let production = {

  entry: {
    'sailplay-magic': [path.join(__dirname, 'src', app_name)].concat(widgets)
  },
  devtool: 'source-map',
  resolve: resolve,
  output: {
    path: path.join(__dirname, 'dist', 'prod'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: loaders
  },
  plugins: []
};

/*
 load migrations
 */
let migrations = get_file_list('./migrator/migrations').filter((file) => {
  return file.match(/.*\.js$/);
}).map((file) => {
  return './' + file;
});

// console.log(migrations);

export let migrator = {
  entry: {
    'sailplay-magic-migrator': [path.join(__dirname, 'migrator', 'migrator.js')].concat(migrations)
  },
  resolve: resolve,
  output: {
    path: path.join(__dirname, 'dist', 'migrator'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    rules: loaders
  }
};