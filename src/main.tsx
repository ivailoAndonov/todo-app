import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"
import { worker } from "./app/mocks/browser"
import App from "./app/app"

import "./app/styles/index.css"
import "./app/styles/main.css"

// Start the MSW worker
if (process.env.NODE_ENV === "development") {
  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
