import { useContext, useEffect, useState } from "react";
import {UserContext} from "./UserContext.jsx"
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingPanel({ place }) {
    const [name, setName] = useState(''); // New state for the name input
    const [mobile,setMobile] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);
   
    useEffect(()=>
    {
        if(user)
        {
            setName(user.name);
        }
         
    },[user])

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    
    async function bookThisPlace()
    {
        const response =  await axios.post('/bookings',{checkIn,checkOut,numberOfGuests,name,mobile,place:place._id,price:numberOfDays*place.price})
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);    
    }
    if(redirect)
    {
        return <Navigate to={redirect}/>
    }

    return (
        <div className="px-4 flex relative grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div className="text-2xl bg-black text-white bg-opacity-80 rounded-xl p-10 mt-2">
                <p className="font-bold">Booking</p>
                <div className="h-full w-[90vh] p-2">
                    Price: ₹{place.price}/night <br />
                    <div className="p-4 mb-2 border-4 border-primary rounded-xl text-white">
                        <label>Check-In: </label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            className="inline-flex rounded-xl bg-black text-white p-2 mb-2 w-full"
                        />
                        <br />
                        <label>Check-Out: </label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            className="inline-flex rounded-xl bg-black text-white p-2 mb-2 w-full"
                        />
                        <br />
                        <label>Number of guests: </label>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={ev => setNumberOfGuests(ev.target.value)}
                            className="bg-black text-white p-2 rounded-xl mb-2 w-full"
                        />
                    </div>
                    {numberOfDays > 0 && (
                        <div className="p-4 mb-2 border border-white-200 rounded-xl text-white">
                            <label> Full Name: </label>
                            <input
                                type="text" 
                                value={name}
                                onChange={ev => setName(ev.target.value)} 
                                className="bg-black text-white p-2 rounded-xl mb-2 w-full"
                                placeholder="Enter your name" // Added a placeholder for better UX
                            />
                            <label> Phone Number: </label>
                            <input
                                type="tel" 
                                value={mobile}
                                onChange={ev => setMobile(ev.target.value)} 
                                className="bg-black text-white p-2 rounded-xl mb-2 w-full"
                                placeholder="Enter Phone number" // Added a placeholder for better UX
                            />
                        </div>
                    )}
                    <button onClick={bookThisPlace} className="bg-primary py-2 text-white text-md w-full rounded-xl mt-4 hover:bg-black">
                        Book Now 
                        {numberOfDays > 0 && (
                            <span>
                                ₹{numberOfDays * place.price} 
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
