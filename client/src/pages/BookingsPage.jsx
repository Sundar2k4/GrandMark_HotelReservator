import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div className="">
            <AccountNav />
            <div className="gap-6 text-white rounded-2xl p-4 mt-2">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link
                        to={`/account/bookings/${booking._id}`}
                        className="flex gap-4 mb-6 p-4 bg-primary rounded-xl hover:bg-opacity-90"
                        key={booking._id}
                    >
                        {booking.place?.photos?.length > 0 && (
                            <div className="w-48 mb-5">
                                <img
                                    className="object-cover rounded-xl"
                                    src={`http://localhost:4000/uploads/${booking.place.photos[0]}`}
                                    alt={booking.place.title}
                                />
                            </div>
                        )}
                        <div className="text-xl font-semibold">
                            <h2>{booking.place.title}</h2>
                            <h1>Region: {booking.place.address}</h1>
                            <p>From: {format(new Date(booking.checkIn), 'dd-MM-yyyy')} Till {format(new Date(booking.checkOut), 'dd-MM-yyyy')}</p>
                            <p>Number of Nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}</p>
                        </div>
                        <div className="text-2xl font-semibold ml-auto">
                            <p>Number of Guests: {booking.numberOfGuests}</p>
                            <p>Price: ₹{booking.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
