import React, { useState } from 'react'
import { UserContext } from '../UserContext'
import { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
const AccountPage = () => {

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

  function changeclass(type=null) // function to change the marker from one header to another
  {
    let classs = 'px-4 py-2';
    if(type === subpage  || subpage===undefined && type==='profile') //condition since the accountpage remains undefined at beginning
    {
      classs+=' bg-primary rounded-full text-white';
    }

    return classs;
  } 

  if(redirect)
  {
    return <Navigate to = {redirect}/> //navigates to the previously set redirect value
  }

  return (
    <div>
      <nav  className='w-full mt-4 gap-6 flex mb-8'>
        
        <Link to={'/account'} className={changeclass('profile')}>MY PROFILE</Link>
        <Link to={'/account/bookings'} className={changeclass('bookings')}>MY BOOKINGS</Link>
        <Link to={'/account/places'} className= {changeclass('places')}>MY LOCATIONS</Link>
       
      </nav>
      {subpage===undefined &&(
        <div className="mt-auto">
             Logged in as {user.name} through ({user.email})<br></br>
           <button onClick={() => logout()} className="mt-4 px-[30vh] py-2 bg-primary text-white font-semibold rounded-full hover:bg-black focus:outline-none">Logout</button>
        </div>
      )}
    </div>
  )
}

export default AccountPage
