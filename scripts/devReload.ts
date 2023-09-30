/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { nanoid } from 'nanoid';

const clientId = nanoid();

type SSEConnectedPayload = {
  id: string;
  message: string;
};

export default function connectDevReload() {
  console.info(
    `Connecting to development reload event source for client: [${clientId}]`
  );
  const eventSource = new EventSource(`/sse/dev-reload?client_id=${clientId}`);

  eventSource.onerror = (event) => {
    console.info('Disconnected from reload server', event);
    eventSource.close();

    // janky-arse solution... but need to await for server to re-connect
    setTimeout(function () {
      location.reload();
    }, 1000);
  };

  eventSource.addEventListener('sse_connected', (event) => {
    const payload = JSON.parse(event.data) as SSEConnectedPayload;
    console.info('Received "sse_connected" from server with payload', payload);

    if (clientId !== payload.id) {
      console.warn('clientId does not match server id. Closing event source');
      eventSource.close();
    }
  });
}
