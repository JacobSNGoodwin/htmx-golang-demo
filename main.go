package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func main() {
	done := make(chan os.Signal, 1)
	signal.Notify(done, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	var port, hasPort = os.LookupEnv("PORT")

	if !hasPort {
		log.Fatalf("PORT not provided")
	}

	engine := html.New("./views", ".html")

	app := fiber.New(fiber.Config{
		Views:       engine,
		ViewsLayout: "layouts/main",
	})

	// TODO - create env package with DB conn
	// TODO - Create data package with access to Env
	// TODO - Create views/render package for rendering responses in handlers

	// serve public assets
	app.Static("/", "./public")
	app.Post("/clicked", func(c *fiber.Ctx) error {
		return c.SendString("Hiya")
	})

	admin := app.Group("/admin")
	admin.Get("/", func(c *fiber.Ctx) error {
		return c.Render("admin", struct{ Title string }{Title: "Hello, ya twerp!"})
	})

	go func() {
		if err := app.Listen(fmt.Sprintf(":%s", port)); err != nil {
			// TODO - replace with Fiber logger maybe?
			log.Fatalf("listen: %s\n", err)
		}
	}()

	<-done
	log.Printf("\nShutting down server on PORT: %s", port)

	if err := app; err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}
}
