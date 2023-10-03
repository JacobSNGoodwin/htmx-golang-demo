# TODOS

- [x] - Make challenges table
  - [x] - id field (maybe just a UUID/ULID, doesn't matter much)
  - [x] - title (make this full-text searchable)
  - [x] - categories/tags (make this full-text searchable array to search items in array)
    - might not use this initially, but could be good for future filtering and building of lists
  - [x] - prompt type
  - [x] - prompt_details- probably a JSON type object because different types of challenges would have different prompt and responses

- [x] - move routes/handlers into a package

- [x] - create a scripts folder which will build scripts to be used in htmx
  - [x] - components folder
  - [x] - change build tool to bun
  - [x] - create a lit component and demonstrate inside of go-template

- [ ] - dev server
  - can I serve a separate process or port which doesn't reload with reflex? That way, if reflex reloads main application, this doesn't break connection.

- [ ] - add Clerk client sign sign in and sign up
- [ ] - add go Clerk client to the server environment
- [ ] - add Clerk SDK to go library for [session verification](https://clerk.com/docs/references/go/verifying-sessions)
- [ ] - create authorized grouped routes for applying auth middleware
