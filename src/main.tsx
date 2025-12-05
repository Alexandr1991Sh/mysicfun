import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from "@/app/ui/App/App.tsx";
import {BrowserRouter} from "react-router/internal/react-server-client";
import {Provider} from "react-redux";
import {store} from "@/app/model/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
       <Provider store={store}>
           <App />
       </Provider>
   </BrowserRouter>
  </StrictMode>,
)
