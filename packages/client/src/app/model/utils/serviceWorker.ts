export const startServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with  scope: ', registration.scope);
      })
      .catch((error: string) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  } else {
    console.log(
      'Service worker is not supported. Please update the version or use another browser.'
    );
  }
};
