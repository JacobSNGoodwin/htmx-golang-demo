/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

const eventSource = new EventSource('/sse/dev-reload');

export function connectDevReload() {
  eventSource.onerror = (event) => {
    console.log('Server disconnected.', event);
  };

  eventSource.addEventListener('sse_connected', (event) => {
    console.log('Received "sse_connected" from server', event);
  });

  eventSource.onopen = (event) => {
    console.log('The dev-reload connection has been established.', event);
  };
}

window.addEventListener('beforeunload', (event) => {
  console.log('beforeunload', event);
  eventSource.close();
});
