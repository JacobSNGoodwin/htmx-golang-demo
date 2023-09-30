package routes

import (
	"bufio"
	"encoding/json"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

type devServerData struct {
	Message string `json:"message"`
	Id      string `json:"id"`
}

func (r *Route) DevReload(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	devServerData := devServerData{
		Message: fmt.Sprintf("Connection estabilished at: %v", time.Now().Local()),
		Id:      c.Query("client_id"),
	}

	devServerDataSer, _ := json.Marshal(devServerData)

	// Maybe we need a channel to receive Done here, then we can block
	// on that channel in the StreamWriter and return one it is received
	r.ENV.Logger.Info(
		devServerData.Message,
		zap.String("client_id", devServerData.Id),
	)
	done := c.Context().Done()

	c.Context().SetBodyStreamWriter(
		fasthttp.StreamWriter(
			func(w *bufio.Writer) {
				fmt.Fprintf(w, "event: sse_connected\n")
				// TODO - make retry configurable
				fmt.Fprintf(w, "retry: 500\n")
				fmt.Fprintf(w, "data: %s\n\n", devServerDataSer)
				err := w.Flush()
				if err != nil {
					// Refreshing page in web browser will establish a new
					// SSE connection, but only (the last) one is alive, so
					// dead connections must be closed here.
					r.ENV.Logger.Warn("Error while flushing. Closing http connection.", zap.Error(err))

					return
				}

				<-done

				r.ENV.Logger.Info("Reload client closing", zap.String("client_id", devServerData.Id))
			}))

	return nil
}
