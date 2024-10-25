import React from 'react'
import IndexPage from './pages/IndexPage.jsx'
import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './pages/Layout.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  return (
<Routes>
  <Route path='/' element= {<Layout />} > 
    <Route index element = {<IndexPage />} />
    <Route path ="/Login" element = {<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
</Routes>

   
  )
}

export default App
