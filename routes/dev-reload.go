package routes

import (
	"bufio"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func (r *Route) DevReload(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	// Maybe we need a channel to receive Done here, then we can block
	// on that channel in the StreamWriter and return one it is received
	done := c.Context().Done()

	c.Context().SetBodyStreamWriter(
		fasthttp.StreamWriter(
			func(w *bufio.Writer) {
				msg := fmt.Sprintf("Connection estabilished at: %v", time.Now().Local())
				r.ENV.Logger.Info(msg)
				fmt.Fprintf(w, "id: 123\n")
				fmt.Fprintf(w, "event: sse_connected\n")
				fmt.Fprintf(w, "data: %s\n\n", msg)
				err := w.Flush()
				if err != nil {
					// Refreshing page in web browser will establish a new
					// SSE connection, but only (the last) one is alive, so
					// dead connections must be closed here.
					r.ENV.Logger.Warn("Error while flushing. Closing http connection.", zap.Error(err))

					return
				}

				<-done

				r.ENV.Logger.Info("SSE Connection completed")
			}))

	return nil
}
