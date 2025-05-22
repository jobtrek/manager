/**
 * Some helpers to interact with the api
 */
import ky from 'ky';

// Replace with an environment import
const baseUrl = import.meta.env.PUBLIC_APP_URL;

const api = ky.create({
  prefixUrl: baseUrl,
  credentials: 'include', // Needed to send cookies with fetch requests (for laravel sanctum),
  hooks: {
    beforeRequest: [
      (request) => {
        // Setup the X-XSRF-TOKEN for laravel sanctum (from XSRF-TOKEN cookie)
        try {
          console.info(document.cookie)
          const xsrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            .split('=')[1];

          if (xsrfToken) {
            request.headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrfToken));
          }
        } catch {
          console.info('no XSRF-TOKEN found in cookie')
        }
      },
    ],
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// TODO: Add an after hook that redirect to login page on 404 response from api

export { api };
