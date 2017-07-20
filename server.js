const express = require('express');
const proxy = require('proxy-middleware');
const staticFile = require('connect-static-file')
const url = require('url');
const path = require('path')
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const development = require('./webpack.config').development // <-- Contains ES6+
const prod = require('./webpack.config').production

const server = express();

const host = 'localhost'
const port = '3006'

const devServerHost = 'localhost'
const devServerPort = '3005'

//static directory if needed
server.use('/public', express.static(__dirname + '/public'));

server.use('/dist/prod', proxy(url.parse('http://' + devServerHost + ':' + devServerPort + "/dist/prod")));

server.use('/', staticFile('index.html', {}))

const webpackConfig = development({
	wdsPort: devServerPort,
	wdsHost: devServerHost
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