import React from 'react'
import IndexPage from './pages/IndexPage.jsx'
import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './pages/Layout.jsx'


const App = () => {
  return (
<Routes>
  <Route path='/' element= {<Layout />} > 
    <Route index element = {<IndexPage />} />
    <Route path ="/Login" element = {<LoginPage />} />
  </Route>
</Routes>

   
  )
}

export default App
