/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { nanoid } from 'nanoid';

// I don't really know if this is even useful.
const storageKey = 'dev-server-id';

const getClientId = () => {
  const storedClientId = localStorage.getItem(storageKey);
  if (storedClientId) {
    return storedClientId;
  } else {
    const newClientId = nanoid(8);
    localStorage.setItem(storageKey, newClientId);
    return newClientId;
  }
};

const clientId = getClientId();

type SSEConnectedPayload = {
  id: string;
  message: string;
};

export default function connectDevReload() {
  let hasPreviouslyConnected = false;

  console.info(
    `Connecting to development reload event source for client: [${clientId}]`
  );
  const eventSource = new EventSource(`/sse/dev-reload?client_id=${clientId}`);

  // eventSource.onerror = (event) => {
  //   console.debug('Received error event from server', event);
  // };

  eventSource.onopen = () => {
    if (hasPreviouslyConnected === true) {
      eventSource.close();
      location.reload();
    } else {
      hasPreviouslyConnected = true;
    }
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
