import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from './lib/router.jsx'
import RouterShell from './router.jsx'
import CSS from './styles/globalCSS.js'

const globalStyle = document.createElement('style')
globalStyle.setAttribute('data-driverent-global', 'true')
globalStyle.textContent = CSS
document.head.appendChild(globalStyle)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <RouterShell />
    </RouterProvider>
  </StrictMode>,
)
