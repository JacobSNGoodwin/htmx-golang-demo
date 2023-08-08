package environment

/*
 * Reads environment into accessible config for other application layers
 */

import (
	"database/sql"
	"errors"
	"log"
	"os"

	_ "github.com/libsql/libsql-client-go/libsql"
	"go.uber.org/zap"
	_ "modernc.org/sqlite"
)

// could define interfaces here for any logger along with required implementations

type CONFIG struct {
	PORT string
	ENV  string
}

type Environment struct {
	DB     *sql.DB
	Logger *zap.Logger
	Config CONFIG
}

func Load() (*Environment, error) {
	logger, err := zap.NewDevelopment()

	defer logger.Sync()
	if err != nil {
		log.Fatalln("Unable to instantiate logger")
	}

	port, hasPort := os.LookupEnv("PORT")
	if !hasPort {
		logger.Warn(
			"HTTP Server Port Not configured",
		)
		return nil, errors.New("HTTP Server Port Not configured")
	}

	dbUrl := os.Getenv("DB_URL")
	db, err := sql.Open("libsql", dbUrl)

	if err != nil {
		logger.Warn("Failed to create DB connection")
		return nil, errors.New("failed to create DB connection")
	}

	if err := db.Ping(); err != nil {
		logger.Warn("Could not ping Database")
		return nil, errors.New("failed to ping DB")
	}

	// TODO - add TURSO connection in non-local environments

	return &Environment{
		DB:     db,
		Logger: logger,
		Config: CONFIG{
			PORT: port,
			ENV:  os.Getenv("ENV_TYPE"),
		},
	}, nil
}
