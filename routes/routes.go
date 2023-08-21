package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.jacobsngoodwin.com/htmx-golang-demo/environment"
)

type Config struct {
	App *fiber.App
	Env environment.Environment
}

type Route struct {
	// s *Service
	ENV environment.Environment
}

func InitializeRoutes(c *Config) {

	r := Route{
		ENV: c.Env,
	}

	c.App.Get("/admin", r.Admin)
	c.App.Post("/clicked", func(c *fiber.Ctx) error {
		// c.Append("HX-Redirect", "/")
		return c.SendString("Hiya")
	})
}
