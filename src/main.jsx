import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Pages/Home/Home';
import AuthProvider from './Components/Provider/AuthProvider';
import Register from './Components/Pages/Register/Register';
import Login from './Components/Pages/Login/Login';
import FeatureDetails from './Components/Pages/Home/FeatureDetails';
import PrivateRoute from './Components/Route/PrivateRoute';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import MyProfile from './Components/Pages/Dashboard/User/MyProfile';
import AddProducts from './Components/Pages/Dashboard/User/AddProducts';
import MyProduct from './Components/Pages/Dashboard/User/MyProduct';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path:'register',
        element:<Register></Register>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/featureDetails/:id',
        element:<PrivateRoute><FeatureDetails></FeatureDetails></PrivateRoute>,
        loader:()=>fetch('http://localhost:5000/featureProduct')
      }
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      // user related
      {
        path:'myProfile',
        element:<MyProfile></MyProfile>
      },
      {
        path:'addProducts',
        element:<AddProducts></AddProducts>
      },
      {
        path:'myProducts',
        element:<MyProduct></MyProduct>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
