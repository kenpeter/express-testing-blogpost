// use strict
'use strict';

// proxy require
// We'll use this to override require calls in routes
var proxyquire = require('proxyquire');

// stub func for overwrite
// This will create stubbed functions for our overrides
var sinon = require('sinon');

// super test, like request
// Supertest allows us to make requests against an express object
var supertest = require('supertest');

// chai expect
// Natural language-like assertions
var expect = require('chai').expect;

// express
var express = require('express');

// get ping
describe('GET /ping', function () {
  // app
  // get user stub
  // request
  // route
  var app, getUserStub, request, route;

  // before each
  beforeEach(function () {
    // sinon create some dummy data
    getUserStub = sinon.stub();

    // express
    // Create an express application object
    app = express();

    // route......
    // Get our router module, with a stubbed out users dependency
    // we stub this out so we can control the results returned by
    // the users module to ensure we execute all paths in our code

    // route, proxy require
    // with actual user route
    // now we have a new ../lib/user-route.js returns
    route = proxyquire('../lib/user-route.js', {
      // inside ../lib/user-route.js
      // we require ./users and users.getByUsername, now we override with sinon.stub();
      './users': {
        getByUsername: getUserStub
      }
    });

    // now call ../lib/user-route.js
    route(app);

    // also pass express instance to request.
    request = supertest(app);
  });

  // it
  // annoy func with done
  it('should respond with a 404 and a null', function (done) {
    // what exact is this??????????????????
    // basically ask getUserStub to returns null, user is null, see user-route.js code
    getUserStub.returns(null);

    // super test with express instance
    request
      .get('/users/nodejs') // access /users/:username
      .expect('Content-Type', /json/) // expect content type, contain json
      .expect(404, function (err, res) { // expect 404 with err and res
        expect(res.body).to.deep.equal({ // expect, (res.body), to.deep.equal????
          status: 'not ok', // status not ok
          data: null // data null
        });
        done(); // done
      });
  });

  // it
  // func done
  it('should respond with 200 and a user object', function (done) {
    // user data
    var userData = {
      username: 'nodejs'
    };

    // now getUserStub returns {username: 'nodejs'}
    getUserStub.returns(userData);

    //
    request
      .get('/users/nodejs') //
      .expect('Content-Type', /json/) //
      .expect(200, function (err, res) { //
        expect(res.body).to.deep.equal({ //
          status: 'ok', //
          data: userData //
        });
        done();
      });
  });
});
