"use strict"

var Blink1 = require('node-blink1');
// console.log(Blink1.devices());


let blink1;
let ledInterval = null;

function init(){
  try{
    blink1 = new Blink1();
  }catch( err ){
    console.log( err );
    return false;
  }
  return true;
}

function pulse(ms, r, g, b){
  blink1.fadeToRGB(ms, r, g, b, () => {
    // console.log('now fading out!');

    setTimeout(() => {
      blink1.fadeToRGB(
        ms,
        darkenChannel(r),
        darkenChannel(g),
        darkenChannel(b),
        () => {
        // console.log('finished fading!');
      });
    }, 0);
  });
}

function darkenChannel( c ){
  return Math.ceil( c / 4 );
}

function startPulse( ms, r, g, b ){
  clearInterval(ledInterval);

  ledInterval = setInterval(function(){
  	pulse(ms, r, g, b);
  }, ms * 2);
}

process.on('beforeExit', function(){
  //console.log('beforeExit');
  clearInterval(ledInterval);
  blink1.fadeToRGB(0, 0, 0, 0);
});

process.on('exit', function(){
  // console.log('beforeExit');
  clearInterval(ledInterval);
  blink1.fadeToRGB(0, 0, 0, 0);
});

module.exports = {
  startPulse: startPulse,
  init: init,
};
