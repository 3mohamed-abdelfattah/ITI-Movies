import { createRoot } from 'react-dom/client'
import App from '@/App.jsx'
import '@/styles/global.css'
import { Provider } from "react-redux";
import Store from './store/Store';

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>
)