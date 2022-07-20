var request = require('request')
var express = require("express")
var async = require("async")
var http = require('http')
var endpoints = require('../services')

const opentracing = require('opentracing');

var app = express()

app.get("/products", function(req, res, next) {

    console.log('requesting products')

    const productSpan = opentracing.globalTracer().startSpan('get_products', {
        tags :{
          'http.method' : 'GET',
          'http.url': `http://${req.headers.host}${req.url}`,
        }
      });
  
    opentracing.globalTracer().inject(productSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)


    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri: endpoints.catalogUrl + '/products',
        method: 'GET',
        json: true,
        headers: headers
      };
 
      request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }

        if (response.statusCode == 200) {
            console.log('getting catalog info')
            res.writeHead(200)
            res.write(JSON.stringify(body))

            productSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            productSpan.log({
                'event': 'request_end'
              });
            productSpan.finish();

            res.end();
        } 
        else {
            //console.log("Error with log in: " + req.body.username);
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusMessage))
           
            productSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            productSpan.setTag(opentracing.Tags.ERROR, true);
            productSpan.log({
              'event': 'error',
              'message': response.statusMessage.toString()
            });
            productSpan.log({
              'event': 'request_end'
            })
            productSpan.finish();
           
            res.end();
        }

    }); // end of request
});

app.get("/catalogliveness", function(req, res, next) {

    console.log('requesting catalog status')

    var options = {
        uri: endpoints.catalogUrl + '/liveness',
        method: 'GET',
        json: true
      };
 
      request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }

        if (response.statusCode == 200) {
            console.log('getting catalog status')
            res.writeHead(200)
            res.write(JSON.stringify(body))
            res.end();
        } 
        else {
            //console.log("Error with log in: " + req.body.username);
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusMessage))
            res.end();
        }

    }); // end of request
});


app.get("/products/:id", function(req, res, next) {

    console.log('requesting product details')

    const productSpan = opentracing.globalTracer().startSpan('get_product', {
        tags :{
          'http.method' : 'GET',
          'http.url': `http://${req.headers.host}${req.url}`,
          'product.id': req.params.id
        }
      });

        
    opentracing.globalTracer().inject(productSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri:  endpoints.catalogUrl + "/products/" + req.params.id,
        method: 'GET',
        json: true,
        headers: headers
      };

      request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }

        if (response.statusCode == 200) {
            console.log('getting product info')
            res.writeHead(200)
            res.write(JSON.stringify(body))

            productSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            productSpan.log({
                'event': 'request_end'
              });
            productSpan.finish();

            res.end();
        } 
        
        else {
            //console.log("Error with log in: " + req.body.username);
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusCode))

            productSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
            productSpan.setTag(opentracing.Tags.ERROR, true);
            productSpan.log({
              'event': 'error',
              'message': response.statusMessage.toString()
            });
            productSpan.log({
              'event': 'request_end'
            })
            productSpan.finish();

            res.end();
        }

    }); // end of request
});

app.get("/static/images/:id", function(req, res, next){


    console.log("retrieving images")

    var url = endpoints.catalogUrl + "/static/images/" + req.params.id

    request.get(url)
    .on('error', function(e) { next(e); })
    .pipe(res); // end of request


});

module.exports = app;