import { hydrateRoot, createRoot } from 'react-dom/client'

import '@mantine/core/styles.css'
import './scaffold.css'
import './index.css'
import App from './App'

/**
 * When `#redwood-app` isn't empty then it's very likely that you're using
 * prerendering. So React attaches event listeners to the existing markup
 * rather than replacing it.
 * https://reactjs.org/docs/react-dom-client.html#hydrateroot
 */
const einfachAppElement = document.getElementById('einfach')

if (einfachAppElement.children?.length > 0) {
  hydrateRoot(einfachAppElement, <App />)
} else {
  const root = createRoot(einfachAppElement)
  root.render(<App />)
}
