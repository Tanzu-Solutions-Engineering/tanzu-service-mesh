const opentracing = require('opentracing');
var util = require('util')

// Uncomment the lines below, to send traces directly to the collector. 
const tracerIP = process.env.TRACER_HOST
const tracerPort = process.env.TRACER_PORT || 14268

const agentIP = process.env.JAEGER_AGENT_HOST
const agentPORT = process.env.JAEGER_AGENT_PORT || 6832

// Jaeger
var jaeger = require('jaeger-client');

var config = {
  serviceName: 'front-end',
  sampler: {
    type: "const",
    param: 1,
  },
  reporter: {
    'logSpans': true,
    //Uncomment the line below to send traces directly to the collector
    //'collectorEndpoint': ''
    // 'agentHost': tracerIP,
    // 'agentPort': tracerPort
    'agentHost': agentIP,
    'agentPort': agentPORT
  },
};
var options = {
  tags: {
    'front-end': '1.0.0',
  }
  // metrics: metrics,
  // logger: logger,
};


function initGlobalTracer(){

    console.log("Tracer Configuration " + config.serviceName)
  
    var tracer = jaeger.initTracer(config, options);

    const Tracer = opentracing.initGlobalTracer(tracer);
}

module.exports = {
    initGlobalTracer
}
