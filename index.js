// use strict
'use strict';

// port 3001
var PORT = 3001;

// so we define a route like a func
var userRoute = require('./lib/user-route');

// express instance
var app = require('express')();

// now just pass app into route func
userRoute(app);

// now app listent to 3001
app.listen(PORT, function () {
  console.log('listening on port %s', PORT);
});
