import gulp from 'gulp';
import watch from 'gulp-watch';
import server from 'gulp-connect';
import run from 'run-sequence';

import fs from 'fs';
import replace from 'replace-in-file';

import webpack from 'webpack';
import { development, production, migrator } from './webpack.config.babel'; // <-- Contains ES6+

const PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const paths = {
  src: './src/**/*',
  widgets: './widgets/**/*',
  migrator: './migrator/**/*',
  dist: './dist'
};

gulp.task('default', (callback) => {
  run("server", "watch", callback);
});

gulp.task('dev', (callback) => {
  run("watch", callback);
});

gulp.task('build.magic', (callback) => {

  let externals = (process.env.npm_config_externals || "").split(',');
  console.log(externals);

  // development.entry['sailplay-magic-vendor'] = development.entry['sailplay-magic-vendor'].filter(vendor => exclude_vendors.indexOf(vendor) < 0);
  // console.log(development.entry['sailplay-magic-vendor']);
  development.externals = externals;

  let bundler = webpack(development);

  bundler.run(callback);

});

gulp.task('build.migrator', (callback) => {
  let bundler = webpack(migrator);
  bundler.run(callback);
});

gulp.task('watch', () => {
  return Promise.all([
    watch([ paths.src, paths.widgets ], () => {
      gulp.start('deploy.magic');
    }),
    watch([ paths.migrator ], () => {
      gulp.start('deploy.migrator');
    }),
  ])
});

gulp.task('server', () => {
  server.server({
    port: 8000
  });
});

//deploying section
gulp.task('deploy.version', () => {
  console.log(`Deploying version: ${PACKAGE.version}`);
  // replace({
  //   files: paths.dist + '/**/*',
  //   replace: /\$\{MAGIC_VERSION\}/g,
  //   with: PACKAGE.version
  // });
});

gulp.task('deploy.magic', (callback) => {
  let externals = (process.env.npm_config_externals || "").split(',');
  console.log(externals);
  production.externals = externals;
  let bundler = webpack(production);
  bundler.run(callback);
});

gulp.task('deploy.migrator', (callback) => {
  let bundler = webpack(migrator);
  bundler.run(callback);
});

gulp.task('deploy', (callback) => {

  let env = process.env.npm_config_env;
  console.log({ env: env });

  if(env === 'dev') {

    run('build.magic', 'build.migrator', callback);

  }
  else {

    run('deploy.magic', 'deploy.migrator', 'deploy.version', callback);

  }

});