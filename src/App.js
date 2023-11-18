import {
  createBrowserRouter,RouterProvider
} from "react-router-dom";
import React from 'react';
import Root from "./Root";
import Home from "./Components/Home";
import SignUp from "./Components/signup/SignUp";
import Login from "./Components/login/Login";
import Create from './Components/Create'
import View from "./Components/View";
import AddProduct from "./Components/AddProduct";
const router=createBrowserRouter([
  {
    path:'/',
    element:<Root />,
    children:[
      {
        index:true,element:<Home />
      },
      {
        path:'create',element:<Create />
      },
      {
        path:'view/:id',element:<View />
      },
      {
        path:'addProduct/:id',element:<AddProduct />
      },
      {
        path:'addProduct/:id/:productId',element:<AddProduct />
      },
    ]
  },
  {
    path:'signup',
    element:<SignUp />
  },
  {
    path:'login',
    element:<Login />
  },
  
  ])
  
  function App() {
    return (
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
    
    );
  }
  
  export default App;
  