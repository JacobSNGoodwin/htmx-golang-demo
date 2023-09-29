package routes

import "github.com/gofiber/fiber/v2"

func (r *Route) Admin(c *fiber.Ctx) error {
	return c.Render("admin", struct{ Title string }{Title: "Hello, ya twerp!"})
}
