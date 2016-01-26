'use strict'

let pulse = require('./pulse.js');
let startPulse = pulse.startPulse;
let failed = false;
let initSuccess = false;

function WebpackBlink1Notify(options) {
  initSuccess = pulse.init();
}

function working(){
  failed = false;
  startPulse(100, 70, 70, 70);
}

function fail(){
  failed = true;
  startPulse(500, 180, 0, 0);
}

function done(){
  if(failed){
    return;
  }
  startPulse(1500, 0, 160, 0);
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
