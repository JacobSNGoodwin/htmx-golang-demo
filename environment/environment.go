package environment

/*
 * Reads environment into accessible config for other application layers
 */

import (
	"database/sql"

	_ "github.com/libsql/libsql-client-go/libsql"
)

// could define interfaces here for any logger along with required implementations

type CONFIG struct{}

type Environment struct {
	DB     sql.DB
	Config CONFIG
}

func New() (Environment, error) {
	return Environment{}, nil
}
