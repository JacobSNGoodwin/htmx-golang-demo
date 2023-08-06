package environment

/*
 * Reads environment into accessible config for other application layers
 */

import (
	"errors"
	"log"
	"os"

	_ "github.com/libsql/libsql-client-go/libsql"
	"go.uber.org/zap"
)

// could define interfaces here for any logger along with required implementations

type CONFIG struct {
	PORT string
}

type Environment struct {
	// DB     sql.DB
	Logger *zap.Logger
	Config CONFIG
}

func Load() (*Environment, error) {
	logger, err := zap.NewDevelopment()

	defer logger.Sync()
	if err != nil {
		log.Fatalln("Unable to instantiate logger")
	}

	var port, hasPort = os.LookupEnv("PORT")
	if !hasPort {
		logger.Warn(
			"HTTP Server Port Not configured",
		)
		return nil, errors.New("HTTP Server Port Not configured")
	}

	return &Environment{
		// DB: nil
		Logger: logger,
		Config: CONFIG{
			PORT: port,
		},
	}, nil
}
