import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import  Home  from './components/Home.jsx';
import  Login  from './components/Login.jsx';
import Waiter from './components/waiter/Waiter';
import OrdersList from './components/waiter/OrdersList';
import OrdersChef from './components/chef/OrdersChef';
import AdminHome from "./components/admin/admin.jsx";
import './index.css'
import { AuthProvider } from '../src/AuthContext'
import Workers from "./components/admin/workers.jsx";


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
    element: <OrdersList/>
  },
  {
    path: 'chef',
    element: <OrdersChef/>
  }, 
  {
    path: 'admin',
    element: <AdminHome/>
  },
  {
    path: 'workers',
    element: <Workers/>
  } 
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
   
  </AuthProvider>,
);

