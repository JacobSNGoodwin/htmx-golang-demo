package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	httpLogger "github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html/v2"
)

func main() {
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	var port, hasPort = os.LookupEnv("PORT")

	if !hasPort {
		log.Fatalf("PORT not provided")
	}

	engine := html.New("./views", ".html")

	app := fiber.New(fiber.Config{
		Views:       engine,
		ViewsLayout: "layouts/main",
	})

	app.Use(httpLogger.New())
	// TODO - create env package/logger/db/etc
	// TODO - create data layer for raw db request
	// TODO - create service layer which returns data needed by views
	// TODO - create routes with dependency of service
	// We'll render views and set location headers inside of routes

	// serve public assets
	app.Static("/", "./public")
	app.Post("/clicked", func(c *fiber.Ctx) error {
		// c.Append("HX-Redirect", "/")
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
	log.Printf("\nStarting server on PORT: %s", port)

	<-done
	log.Printf("\nShutting down server on PORT: %s", port)

	if err := app.Shutdown(); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}
}
