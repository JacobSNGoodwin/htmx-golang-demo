package routes

import (
	"bufio"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"
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

	// For development reload
	conf.App.Get("/sse/dev-reload", func(c *fiber.Ctx) error {
		c.Set("Content-Type", "text/event-stream")
		c.Set("Cache-Control", "no-cache")
		c.Set("Connection", "keep-alive")
		c.Set("Transfer-Encoding", "chunked")

		c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {

			for {
				msg := fmt.Sprintf("Connection estabilished at: %v", time.Now().Local())
				conf.Env.Logger.Info(msg)
				fmt.Fprintf(w, "event: sse_connected\n")
				fmt.Fprintf(w, "data: %s\n\n", msg)

				err := w.Flush()

				if err != nil {
					// Refreshing page in web browser will establish a new
					// SSE connection, but only (the last) one is alive, so
					// dead connections must be closed here.
					fmt.Printf("Error while flushing: %v. Closing http connection.\n", err)
					break
				}

				time.Sleep(100 * time.Second)
				// <-c.Context().Done()
				// conf.Env.Logger.Info("Closing dev connectiong")

			}
		}))

		return nil
	})
}
