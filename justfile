db_url_migration := "pgx5://$DB_USER:$DB_PASSWORD@$DB_HOST/$DB_NAME?sslmode=verify-full"

default:
  reflex -r '.*\.(html|go|ts)$' -s -- sh -c "just build-scripts && just build-tailwind && go run main.go"

build-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --minify

db:
  turso dev --db-file data.db

new-migration name:
  migrate create -ext sql -dir $PWD/migrations {{name}}

migrate-up count="1":
  migrate -source file://$PWD/migrations -database {{db_url_migration}} up {{count}}

migrate-down count="1":
  migrate -source file://$PWD/migrations -database {{db_url_migration}} down {{count}}

migrate-force version:
  migrate -source file://$PWD/migrations -database {{db_url_migration}} force {{version}}

build-scripts:
  bun build ./scripts/src/index.ts --outdir ./public/scripts --target browser --sourcemap=external
   