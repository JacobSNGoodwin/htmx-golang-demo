watch-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --watch

build-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --minify

go-dev:
  air

dev: 
  just go-dev
  just watch-tailwind
