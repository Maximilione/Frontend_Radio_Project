import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './state/store'
import { Provider } from 'react-redux'

//creazione root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider> 
)
