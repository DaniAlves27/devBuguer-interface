import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



import { Login } from './containers/Login'
import GlobalStyle from './styles/globalStyles'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Login />
   <GlobalStyle />
  </StrictMode>,
)
