import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const PlacesPage = () => {
  const {action} = useParams();
  const [title,setTitle] = useState('');
  const[address,setAddress] = useState('');
  const [photos,setPhotos] = useState([]);
  const[photoLink,setPhotoLink] = useState('');
  const[Description,setDescription] = useState('');
  const[Perks,setPerks] = useState([]);
  const[extraInfo,setExtraInfo] = useState([]);
  const[checkIn,setCheckIn] = useState('');
  const[checkOut,setCheckOut] = useState('');
  const[maxGuests,setMaxGuests] = useState('');
  const [addedPhotos,setAddedPhotos] =useState([]);

  async function addPhotoByLink(ev) {
   ev.preventDefault();
   try {
     const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
     setAddedPhotos((prev) => [...prev, filename]);
     setPhotoLink(''); // Corrected to use setPhotoLink as a function
   } catch (error) {
     console.error('Error uploading photo by link:', error);
   }
 }

 function uploadPhoto(ev)
 {
     const files = ev.target.files;
     console.log({files});
 }
  return (
       

        <div>
        {action!== 'new' && (
        <div>
        <Link className='bg-primary mb-4 px-[20vh] rounded-full py-2 text-white inline-flex hover:bg-black' to='/account/places/new'>
      
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        Add new places</Link><br></br>
        </div>

       )}
       {action==='new' && (
        <form>
         <h1 className='text-2xl'>Name</h1>
         <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder='Your amazing location name'/>
         <h1 className='text-2xl'>Address</h1>
         <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder='Your location details' />
         <h1 className='text-2xl'>Photos</h1>
         <p className='text-slate-400'>Add genuine updated photos...</p>
         <div className="flex gap-2">
         <input type="text" className='border border-none' value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}  placeholder=' Add images via link' />
         <button className='rounded-full px-8 py-2 bg-primary hover:bg-black text-white mt-3 px-4' onClick={addPhotoByLink}>Add&nbsp; Photo</button>
         </div>
       
         <div className="p-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
              <div key={index} className="">
                <img className='rounded-2xl' src={`http://localhost:4000/uploads/${link}`} alt="" />
              </div>
            ))}
         <label  className='text-slate-500  cursor-pointer bg-white text-4xl items-center p-2 gap-1 flex  text-2xl hover:text-black'>
         <input type="file" className='hidden' onChange={uploadPhoto}/>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
         </svg>
         Upload
         </label>
         </div>
         <h1 className='text-2xl'>Description</h1>
         <textarea className='py-9 w-full border border-slate-200 rounded-xl'value={Description} onChange={ev => setDescription(ev.target.value)} placeholder='Describe your location with style!'></textarea>
         <h1 className='text-2xl'>Perks</h1>
         <p className='text-slate-400'>Select the needed perks:</p>
         <div className="">
            <div className=" items-center mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2"> {/* where the md means medium screen and lg means large screen */}
                <label className = 'border border-slate-200 p-4 rounded-xl'>
                <input type="checkbox" name="" id="" />
                <span className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>

                   Wifi
                </span>
                </label>
                <label className = 'border border-slate-300 rounded-xl p-4'>
                <input type="checkbox" name="" id="" />
                <span className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>

                   Free Parking
                </span>
                </label>
                <label className = 'border border-slate-300 rounded-xl p-4'>
                <input type="checkbox" name="" id="" />
                <span className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>

                   Tv
                </span>
                </label>
                <label className = 'border border-slate-300 rounded-xl p-4'>
                <input type="checkbox" name="" id="" />
                <span className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>

                   Radio
                </span>
                </label>
                <label className = 'border border-slate-300 rounded-xl p-4'>
                <input type="checkbox" name="" id="" />
                <span className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>

                   Pets
                </span>
                </label>
                <label className = 'border border-slate-300 rounded-xl p-4'>
                <input type="checkbox" name="" id="" />
                <span className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>

                    Private Entrance
                </span>
                </label>
            </div>
         </div>
         <h1 className='text-2xl'>Extras:</h1>
         <textarea className='py-9 w-full border border-slate-200 rounded-xl'value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder='Describe your extra needs'></textarea>
         <h1 className='text-2xl'>Timing</h1>
         <p className='text-slate-400'> Add the check in and the check out time</p>
         <div className="grid grid-cols-2 mt-2 sm:grid-cols-3">
         <div className="p-2">
            <p className='text-xl'>Check-In time</p>
            <input type="text" value={checkIn} onChange={ev =>setCheckIn(ev.target.value)} placeholder='Hours:Minutes'/>
         </div>
         <div className="p-2">
            <p className='text-xl'>Check-Out time</p>
            <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder='Hours:Minutes' />
         </div>
         <div className="p-2">
         <p className='text-xl'>Max number of the guests</p>
         <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder='2' />
         </div>
         </div>
         <button className='bg-primary text-white  py-2 rounded-full w-full hover:bg-black'>Proceed</button>
         </form>
       


       )}
    </div>
  );
}

export default PlacesPage