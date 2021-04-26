var express = require('express')
  , request = require('request')
  , bodyParser   = require("body-parser")
  , async        = require("async")
  , cookieParser = require("cookie-parser")
  , http = require('http')
  , users = require('./services/users')
  , products = require('./services/catalog')
  , cart = require('./services/cart')
  , order = require('./services/order')
  , jwt_decode = require('jwt-decode')

const tracer = require('./tracer')

tracer.initGlobalTracer();

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(cookieParser());

// Mount API endpoints for different backend services
app.use(users);
app.use(products)
app.use(cart)
app.use(order)

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Front end app listening on port %d !", port);
});


module.exports = app;