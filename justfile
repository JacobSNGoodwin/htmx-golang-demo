build-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --minify

db:
  turso dev --db-file data.db

app-dev: 
  reflex -r '.*\.(html|go)$' -s -- sh -c "just build-tailwind && go run main.go"