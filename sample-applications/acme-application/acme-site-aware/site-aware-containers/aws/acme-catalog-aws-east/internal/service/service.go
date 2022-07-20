package service

import (
	"net/http"

	tracelog "github.com/opentracing/opentracing-go/log"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
	stdopentracing "github.com/opentracing/opentracing-go"
	"github.com/vmwarecloudadvocacy/catalogsvc/internal/db"
	"github.com/vmwarecloudadvocacy/catalogsvc/pkg/logger"
)

// Product struct
type Product struct {
	ID               bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name             string        `json:"name"`
	ShortDescription string        `json:"shortDescription"`
	Description      string        `json:"description"`
	ImageURL1        string        `json:"imageUrl1"`
	ImageURL2        string        `json:"imageUrl2"`
	ImageURL3        string        `json:"imageUrl3"`
	Price            float32       `json:"price"`
	Tags             []string      `json:"tags"`
}

// Liveness struct
type Liveness struct {
	Version     string `json:"version"`
	ServiceName string `json:"servicename"`
}

// GetLiveness returns a JSON object with information about the service
func GetLiveness(c *gin.Context) {
	version := db.GetEnv("CATALOG_VERSION", "v1")

	liveness := Liveness{
		Version:     version,
		ServiceName: logger.ServiceName,
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": liveness})
}

// GetProducts accepts context as input and returns JSON with all the products
func GetProducts(c *gin.Context) {
	var products []Product

	tracer := stdopentracing.GlobalTracer()

	productSpanCtx, _ := tracer.Extract(stdopentracing.HTTPHeaders, stdopentracing.HTTPHeadersCarrier(c.Request.Header))

	productSpan := tracer.StartSpan("db_get_products", stdopentracing.ChildOf(productSpanCtx))
	defer productSpan.Finish()

	error := db.Collection.Find(nil).All(&products)

	if error != nil {
		message := "Products " + error.Error()
		productSpan.LogFields(
			tracelog.String("event", "error"),
			tracelog.String("message", error.Error()),
		)
		productSpan.SetTag("http.status_code", http.StatusNotFound)
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": message})
		return
	}

	productSpan.SetTag("http.status_code", http.StatusOK)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": products})

}

// GetProduct accepts a context as input along with a specific product ID and returns details about that product
// If a product is not found, it returns 404 NOT FOUND
func GetProduct(c *gin.Context) {
	var product Product

	tracer := stdopentracing.GlobalTracer()

	productSpanCtx, _ := tracer.Extract(stdopentracing.HTTPHeaders, stdopentracing.HTTPHeadersCarrier(c.Request.Header))

	productSpan := tracer.StartSpan("db_get_product", stdopentracing.ChildOf(productSpanCtx))
	defer productSpan.Finish()

	productID := c.Param("id")

	productSpan.LogFields(
		tracelog.String("event", "string-format"),
		tracelog.String("product.id", productID),
	)

	// Check if the Product ID is formatted correctly. If not return an Error - Bad Request
	if bson.IsObjectIdHex(productID) {
		error := db.Collection.FindId(bson.ObjectIdHex(productID)).One(&product)

		if error != nil {
			message := "Product " + error.Error()
			productSpan.LogFields(
				tracelog.String("event", "error"),
				tracelog.String("message", error.Error()),
			)
			productSpan.SetTag("http.status_code", http.StatusNotFound)
			c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": message})
			return
		}

	} else {
		message := "Incorrect Format for ProductID"
		productSpan.LogFields(
			tracelog.String("event", "error"),
			tracelog.String("message", message),
		)
		productSpan.SetTag("http.status_code", http.StatusNotFound)
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": message})
		return
	}

	productSpan.SetTag("http.status_code", http.StatusOK)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": product})

}

// CreateProduct adds a new product item to the database
func CreateProduct(c *gin.Context) {
	var product Product

	error := c.ShouldBindJSON(&product)

	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Incorrect Field Name(s)/ Value(s)"})
		return
	}

	product.ID = bson.NewObjectId()

	error = db.Collection.Insert(&product)

	if error != nil {
		message := "Product " + error.Error()
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": message})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated, "message": "Product created successfully!", "resourceId": product})

}
