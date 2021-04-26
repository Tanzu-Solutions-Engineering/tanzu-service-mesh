var request = require('request')
var express = require("express")
var async = require("async")
var http = require('http')
var endpoints = require('../services')
var app = express()

const opentracing = require('opentracing');


app.post("/order/add/:userid", function(req, res, next){

    console.log("Sending to order for user " + req.params.userid);
   
    const orderSpan = opentracing.globalTracer().startSpan('add_order', {
        tags :{
          'http.method' : 'POST',
          'http.url': `http://${req.headers.host}${req.url}`,
        }
      });

    opentracing.globalTracer().inject(orderSpan.context() , opentracing.FORMAT_HTTP_HEADERS , req.headers)

    var headers = {
      "uber-trace-id": req.headers['uber-trace-id'],
      "Authorization": 'Bearer ' + req.cookies['logged_in']
    }

    var options = {
        uri: endpoints.orderUrl + '/order/add/' + req.params.userid,
        method: 'POST',
        body: req.body,
        json: true,
        headers: headers
    };

    console.log("Posting body to order service " + JSON.stringify(req.body));

    request(options, function(error, response, body){
        if (error) {
            return next(error);
        }

      // for debugging only
      console.log('Order status ' + response.statusCode )

      if(response.statusCode == 200) {
          console.log('Sending Info from order service')
          res.writeHead(200);
          res.write(JSON.stringify(body))
          orderSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          orderSpan.log({
              'event': 'request_end'
            });
          orderSpan.finish();
          res.end();
      } else {
          res.status(response.statusCode);
          res.write(JSON.stringify(response.statusMessage));
          orderSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, response.statusCode)
          orderSpan.setTag(opentracing.Tags.ERROR, true);
          orderSpan.log({
            'event': 'error',
            'message': response.statusMessage.toString()
          });
          orderSpan.log({
            'event': 'request_end'
          })
          orderSpan.finish();
          res.end();
      }


    }); // end of request

    
});


module.exports = app;