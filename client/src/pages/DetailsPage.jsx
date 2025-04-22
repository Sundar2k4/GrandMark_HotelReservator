import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookingPanel from "../BookingPanel";

export default function DetailsPage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos,setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/places/${id}`).then(response => {
                setPlace(response.data);
            });
        }
    }, [id]);

    if (!place) return '';

    if(showAllPhotos)
    {
        return(
            <div className="grid grid-cols-3 gap-2">
                {place?.photos?.length>0 && place.photos.map(photo => (
                    <div className="mb-2">
                        <img  className="h-[32rem] w-[32rem] rounded-xl " src={"https://grandmark-hotelreservator-api.onrender.com/uploads/"+photo} alt="" />
                    </div>
                ))}
                <button className="bg-primary text-white text-5xl hover:bg-black" onClick={()=>setShowAllPhotos(false)}>Return</button>
            </div>
        );
    }

    return (
        <div className="mt-5">
            <p className="px-2 py-2 font-semibold text-4xl">{place.title}</p>
            <a 
                target="_blank" 
                href={"https://maps.google.com/?q=" + place.address} 
                className="ml-2 underline text-sm cursor-pointer inline-flex"
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
                {place.address}
            </a>
    
            {/* Image grid */}
            <div className="grid grid-cols-3 gap-2 mt-2">
                {/* Main large image */}
                <div className="col-span-1 row-span-1">
                    {place.photos?.[0] && (
                        <img className="rounded-xl w-full h-full object-cover" src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[0]}`} alt="" />
                    )}
                </div>
                {/* Two small images on the top right */}
                <div className="grid grid-rows-2 gap-2">
                    {place.photos?.[1] && (
                        <img className="rounded-xl w-full h-full object-cover" src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[1]}`} alt="" />
                    )}
                    {place.photos?.[2] && (
                        <img className="rounded-xl w-full h-full object-cover" src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[2]}`} alt="" />
                    )}
                </div>
                {/* Medium image below the small images with button */}
                {place.photos?.[3] && (
                    <div className="col-span-1 relative">
                        <img className="rounded-xl w-full h-full object-cover" src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[3]}`} alt="" />
                        <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 bg-primary text-white bg-opacity-50 px-3 py-1 rounded-lg shadow-md hover:bg-black">
                            Show more
                        </button>
                    </div>
                )}
                <div className="mt-2 w-[215vh] text-white bg-opacity-80 bg-black rounded-xl p-5">
                    <p className="font-semibold text-2xl mb-3">About</p>
                    <h3 className="text-2xl">{place.description}</h3> 
                </div>
            </div>
            <div className="grid grid-cols-2 absolute">
                    <div className=" text-2xl bg-black text-white w-15 mt-2 bg-opacity-80 rounded-xl p-5">
                    <p className="font-bold">Details</p>
                    Check-In time: {place.checkIn} Am <br />
                    Check-Out time: {place.checkOut} Pm <br />
                    Max number of Guests: {place.maxGuests}
                    </div>
                   <BookingPanel place={place}/>
                    <div className="mt-2 w-[215vh] text-white text-2xl bg-opacity-80 bg-black rounded-xl leading-1  p-5">
                     <label className="font-bold">Extra Details </label> <br />
                     {place.extraInfo}
                    <div className=" border-4 border-primary p-5 rounded-xl mt-4">
                    <h2 className="text-lg font-semibold mb-3">Perks:</h2>
                    <div className="space-y-1">
                        {place.perks.map((perk, index) => (
                        <p key={index} className="text-white bg-secondary p-2 rounded-lg">
                           {perk}
                        </p>
                       ))}
                    </div>
                 </div>


                    
                   </div>
                   
            </div>
           
        </div>
    );
    
}    