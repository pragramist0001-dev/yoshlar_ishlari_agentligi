import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './i18n'
import './index.css'
import { LoaderProvider } from './context/LoaderContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </Provider>
  </React.StrictMode>,
)
