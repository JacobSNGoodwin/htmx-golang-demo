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
	"github.jacobsngoodwin.com/htmx-golang-demo/routes"
	"go.uber.org/zap"
)

func main() {
	env, err := environment.Load()

	if err != nil {
		log.Fatalf("Failed LOAD Environment. %v", err)
	}

	defer env.Close()

	engine := html.New("./views", ".gohtml")

	app := fiber.New(fiber.Config{
		Views:       engine,
		ViewsLayout: "layouts/main",
	})

	app.Use(httpLogger.New())
	// serve public assets
	app.Static("/", "./public")

	routes.InitializeRoutes(&routes.Config{
		App: app,
		Env: *env,
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
		app.Shutdown()
	}()

	env.Logger.Info("Starting server", zap.String(
		"PORT",
		env.Config.PORT,
	))

	// app.Listen completes on successful app.Shutdown in goroutine
	if err := app.Listen(fmt.Sprintf(":%s", env.Config.PORT)); err != nil {
		env.Logger.Fatal("Server failed to listen", zap.Error(err))
	}

	env.Logger.Info("Server completed shutdown.")
}
