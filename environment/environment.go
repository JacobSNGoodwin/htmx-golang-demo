package environment

/*
 * Reads environment into accessible config for other application layers
 */

import (
	"database/sql"

	_ "github.com/libsql/libsql-client-go/libsql"
)

type CONFIG struct{}

type Environment struct {
	DB     sql.DB
	Congig CONFIG
}

func New() (Environment, error) {
	return Environment{}, nil
}
