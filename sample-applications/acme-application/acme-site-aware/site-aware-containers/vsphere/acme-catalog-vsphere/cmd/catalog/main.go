package main

import (
	"fmt"
	"io"
	"os"

	"github.com/gin-gonic/gin"
	opentracing "github.com/opentracing/opentracing-go"
	stdopentracing "github.com/opentracing/opentracing-go"
	jaeger "github.com/uber/jaeger-client-go"
	"github.com/uber/jaeger-client-go/config"
	jaegercfg "github.com/uber/jaeger-client-go/config"
	"github.com/vmwarecloudadvocacy/catalogsvc/internal/auth"
	"github.com/vmwarecloudadvocacy/catalogsvc/internal/db"
	"github.com/vmwarecloudadvocacy/catalogsvc/internal/service"
	"github.com/vmwarecloudadvocacy/catalogsvc/pkg/logger"
)

const (
	dbName         = "acmefit"
	collectionName = "catalog"
)

func initJaeger(service string) (opentracing.Tracer, io.Closer) {

	// Uncomment the lines below only if sending traces directly to the collector
	// tracerIP := GetEnv("TRACER_HOST", "localhost")
	// tracerPort := GetEnv("TRACER_PORT", "14268")

	agentIP := db.GetEnv("JAEGER_AGENT_HOST", "localhost")
	agentPort := db.GetEnv("JAEGER_AGENT_PORT", "6831")

	logger.Logger.Infof("Sending Traces to %s %s", agentIP, agentPort)

	cfg := &jaegercfg.Configuration{
		Sampler: &jaegercfg.SamplerConfig{
			Type:  "const",
			Param: 1,
		},
		Reporter: &jaegercfg.ReporterConfig{
			LogSpans:           true,
			LocalAgentHostPort: agentIP + ":" + agentPort,
			// Uncomment the lines below only if sending traces directly to the collector
			//			CollectorEndpoint: "http://" + tracerIP + ":" + tracerPort + "/api/traces",
		},
	}
	tracer, closer, err := cfg.New(service, config.Logger(jaeger.StdLogger))
	if err != nil {
		panic(fmt.Sprintf("ERROR: cannot init Jaeger: %v\n", err))
	}
	return tracer, closer
}

// This handles initiation of "gin" router. It also defines routes to various APIs
// Env variable CATALOG_IP and CATALOG_PORT should be used to set IP and PORT.
// For example: export CATALOG_PORT=8087 will start the server on local IP at 0.0.0.0:8087
func handleRequest() {

	router := gin.Default()

	router.Static("/static/images", "./web")

	nonAuthGroup := router.Group("/")
	{
		nonAuthGroup.GET("/liveness", service.GetLiveness)
		nonAuthGroup.GET("/products", service.GetProducts)
		nonAuthGroup.GET("/products/:id", service.GetProduct)
	}

	authGroup := router.Group("/")

	authGroup.Use(auth.AuthMiddleware())
	{
		authGroup.POST("/products", service.CreateProduct)
	}

	// Set default values if ENV variables are not set
	port := db.GetEnv("CATALOG_PORT", "8082")
	ip := db.GetEnv("CATALOG_HOST", "0.0.0.0")

	ipPort := ip + ":" + port

	logger.Logger.Infof("Starting catalog service at %s on %s", ip, port)

	router.Run(ipPort)
}

// This is the main function. It creates a logger file, along with sessions to DB and
// a collector for tracer
func main() {

	//create your file with desired read/write permissions
	f, err := os.OpenFile("log.info", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println("Could not open file ", err)
	} else {
		logger.InitLogger(f)
	}

	dbsession := db.ConnectDB(dbName, collectionName)

	logger.Logger.Infof("Successfully connected to database %s", dbName)

	tracer, closer := initJaeger("catalog")

	stdopentracing.SetGlobalTracer(tracer)

	handleRequest()

	db.CloseDB(dbsession)

	defer closer.Close()

	// defer to close
	defer f.Close()
}
