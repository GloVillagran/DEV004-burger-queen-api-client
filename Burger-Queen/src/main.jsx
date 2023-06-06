import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import  Home  from './components/Home.jsx';
import  Login  from './components/Login.jsx';
import Waiter from './components/waiter/Waiter';
import DeliveredOrdersList from './components/waiter/DeliveredOrdersList';
import OrdersChef from './components/chef/OrdersChef';
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
  }, 
  {
    path: 'orders',
    element: <DeliveredOrdersList/>
  },
  {
    path: 'chef',
    element: <OrdersChef/>
  } 
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
   
  </AuthProvider>,
);

