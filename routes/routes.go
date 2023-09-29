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

func InitializeRoutes(conf *Config) {
	r := Route{
		ENV: conf.Env,
	}

	conf.App.Get("/", r.Home)
	conf.App.Get("/login", r.Login)
	conf.App.Get("/admin", r.Admin)
	conf.App.Post("/clicked", func(c *fiber.Ctx) error {
		// c.Append("HX-Redirect", "/")
		return c.SendString("Hiya there")
	})

	// // For development reload
	// conf.App.Get("/sse/dev-reload", r.DevReload)
}
