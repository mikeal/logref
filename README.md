# Logging

This is a considerable departure from the traditional logger.

This logger is meant for use in third party modules and packages. It's so that modules can have a very simple way to offer optional visibility in to the modules inner workings.

To this end, it does not have log levels like *info*, *warn*, etc. It simply allows the creation of a logger for your module (with a name) and offer a single function to take messages and a context for those messages.

This module is both an implementation and a light specification. Loggers can be quite opinionated and the creators of modules are unlikely to solidify around a single implementation of anything.

## Spec

A logging library should be a single function that returns logger functions.

```javascript
var logging = require('logging')
  , log = logging('mymodulename')
  ;
```

When running an application in a production environment, logging is the one of the few things you need to be global that is outside of node core. 

Users of this specification should require **the user** to set the process.logging to the desired module. A library **must never** set this property automatically as it will override any other logger the user may want to use.

**server.js**
```javascript
process.logging = require('logging')
var request = require('request')
```

Notice that this line comes **before** loading **any** other module. This is important, modules will likely check for process.logging as soon as they are required.

Using the logger is quite easy within a module.

```javascript
if (process.logging) var log = process.logging('mymodule')
else var log = function () {}

...
module.exports = fancy (options) {
  log('new fancy %method for %url', options)
}
...
fancy({method:'GET', url:'http://www.google.com'})
```

The final piece of this spec is visible in the last example. 

Log functions take two arguments, a message and a context.

Named string interpolation from the context **should** be supported. This prevents many errors related to using the + operator in building the message string.

## logging API

The rest of this documentation covers features which should not be considered part of the specification.

Enabling stdout or stderr printing of logs.

```
require('logging').stdout()
```

```
require('logging').stderr()
```

All will print `[mymodule] new fancy GET for http://www.google.com`.

