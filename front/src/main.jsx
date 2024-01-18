import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './bootstrap.min.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
