import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ScrollTop } from './routes/ScrollTop';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <ScrollTop />
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
