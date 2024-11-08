import { useEffect, useState } from "react";
import { useParams, Navigate} from "react-router-dom";
import axios from 'axios';
import Perks from "../Perks.jsx";
import PhotosUploader from "../PhotosUploader.jsx";
import AccountNav from "../AccountNav.jsx";

export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);
    const [redirect,setRedirect] = useState(false);
    const[price,setPrice] = useState(500);
    const {id} = useParams();
    console.log({id});
    useEffect(()=>
    {
        if(!id)
        {
            return;
        }
        else
        {
            axios.get('/places/'+id).then( //obtaining the response from the backend and showcasing the data;
                response => {
                   const {data} = response;
                   setTitle(data.title);
                   setAddress(data.address);
                   setAddedPhotos(data.photos);
                   setDescription(data.description);
                   setPerks(data.perks);
                   setExtraInfo(data.extraInfo);
                   setCheckIn(data.checkIn);
                   setCheckOut(data.checkOut);
                   setMaxGuests(data.maxGuests);
                   setPrice(data.price);
                }); //this is for the people to edit the existing information 

        }
    
           
    },[id]);


    async function savePlace(ev) {
        ev.preventDefault();
        
        if (redirect) return; // Prevent further actions if already redirecting
    
        try {
            if (id) { // Updating an existing place
                await axios.put('/places', {
                    id,
                    title,
                    address,
                    addedPhotos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                });
            } else { // Adding a new place
                await axios.post('/places', {
                    title,
                    address,
                    addedPhotos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                });
            }
            setRedirect(true);
        } catch (error) {
            console.error("Error saving place:", error);
            // Handle the error (e.g., set an error message in state)
        }
    }
    
    if(redirect)
    {
        return <Navigate to={'/account/places'}></Navigate>
    }
    return (
              
                <div className="">
                    <form onSubmit={savePlace}>
                        <h1 className='text-2xl'>Name</h1>
                        <input
                            type="text"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            placeholder='Your amazing location name'
                        />
                        
                        <h1 className='text-2xl'>Address</h1>
                        <input
                            type="text"
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                            placeholder='Your location details'
                        />

                        <h1 className='text-2xl'>Photos</h1>
                        <p className='text-slate-400'>Add genuine updated photos...</p>
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                        <h1 className='text-2xl'>Description</h1>
                        <textarea
                            className='py-9 w-full border border-slate-200 rounded-xl'
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            placeholder='Describe your location with style!'
                        ></textarea>

                        <h1 className='text-2xl'>Perks</h1>
                        <p className='text-slate-400'>Select the needed perks:</p>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>

                        <h1 className='text-2xl'>Extras:</h1>
                        <textarea
                            className='py-9 w-full border border-slate-200 rounded-xl'
                            value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)}
                            placeholder='Describe your extra needs'
                        ></textarea>

                        <h1 className='text-2xl'>Timing</h1>
                        <p className='text-slate-400'>Add the check-in and check-out time</p>
                        <div className="mt-2 grid sm:grid-cols-2  md:grid-cols-4">
                            <div className="p-2">
                                <p className='text-xl'>Check-In time</p>
                                <input
                                    type="text"
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                    placeholder='Hours:Minutes'
                                />
                            </div>
                            <div className="p-2">
                                <p className='text-xl'>Check-Out time</p>
                                <input
                                    type="text"
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                    placeholder='Hours:Minutes'
                                />
                            </div>
                            <div className="p-2">
                                <p className='text-xl'>Max number of guests</p>
                                <input
                                    type="number"
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)}
                                    placeholder='2'
                                />
                            </div>
                            <div className="p-2">
                                <p className='text-xl'>Price per night</p>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={ev => setPrice(ev.target.value)}
                                    placeholder='2000'
                                />
                            </div>
                        </div>

                        <button className='bg-primary text-white py-2 rounded-full w-full hover:bg-black'>Proceed</button>
                    </form>
                </div>
            )}
        
    
