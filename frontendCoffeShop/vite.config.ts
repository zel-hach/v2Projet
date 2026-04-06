import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Vite 8 forwards window errors / unhandledrejection over the HMR WebSocket.
    // If connect() has not finished yet (or the socket failed), `send` runs on
    // undefined `ws` → "Cannot read properties of undefined (reading 'send')".
    // Disabling removes that path; fix the real rejection in app code separately.
    forwardConsole: false,
  },
})
