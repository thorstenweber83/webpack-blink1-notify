"use strict"

var hex2rgb = require('hex-to-rgb');
var Blink1 = require('node-blink1');
// console.log(Blink1.devices());


var blink1;
var ledInterval = null;

function init(){
  try{
    blink1 = new Blink1();
  }catch( err ){
    console.log( err );
    return false;
  }
  return true;
}

function pulse(ms, color){
	var r, g, b;
	var rgbColor = hex2rgb( color );

	r = rgbColor[0];
	g = rgbColor[1];
	b = rgbColor[2];

  try{
    blink1.fadeToRGB(ms, r, g, b, function() {
      // console.log('now fading out!');
      setTimeout( function() {
        try{
          blink1.fadeToRGB(
            ms,
            darkenChannel(r),
            darkenChannel(g),
            darkenChannel(b),
            function() {
            // console.log('finished fading!');
          });
        }
        catch( error ){
          // console.log(error);
        }
      }, 0);
    });
  }
  catch( error ){
    // console.log(error);
  }
}

function darkenChannel( c ){
  return Math.ceil( c / 4 );
}

function startPulse( ms, r, g, b ){
  clearInterval(ledInterval);

  ledInterval = setInterval(function(){
  	pulse(ms, r, g, b);
  }, ms * 2);
  ledInterval.unref();
}

process.on('beforeExit', function(){
  // console.log('beforeExit');
  if(ledInterval){
    clearInterval(ledInterval);
    blink1.fadeToRGB(0, 0, 0, 0);
  }
});

module.exports = {
  startPulse: startPulse,
  init: init,
};
