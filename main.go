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
	"github.jacobsngoodwin.com/htmx-golang-demo/environment"
	"go.uber.org/zap"
)

func main() {
	env, err := environment.Load()

	if err != nil {
		log.Fatalf("Failed LOAD Environment")
	}

	engine := html.New("./views", ".html")

	app := fiber.New(fiber.Config{
		Views:       engine,
		ViewsLayout: "layouts/main",
	})

	app.Use(httpLogger.New())
	// TODO - create env package for logger/db and other env variable dependent
	// stuffs
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

	// Graceful shutdown
	quit := make(chan os.Signal, 1)

	signal.Notify(quit, os.Interrupt, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	go func() {
		// This blocks until a signal is passed into the quit channel
		<-quit

		env.Logger.Info("Shutting down server", zap.String(
			"PORT",
			env.Config.PORT,
		))

		if err := app.Shutdown(); err != nil {
			env.Logger.Fatal("Server Shutdown Failed", zap.Error(err))
		}
	}()

	env.Logger.Info("Starting server", zap.String(
		"PORT",
		env.Config.PORT,
	))

	// app.Listen completes on successful app.Shutdown in goroutine
	if err := app.Listen(fmt.Sprintf(":%s", env.Config.PORT)); err != nil {
		env.Logger.Fatal("Server failed to listen", zap.Error(err))
	}

	env.Logger.Info("Server completed shutdown... closing connections")

	// TODO - close DB -> create env.Close method to shut down data and stuff
}
