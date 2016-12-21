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

export default {
  entry: {
    'sailplay-magic': path.join(__dirname, 'src', app_name),
    'sailplay-magic-widgets': widgets,
    'sailplay-magic-vendor':  vendors
  },
  resolve: {
    alias: {
      "@core": path.join(__dirname, 'src', 'core')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
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
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('sailplay-magic-vendor', 'sailplay-magic-vendor.js', Infinity)
  ]
};
