import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App, ErrorPage } from './App.jsx';
import './styles.css';
const router=createBrowserRouter([{path:'*',element:<App/>,errorElement:<ErrorPage/>}]);
createRoot(document.getElementById('root')).render(<React.StrictMode><RouterProvider router={router}/></React.StrictMode>);
