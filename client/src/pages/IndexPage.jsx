import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import {Link} from 'react-router-dom'

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
      axios.get('/places').then(response => {
          setPlaces([...response.data]); // storing the details in the places state
      });
  }, []); // the useEffect second param is used to be a [] to store the details 

  return (
      <div className="grid ml-[15vh] gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg: grid-cols-4 mt-6">
          {places.length > 0 && places.map(place => (
            <Link to={'/place/'+place._id} className="rounded-2xl hover:scale-105 hover:ease-in duration-300">
              <div key={place.id} className="w-[22rem]"> {/* Add key prop here */}
                  {place.photos?.[0] && (
                      <img className="rounded-2xl mb-2" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" />
                  )}
                  </div>
                  <h2 className="font-bold">{place.title}</h2> 
                  <h3 className="text-gray-900">{place.address}</h3>
                  <div className="font-bold text-sm">
                    ₹{place.price} per night
                  </div>
                </Link>
              
          ))}
      </div>
  );
}
