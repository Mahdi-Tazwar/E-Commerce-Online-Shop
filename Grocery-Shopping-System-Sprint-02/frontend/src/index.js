import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "./const/Routes";
import {Toaster} from'react-hot-toast';
import {serverLocation} from './const/Constants.js';
import { AuthProvider } from './utils/AuthContext';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

axios.defaults.baseURL = serverLocation;
axios.defaults.withCredentials = true;

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
  </React.StrictMode>
);
