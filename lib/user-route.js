// always use strict
'use strict';

// need express
// not instace
var express = require('express');

// not much inside users
// just returns {username: test}
var users = require('./users');

// this separate route, exports and accept express app
module.exports = function (app) {
  // force router coming out of express.
  var route = express.Router();

  // now the express app set up /users
  // for /users/:username
  app.use('/users', route);

  // /users/:username
  route.get('/:username', function (req, res) {
    // req.params.username
    // users = users.get...
    var user = users.getByUsername(req.params.username);

    // no user
    if (!user) {
      // res 404 json
      res.status(404).json({
        // status, no ok
        status: 'not ok',
        //data, null
        data: null
      });
    } else {
      // res json
      res.json({
        // status ok
        status: 'ok',
        // data user
        data: user
      });
    }
  });
};
