const express = require('express');
const proxy = require('proxy-middleware');
const staticFile = require('connect-static-file')
const url = require('url');
const path = require('path')
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const development = require('./webpack.config').development//production // <-- Contains ES6+

const server = express();

const host = 'localhost'
const port = '3002'

const devServerHost = 'localhost'
const devServerPort = '3001'

//static directory if needed
//server.use('/assets', express.static(__dirname + '/assets'));

server.use('/dist/prod', proxy(url.parse('http://' + devServerHost + ':' + devServerPort + "/dist/prod")));

server.use('/', staticFile('index.html', {}))

const webpackConfig = development({
  wdsHost: devServerHost,
  wdsPort: devServerPort
  })

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: webpackConfig.output.path,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  noInfo: false,
  quiet: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  },
  stats: {
    colors: false
  }
}).listen(devServerPort);

server.listen(port, host);

console.log('Listening at ' + host + ':' + port);