'use strict';

const path=require('path');

module.exports={
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
    	'/': {
    	  target: 'http://localhost:8880/',     // local
        // target: 'http://10.15.16.13:6810/',   // dev
        // target: 'http://10.1.234.58:8880/',   // test
        // target: 'http://10.19.58.124:8880/',  // poc
        changeOrigin: true,
        secure: false
    	},
    	'/lixinger/': {
    	  target: 'https://open.lixinger.com/api/',
        changeOrigin: true,
        secure: false
    	},
    },

    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname,'../dist/index.html'),

    assetsRoot: path.resolve(__dirname,'../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    productionGzip: false,
    productionGzipExtensions: ['js','css']
  }
};
