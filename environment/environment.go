package environment

/*
 * Reads environment into accessible config for other application layers
 */

import (
	"context"
	"errors"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/zap"
)

// could define interfaces here for any logger along with required implementations

type CONFIG struct {
	PORT string
	ENV  string
}

type Environment struct {
	DB     *pgxpool.Pool
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

	pool, err := pgxpool.New(context.Background(), os.Getenv("DB_URL"))

	if err != nil {
		logger.Warn("Failed to create DB connection")
		return nil, errors.New("failed to create DB connection")
	}

	var version string
	if err := pool.QueryRow(context.Background(), "select version()").Scan(&version); err != nil {
		logger.Fatal("Crap, could not even query Postgres verion. Probs a prob")
	}

	logger.Info("Successfully queried DB", zap.String("PG Version", version))

	return &Environment{
		DB:     pool,
		Logger: logger,
		Config: CONFIG{
			PORT: port,
			ENV:  os.Getenv("ENV_TYPE"),
		},
	}, nil
}

func (e *Environment) Close() {
	e.Logger.Info("Closing DB pool")
	e.DB.Close()
}
