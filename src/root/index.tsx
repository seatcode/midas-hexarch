import React from 'react'
import ReactDOM from 'react-dom'
import { DomainProvider } from 'domain/react'

import './styles/colors.css'
import './styles/global.css'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <DomainProvider>
      <App />
    </DomainProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
