import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get("https://grandmark-hotelreservator-api.onrender.com/bookings")
        .then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  const { place } = booking;

  return (
    <div className="container mx-auto px-4">
      <div className="text-2xl mb-4 bg-primary bg-opacity-80 text-white p-5 rounded-xl hover:bg-black">
        <h1 className="text-4xl font-semibold mb-4">
          {booking.place.title}, {booking.place.address}
        </h1>
        <h1 className="mt-[-7px]">Cost per night: {booking.place.price}</h1>
        <p>Tenant Info:</p>
        <p>Name: {booking.name}</p>
        <p className="">Phone: {booking.mobile}</p>
        <p>Number of Tenants: {booking.numberOfGuests}</p>
        <p>Total Cost: {booking.price}</p>
        <p>Booking Id: {id}</p>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {/* Main large image */}
        <div className="col-span-2 row-span-2">
          {place?.photos?.[0] && (
            <img
              className="rounded-xl w-full h-full object-cover"
              src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[0]}`}
              alt=""
            />
          )}
        </div>

        {/* Two small images on the top right */}
        <div className="grid grid-rows-2 gap-2 col-span-1">
          {place?.photos?.[1] && (
            <img
              className="rounded-xl w-full h-full object-cover"
              src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[1]}`}
              alt=""
            />
          )}
          {place?.photos?.[2] && (
            <img
              className="rounded-xl w-full h-full object-cover"
              src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[2]}`}
              alt=""
            />
          )}
        </div>

        {/* Medium image below the small images with button */}
        {place?.photos?.[3] && (
          <div className="col-span-1 relative">
            <img
              className="rounded-xl w-full h-full object-cover"
              src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${place.photos[3]}`}
              alt=""
            />
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-2 right-2 bg-primary text-white bg-opacity-50 px-3 py-1 rounded-lg shadow-md hover:bg-black"
            >
              Show more
            </button>
          </div>
        )}
      </div>

      {/* Show more photos modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl max-w-4xl w-full overflow-y-auto">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="text-black hover:text-red-500 text-xl absolute top-4 right-4"
            >
              Close
            </button>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {place?.photos?.map((photo, index) => (
                <img
                  key={index}
                  className="rounded-xl w-full h-full object-cover"
                  src={`https://grandmark-hotelreservator-api.onrender.com/uploads/${photo}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="text-2xl mt-5 mb-4 bg-primary bg-opacity-80 text-white p-5 rounded-xl hover:bg-black">
        <p className="">
          ENJOY YOUR STAY{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>
        </p>
      </div>
    </div>
  );
}
