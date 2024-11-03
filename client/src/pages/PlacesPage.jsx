import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../AccountNav';
import axios from 'axios';
const PlacesPage = () => {
const {action} = useParams();
const[places,setPlaces] = useState([]);
useEffect(() => {
   axios.get('/places').then(({ data }) => {
       setPlaces(data);
   });
}, []);


return (
  
      <div>
         <AccountNav/>
         
            <div>
            <Link
                className='bg-primary mb-4 px-[20vh] rounded-full py-2 text-white inline-flex hover:bg-black'
                to='/account/places/new'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Add new places
            </Link>
         </div>
         <div className="mt-5">
         {places.length > 0 && places.map(place => (//using the id to find the user and display the data 
          <div className='bg-gray-100 px-4 py-8 rounded-xl flex gap-4 text-xl' key={place.id}>
            {place.title}
            <p>{place.description}</p>
            {place.photos.length>0&&(
               <div className="w-32 h-32 bg-gray-200"><img src={place.photos[4]} alt="" /></div>
            )}
            
            </div> //and finally we are displaying the title from the DB!
          ))}
        </div>

    </div>
  );
}

export default PlacesPage