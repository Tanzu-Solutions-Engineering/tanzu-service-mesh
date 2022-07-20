var request = require('request')
var express = require("express")
var async = require("async")
var http = require('http')
const opentracing = require('opentracing');
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing')

var app = express()

var endpoints = require('../services')

// Handles post call to /login
app.post("/login", function(req, res, next) {

    // start span for Login 
    const userSpan = opentracing.globalTracer().startSpan('login', {
      tags :{
        'http.method' : 'POST',
        'http.url': `http://${req.headers.host}${req.url}`,
      }
    });

    opentracing.globalTracer().inject(userSpan.context(), FORMAT_HTTP_HEADERS, req.headers)

    //console.log(endpoints.usersUrl)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id']
    }

    var options = {
        uri: endpoints.usersUrl + "/login",
        method: 'POST',
        body: req.body,
        json: true,
        headers: headers
      };
  
    // Logs data to server side console
    console.log("Posting " + JSON.stringify(req.body));

    // Leverages request library
    request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }
        // for debugging only
        console.log(response.statusCode)

        if (response.statusCode == 200) {
            // Get access_token and refresh_token
            var logged_in = body.access_token
            var refresh_token = body.refresh_token
            console.log(logged_in)
            console.log("\n"+ "refresh token " + refresh_token)
            res.cookie('logged_in', logged_in, "/")
            res.cookie('refresh_token', refresh_token, "/")
            res.writeHead(200)
            res.write(JSON.stringify(body))
           
            userSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            // userSpan.addTags({
            //   'http.status_code': response.statusCode.toString()
            // });
            userSpan.log({
              'event': 'request_end'
            });
            userSpan.finish();
           
            res.end();
        } 
        
        else {
            console.log("Error with log in: " + req.body.username);
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusMessage))
           
            userSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            userSpan.setTag(opentracing.Tags.ERROR, true);
            userSpan.log({
              'event': 'error',
              'message': response.statusMessage.toString()
            });
            userSpan.log({
              'event': 'request_end'
            })
            userSpan.finish();
           
            res.end();
        }

    }); // end of request

}); // End of app.post('/login')


app.get("/users/:id", function(req, res, next) {


    const userSpan = opentracing.globalTracer().startSpan('get_user', {
        tags :{
          'http.method' : 'GET',
          'http.url': `http://${req.headers.host}${req.url}`,
          'user.id': req.params.id
        }
      });

    opentracing.globalTracer().inject(userSpan.context(), FORMAT_HTTP_HEADERS, req.headers)
  
    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
      uri: endpoints.usersUrl + "/users/" + req.params.id,
      method: 'GET',
      json: true,
      headers: headers
    };

    // Leverages request library
    request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }

        if (response.statusCode == 200) {
            console.log('printing from within request')
            res.writeHead(200)
            res.write(JSON.stringify(body))

            userSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            userSpan.log({
              'event': 'request_end'
            });
            userSpan.finish();
            
            res.end();
        } 
        else {
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusMessage))
           
            userSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            userSpan.setTag(opentracing.Tags.ERROR, true);
            userSpan.log({
              'event': 'error',
              'message': response.statusMessage.toString()
            });
            userSpan.log({
              'event': 'request_end'
            })
            userSpan.finish();
           
            res.end();
        }

    }); // end of request

}); // end of method

app.post("/logout", function(req, res, next) {

      // start span for Logout 
      const userSpan = opentracing.globalTracer().startSpan('logout', {
        tags :{
          'http.method' : 'POST',
          'http.url': `http://${req.headers.host}${req.url}`,
        }
      });

      opentracing.globalTracer().inject(userSpan.context(), FORMAT_HTTP_HEADERS, req.headers);

      var headers = {
        "uber-trace-id": req.headers['uber-trace-id'],
        "Authorization": 'Bearer ' + req.cookies['logged_in']
      }

      var options = {
        uri: endpoints.usersUrl + "/logout",
        method: 'POST',
        body: req.body,
        json: true,
        headers: headers
      };

      request(options, function(error, response, body){
        if (error) {
          return next(error);
        }

        console.log(response.statusCode)

        if (response.statusCode == 202) {

          userSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          userSpan.log({
            'event': 'request_end'
          });
          userSpan.finish();
         
          res.end();

        } else {
          console.log("Error during logout");
          res.status(response.statusCode);
          res.write(JSON.stringify(response.statusMessage))
         
          userSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          userSpan.setTag(opentracing.Tags.ERROR, true);
          userSpan.log({
            'event': 'error',
            'message': response.statusMessage.toString()
          });
          userSpan.log({
            'event': 'request_end'
          })
          userSpan.finish();
         
          res.end();

        }

      }); // end of request

});
  module.exports = app;