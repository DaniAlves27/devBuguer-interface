import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import {router} from "./routes"
import GlobalStyle from './styles/globalStyles'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
   <GlobalStyle />
   <ToastContainer autoClose="2000" />
  </StrictMode>,
)
