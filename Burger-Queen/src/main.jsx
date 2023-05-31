/* import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
 */

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import  Home  from './components/Home.jsx';
import  Login  from './components/Login.jsx';
import Waiter from './components/waiter/Waiter'
import '../src/components/style.css/waiter.css'
import './index.css'
import { AuthProvider } from '../src/AuthContext'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: 'login',
    element: <Login/>
  }, 
  {
    path: 'home',
    element: <Home/>
  },
  {
    path: 'waiter',
    element: <Waiter/>
  } 
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
   
  </AuthProvider>,
);

