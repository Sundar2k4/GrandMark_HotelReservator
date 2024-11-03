import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
      axios.get('/places').then(response => {
          setPlaces([...response.data,...response.data]); // storing the details in the places state
      });
  }, []); // the useEffect second param is used to be a [] to store the details 

  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {places.length > 0 && places.map(place => (
            <div className="font-bold text-xl rounded-2xl">
              <div key={place.id} className="w-[22rem]"> {/* Add key prop here */}
                  {place.photos?.[0] && (
                      <img className="rounded-2xl mb-2" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" />
                  )}
                  </div>
                  {place.title}
                </div>
              
          ))}
      </div>
  );
}
