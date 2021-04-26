package logger

import (
	"os"
	"github.com/sirupsen/logrus"
)


var (
	Logger *logrus.Logger
	ServiceName = "catalog"
)

// This initiates a new Logger and defines the format for logs
func InitLogger(f *os.File) {

	Logger = logrus.New()
	Logger.SetFormatter(&logrus.JSONFormatter{
		TimestampFormat: "",
		PrettyPrint:     true,
	})

	// Set output of logs to Stdout
	// Change to f for redirecting to file
	Logger.SetOutput(os.Stdout)

}