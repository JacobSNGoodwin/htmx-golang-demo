/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

export function connectDevReload() {
  const eventSource = new EventSource('/sse/dev-reload');

  eventSource.onerror = (errorEvent) => {
    console.log('Server disconnected. Reloading page');

    location.reload();
  };

  eventSource.onmessage = (event) => {
    console.log('Received message from server', event);
  };

  eventSource.onopen = (e) => {
    console.log('The dev-reload connection has been established.');
  };
}
