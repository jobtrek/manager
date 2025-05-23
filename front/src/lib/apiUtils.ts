/**
 * Some helpers to interact with the api
 */
import ky from 'ky'

// TODO: Automatic refresh oh the XSRF-TOKEN cookie
// TODO: Automatic management of the JWT token for the postgrest api (get the tocken if none, refresh it if expired)
// TODO: Add an after hook that redirect to login page on 404 response from api (or 404 error boundary)

// Replace with an environment import
const baseUrl = import.meta.env.PUBLIC_APP_URL

const api = ky.create({
  prefixUrl: baseUrl,
  credentials: 'include', // Needed to send cookies with fetch requests (for laravel sanctum),
  hooks: {
    beforeRequest: [
      (request) => {
        // Setup the X-XSRF-TOKEN for laravel sanctum (from XSRF-TOKEN cookie)
        try {
          // @ts-expect-error cookie can be undefined, catched by the try/catch block
          const xsrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            .split('=')[1]

          if (xsrfToken) {
            request.headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrfToken))
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
})

export { api }
