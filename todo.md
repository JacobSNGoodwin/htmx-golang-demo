# TODOS

- [x] - Make challenges table
  - [x] - id field (maybe just a UUID/ULID, doesn't matter much)
  - [x] - title (make this full-text searchable)
  - [x] - categories/tags (make this full-text searchable array to search items in array)
    - might not use this initially, but could be good for future filtering and building of lists
  - [x] - prompt type
  - [x] - prompt_details- probably a JSON type object because different types of challenges would have different prompt and responses

- [x] - move routes/handlers into a package

- [ ] - create a scripts folder which will build scripts to be used in htmx
  - [ ] - components folder
  - [ ] - create a lit component and demonstrate inside of go-template
