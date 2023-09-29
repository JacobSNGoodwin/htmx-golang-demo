package routes

import "github.com/gofiber/fiber/v2"

func (r *Route) Home(c *fiber.Ctx) error {
	return c.Render("index", struct{ Title string }{Title: "The Homey page"})
}
