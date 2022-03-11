import React from 'react'
import ReactDOM from 'react-dom'
import { DomainProvider } from 'domain/react'

import './styles/colors.css'
import './styles/global.css'

import Root from './Root'

ReactDOM.render(
  <React.StrictMode>
    <DomainProvider>
      <Root />
    </DomainProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
