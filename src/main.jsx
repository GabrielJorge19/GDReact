import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { DataAppContext, DataApp } from './components/Context';



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <DataAppContext>
      <App />
    </DataAppContext>
  // </React.StrictMode>
)
