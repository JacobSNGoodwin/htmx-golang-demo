defaulf: 
  reflex -r '.*\.(html|go)$' -s -- sh -c "just build-tailwind && go run main.go"

build-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --minify

db:
  turso dev --db-file data.db

new-migration name:
  migrate create -ext sql -dir $PWD/migrations {{name}}

migrate-up count="1":
  migrate -source file://$PWD/migrations -database $DB_URL_MIGRATION up {{count}}

migrate-down count="1":
  migrate -source file://$PWD/migrations -database $DB_URL_MIGRATION down {{count}}

migrate-force version:
  migrate -source file://$PWD/migrations -database $DB_URL_MIGRATION force {{version}}
   