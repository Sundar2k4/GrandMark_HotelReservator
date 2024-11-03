import React, { useState,useContext } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';
const ProfilePage = () => {

const[redirect,setRedirect] = useState(null);  
const {user,ready,setUser} = useContext(UserContext);


async function logout() 
{
  await axios.post('/logout');
  setRedirect('/'); //setting the value of the redirect 
  setUser(null);//setting the user name in the header to default
}


  if(!ready)
  {
    return <div>Loading...</div>
  }

  if(ready && !user && !redirect)//the ready is obtained from the usercontext.jsx to avoid the pagen reload taking back to login
  {//due to the user variable not initialized yet so ready acts as an extra condition.
    return <Navigate to={'/login'} />
  }
  const {subpage} = useParams();
  console.log(subpage)

  
  if(redirect)
  {
    return <Navigate to = {redirect}/> //navigates to the previously set redirect value
  }

  return (
    <div>
     <AccountNav />
      {subpage===undefined &&(
        <div className="mt-auto">
             Logged in as {user.name} through ({user.email})<br></br>
           <button onClick={() => logout()} className="mt-4 px-[30vh] py-2 bg-primary text-white font-semibold rounded-full hover:bg-black focus:outline-none">Logout</button>
        </div>
      )}


     {subpage === 'places' && (
      
        <div>
          <PlacesPage/>
        </div>

     )}


    </div>

   

  )
}

export default ProfilePage
