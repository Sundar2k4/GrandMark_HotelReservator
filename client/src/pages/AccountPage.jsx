import React, { useState,useContext } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
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
    let classs = 'inline-flex px-4 py-2 ';
    if(type === subpage  || subpage===undefined && type==='profile') //condition since the accountpage remains undefined at beginning
    {
      classs+=' bg-primary text-white rounded-full';
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
        
        <Link to={'/account'} className={changeclass('profile')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>

        MY PROFILE</Link>
        <Link to={'/account/bookings'} className={changeclass('bookings')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>

        MY BOOKINGS</Link>
        <Link to={'/account/places'} className= {changeclass('places')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>


        MY LOCATIONS</Link>
       
      </nav>
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

export default AccountPage
