var request = require('request');
var expect = require('../../node_modules/chai/chai').expect;
var stubs = require("./Stubs.js");
// var response = stubs.response;
var handleRequest = require("../request-handler.js");
var requestHandler = handleRequest.requestHandler;







describe('server', function() {
  it('should respond to GET requests for /log with a 200 status code', function(done) {
    var req = new stubs.request('/classes/messages', 'GET');
    var res = new stubs.response();
    // var request = stubs.request;
    // var response = stubs.response;

  requestHandler(req, res);

      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });











  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send an object containing a `results` array', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests to /send', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with messages that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
          var messages = JSON.parse(body).results;
          expect(messages[0].username).to.equal('Jono');
          expect(messages[0].message).to.equal('Do my bidding!');
          done();
        });
    });
  });

  it('Should 404 when asked for a nonexistent file', function(done) {
    request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });


});
