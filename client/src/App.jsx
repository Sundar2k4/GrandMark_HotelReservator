import React from 'react'
import IndexPage from './pages/IndexPage.jsx'
import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './pages/Layout.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import axios from 'axios'
import { useEffect } from 'react'
import { UserContextProvider } from './UserContext.jsx'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {
 return (
    <UserContextProvider>
     <Routes>
       <Route path='/' element= {<Layout />} > 
         <Route index element = {<IndexPage />} />
         <Route path ="/login" element = {<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
       </Route>
      </Routes>
    </UserContextProvider>

   
  )
}

export default App
