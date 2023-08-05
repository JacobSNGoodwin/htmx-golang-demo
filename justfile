watch-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --watch

build-tailwind:
  npx tailwindcss -i input.css -o ./public/output.css --minify