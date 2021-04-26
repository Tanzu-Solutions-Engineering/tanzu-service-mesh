var request = require('request')
var express = require("express")
var async = require("async")
var http = require('http')
var endpoints = require('../services')
var app = express()

const opentracing = require('opentracing');


app.post("/cart/item/add/:userid", function(req, res, next){

    console.log("Adding item to cart userid " + req.params.userid);
   
    const cartSpan = opentracing.globalTracer().startSpan('add_to_cart', {
        tags :{
          'http.method' : 'POST',
          'http.url': `http://${req.headers.host}${req.url}`,
        }
      });
  
    opentracing.globalTracer().inject(cartSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri: endpoints.cartUrl + '/cart/item/add/' + req.params.userid,
        method: 'POST',
        body: req.body,
        json: true,
        headers: headers
    };

    console.log("Posting body to cart service " + JSON.stringify(req.body));

    request(options, function(error, response, body){
        if (error) {
            return next(error);
        }

      // for debugging only
      console.log('Cart item add status ' + response.statusCode )

      if(response.statusCode == 200) {
          res.writeHead(200);
          cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          cartSpan.log({
              'event': 'request_end'
            });
          cartSpan.finish();
          res.end();
      } else {
          res.status(response.statusCode);
          res.write(JSON.stringify(response.statusMessage));

          cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          cartSpan.setTag(opentracing.Tags.ERROR, true);
          cartSpan.log({
            'event': 'error',
            'message': response.statusMessage.toString()
          });
          cartSpan.log({
            'event': 'request_end'
          })
          cartSpan.finish();

          res.end();
      }


    }); // end of request

    
});

app.post("/cart/item/modify/:userid", function(req, res, next) {

    console.log('modify tracer')

    const cartSpan = opentracing.globalTracer().startSpan('modify_cart', {
        tags :{
          'http.method' : 'POST',
          'http.url': `http://${req.headers.host}${req.url}`,
          'user.id': req.params.userid
        }
      });
  
    opentracing.globalTracer().inject(cartSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri: endpoints.cartUrl + '/cart/item/modify/' + req.params.userid,
        method: 'POST',
        body: req.body,
        json: true,
        headers: headers
    };

    request(options, function(error, response, body){
        if (error) {
            return next(error);
        }

      // for debugging only
      console.log('Cart item modifiy status ' + response.statusCode )

      if(response.statusCode == 200) {
          res.writeHead(200);
          cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          cartSpan.log({
              'event': 'request_end'
            });
          cartSpan.finish();
          res.end();
      } else {
          res.status(response.statusCode);
          res.write(JSON.stringify(response.statusMessage));
          cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          cartSpan.setTag(opentracing.Tags.ERROR, true);
          cartSpan.log({
            'event': 'error',
            'message': response.statusMessage.toString()
          });
          cartSpan.log({
            'event': 'request_end'
          })
          cartSpan.finish();
          res.end();
      }


    }); // end of request


});


app.get("/cart/items/:userid", function(req, res, next){


    const cartSpan = opentracing.globalTracer().startSpan('get_cart', {
        tags :{
          'http.method' : 'GET',
          'http.url': `http://${req.headers.host}${req.url}`,
          'user.id': req.params.userid
        }
      });
  
    opentracing.globalTracer().inject(cartSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri: endpoints.cartUrl + '/cart/items/' + req.params.userid,
        method: 'GET',
        json: true,
        headers: headers
    };

    request(options, function(error, response, body){
            if (error) {
                return next(error);
            }
    
          // for debugging only
        //   console.log(JSON.stringify(body))
          console.log('Cart item get status ' + response.statusCode )
    
          if(response.statusCode == 200) {
              res.writeHead(200);
              res.write(JSON.stringify(body))
              cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
              cartSpan.log({
                  'event': 'request_end'
                });
              cartSpan.finish();
              res.end();
          } else {
              res.status(response.statusCode);
              console.log(response.statusMessage)
              res.write(JSON.stringify(response.statusMessage));
              cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
              cartSpan.setTag(opentracing.Tags.ERROR, true);
              cartSpan.log({
                'event': 'error',
                'message': response.statusMessage.toString()
              });
              cartSpan.log({
                'event': 'request_end'
              })
              cartSpan.finish();
              res.end();
          }
    })

});

app.get("/cart/clear/:userid", function(req, res, next){

    const cartSpan = opentracing.globalTracer().startSpan('clear_cart', {
        tags :{
          'http.method' : 'GET',
          'http.url': `http://${req.headers.host}${req.url}`,
          'user.id': req.params.userid
        }
      });
  
    opentracing.globalTracer().inject(cartSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri: endpoints.cartUrl + '/cart/clear/' + req.params.userid,
        method: 'GET',
        json: true,
        headers: headers
    };

    request(options, function(error, response, body){
            if (error) {
                return next(error);
            }
    
          // for debugging only
        //   console.log(JSON.stringify(body))
          console.log('Cart clear status ' + response.statusCode )
    
          if(response.statusCode == 200) {
              res.writeHead(200);
              //res.write(JSON.stringify(body))
              cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
              cartSpan.log({
                  'event': 'request_end'
                });
              cartSpan.finish();
              res.end();
          } else {
              res.status(response.statusCode);
              console.log(response.statusMessage)
              res.write(JSON.stringify(response.statusMessage));
              cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
              cartSpan.setTag(opentracing.Tags.ERROR, true);
              cartSpan.log({
                'event': 'error',
                'message': response.statusMessage.toString()
              });
              cartSpan.log({
                'event': 'request_end'
              })
              cartSpan.finish();
              res.end();
          }
    })

});


app.get("/cart/total/:userid", function(req, res, next){


    const cartSpan = opentracing.globalTracer().startSpan('get_cart_total', {
        tags :{
          'http.method' : 'GET',
          'http.url': `http://${req.headers.host}${req.url}`,
          'user.id': req.params.userid
        }
      });
  
    opentracing.globalTracer().inject(cartSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri: endpoints.cartUrl + '/cart/total/' + req.params.userid,
        method: 'GET',
        json: true,
        headers: headers
    };

    request(options, function(error, response, body){
            if (error) {
                return next(error);
            }
    
          // for debugging only
        //   console.log(JSON.stringify(body))
          console.log('Cart total status ' + response.statusCode )
    
          if(response.statusCode == 200) {
              res.writeHead(200);
              res.write(JSON.stringify(body))
              cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
              cartSpan.log({
                  'event': 'request_end'
                });
              cartSpan.finish();
              res.end();
          } else {
              res.status(response.statusCode);
              console.log(response.statusMessage)
              res.write(JSON.stringify(response.statusMessage));
              cartSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
              cartSpan.setTag(opentracing.Tags.ERROR, true);
              cartSpan.log({
                'event': 'error',
                'message': response.statusMessage.toString()
              });
              cartSpan.log({
                'event': 'request_end'
              })
              cartSpan.finish();
              res.end();
          }
    })

});


module.exports = app;