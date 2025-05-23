import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
// @ts-expect-error supported by rsbuild
import './main.css'
import { useAuth } from './hooks/useAuth'
import { queryClient, router } from './lib/router'

const RouterProviderContext = () => {
  const auth = useAuth()
  // Injects the useAuth hook in the router context
  return <RouterProvider router={router} context={{ auth }} />
}

const rootEl = document.getElementById('root')
if (rootEl && !rootEl.innerHTML) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProviderContext />
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
