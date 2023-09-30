package routes

import "github.com/gofiber/fiber/v2"

func (r *Route) Auth(c *fiber.Ctx) error {
	return c.Render("auth", struct{}{})
}
