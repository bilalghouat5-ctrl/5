import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from './lib/router.jsx'
import RouterShell from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <RouterShell />
    </RouterProvider>
  </StrictMode>,
)
