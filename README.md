webpack-blink1-notify
=====================

Get notified about the status of your webpack build during development.

Installation
------------
```
npm install webpack-blink1-notify --save-dev
```


Usage
-----

In your webpack configuration file add:

```
var WebpackBlink1Notify = require('path-to/webpack-blink1-notify');
[...]
plugins: [
  new webpack-blink1-notify(),
]
```

Configuration
-------------
you can customize the LED Colors like this:
```
var WebpackBlink1Notify = require('path-to/webpack-blink1-notify');
[...]
plugins: [
  new webpack-blink1-notify({
		colors: {
			working: '#ffffff',
			fail: '#ff0000',
			ready: '#0000ff',
		},
	}),
]
```

TODO
----
-	publish npm package

##### helpful links for blink1

-	https://blink1.thingm.com/blink1-tool/
-	https://github.com/todbot/blink1/blob/master/linux/51-blink1.rules
-	https://github.com/todbot/blink1
-	https://wiki.raumzeitlabor.de/wiki/RZLblink
