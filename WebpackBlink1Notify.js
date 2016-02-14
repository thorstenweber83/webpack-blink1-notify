'use strict'

var merge = require('lodash.merge');
var pulse = require('./pulse.js');
var startPulse = pulse.startPulse;
var failed = false;
var initSuccess = false;
var colors = {
	working: '#464646',
	fail: '#b40000',
	ready: '#00a000',
};

function WebpackBlink1Notify(options) {
	if( typeof options === 'object' && options.hasOwnProperty('colors') ){
		colors = merge( colors, options.colors );
	}
  initSuccess = pulse.init();
}

function working(){
  failed = false;
  startPulse(100, colors.working );
}

function fail(){
  failed = true;
  startPulse(500, colors.fail );
}

function done(){
 if(failed){
    return;
  }
  startPulse(1500, colors.ready );
}

WebpackBlink1Notify.prototype.apply = function(compiler) {
  if(!initSuccess){
    return;
  }

  compiler.plugin('compile', working);

  compiler.plugin('done', done);

  compiler.plugin('compilation', function(compilation, params) {

     compilation.plugin('failed', fail);

     compilation.plugin('failed-module', fail);
  });
};

module.exports = WebpackBlink1Notify;
