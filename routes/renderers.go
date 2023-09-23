package routes

import "github.com/gofiber/fiber/v2"

func (r *Route) Admin(c *fiber.Ctx) error {
	return c.Render("admin", struct{ Title string }{Title: "Hello, ya twerp!"})
}

func (r *Route) Home(c *fiber.Ctx) error {
	return c.Render("index", struct{ Title string }{Title: "The Homey page"})
}

func (r *Route) Login(c *fiber.Ctx) error {
	return c.Render("login", struct{}{})
}
