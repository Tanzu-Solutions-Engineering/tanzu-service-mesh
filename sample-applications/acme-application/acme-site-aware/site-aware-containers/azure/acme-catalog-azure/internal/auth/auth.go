package auth

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/vmwarecloudadvocacy/catalogsvc/internal/db"
	"github.com/vmwarecloudadvocacy/catalogsvc/pkg/logger"
)

var (
	authServiceHost string

	authServicePort string
)

// getAuthURL method creates the url string necessary to make the /verify-token request to the Auth(user) service
func getAuthURL() string {

	authServiceHost = db.GetEnv("USERS_HOST", "user")
	authServicePort = db.GetEnv("USERS_PORT", "8083")
	authURL := fmt.Sprintf("http://%s:%s/verify-token", authServiceHost, authServicePort)

	logger.Logger.Infof("Returning Auth URL")
	return authURL
}

// AuthMiddleware method makes a call to the Auth(User) service to verify the "access_token" that was provided with the request.
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.GetHeader("Authorization")
		if clientToken == "" {
			logger.Logger.Errorf("Authorization token was not provided")
			c.JSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "message": "Authorization Token is required"})
			c.Abort()
			return
		}

		extractedToken := strings.Split(clientToken, "Bearer ")

		// Verify if the format of the token is correct
		if len(extractedToken) == 2 {
			clientToken = strings.TrimSpace(extractedToken[1])
		} else {
			logger.Logger.Errorf("Incorrect Format of Authn Token")
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Incorrect Format of Authorization Token "})
			c.Abort()
			return
		}

		// Create the body for the request to Auth service
		requestBody, err := json.Marshal(map[string]string{
			"access_token": extractedToken[1],
		})

		if err != nil {
			logger.Logger.Fatalf(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Incorrect Format of Authorization Token "})
			c.Abort()
			return
		}

		// Retrieve the URL for Auth service
		authSvcURL := getAuthURL()

		response, err := http.Post(authSvcURL, "application/json", bytes.NewBuffer(requestBody))

		if err != nil {
			logger.Logger.Errorf(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": err.Error()})
			c.Abort()
			return
		}

		if response.StatusCode != 200 {
			logger.Logger.Infof("User authorization failed. Ensure a valid access_token was provided - %s", response.Status)
			c.JSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "message": "User Unauthorized"})
			c.Abort()
			return
		}

		logger.Logger.Infof("User verification status - %s", response.Status)
		c.Next()

	}
}
