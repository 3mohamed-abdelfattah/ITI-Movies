import { createRoot } from 'react-dom/client'
import App from '@/App.jsx'
import '@/styles/global.css'
import { Provider } from "react-redux";
import store from '@/middleware/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)