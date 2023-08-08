default:
  #!/usr/bin/env sh
  just watch-tailwind & just db & just app-dev

watch-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --watch

build-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --minify

db:
  turso dev --db-file data.db

# For local dev only
app-dev:
  reflex  -s -- sh -c "go run main.go"