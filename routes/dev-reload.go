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

	// Perhaps not needed
	client_id := c.Query("client_id")

	connectedData := devServerData{
		Message: fmt.Sprintf("Connection estabilished at: %v", time.Now().Local()),
		Id:      client_id,
	}

	rebuildData := devServerData{
		Message: fmt.Sprintf("App rebuilding at at: %v", time.Now().Local()),
		Id:      client_id,
	}

	connectedMsg, _ := json.Marshal(connectedData)
	rebuildMsg, _ := json.Marshal(rebuildData)

	// Maybe we need a channel to receive Done here, then we can block
	// on that channel in the StreamWriter and return one it is received
	r.ENV.Logger.Info(
		connectedData.Message,
		zap.String("client_id", connectedData.Id),
	)
	done := c.Context().Done()

	c.Context().SetBodyStreamWriter(
		fasthttp.StreamWriter(
			func(w *bufio.Writer) {
				fmt.Fprintf(w, "event: sse_connected\n")
				// fmt.Fprintf(w, "retry: 50\n")
				fmt.Fprintf(w, "data: %s\n\n", connectedMsg)
				w.Flush()

				<-done

				r.ENV.Logger.Info("Reload client closing", zap.String("client_id", client_id))

				fmt.Fprintf(w, "event: rebuilding\n")
				fmt.Fprintf(w, "data: %s\n\n", rebuildMsg)
				w.Flush()
			}))

	return nil
}
