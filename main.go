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
	// To receive signal to gracefully shut down our server
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	var port, hasPort = os.LookupEnv("PORT")

	if !hasPort {
		log.Fatalf("PORT not provided")
	}

	engine := html.New("./views", ".html")

	app := fiber.New(fiber.Config{
		Views:       engine,
		ViewsLayout: "layouts/main",
	})

	// serve public assets
	app.Static("/", "./public")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", struct{ Title string }{Title: "Hello, ya twerp!"})
	})

	go func() {
		if err := app.Listen(fmt.Sprintf(":%s", port)); err != nil {
			// TODO - replace with Fiber logger maybe?
			log.Fatalf("listen: %s\n", err)
		}
	}()

	<-done
	log.Printf("\nShutting down server on PORT: %s", port)

	if err := app.Shutdown(); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}
}
