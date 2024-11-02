import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Perks from '../Perks';
const PlacesPage = () => {
  const {action} = useParams();
  const [title,setTitle] = useState('');
  const[address,setAddress] = useState('');
  const [photos,setPhotos] = useState([]);
  const[photoLink,setPhotoLink] = useState('');
  const[Description,setDescription] = useState('');
  const[perks,setPerks] = useState([]);
  const[extraInfo,setExtraInfo] = useState([]);
  const[checkIn,setCheckIn] = useState('');
  const[checkOut,setCheckOut] = useState('');
  const[maxGuests,setMaxGuests] = useState('');
  const [addedPhotos,setAddedPhotos] =useState([]);
 

  async function addPhotoByLink(ev) {
   ev.preventDefault();
   const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
   setAddedPhotos(prev => { 
   return [...prev, filename];

   });
   
   setPhotoLink(''); // Corrected to use setPhotoLink as a function
  
 }

 function uploadPhoto(ev) {
   ev.preventDefault();
   const files = ev.target.files;
   const data = new FormData();

   // Append files to FormData
   for (let i = 0; i < files.length; i++) {
       data.append('photos', files[i]); // 'photos' should match the field name expected by multer
   }

   axios.post('/upload', data, {
       headers: { 'Content-Type': 'multipart/form-data' }
   }).then(response => {
       const { data: filenames } = response;
       setAddedPhotos(prev => {
           return [...prev, ...filenames];
       });
   })
   .catch(error => {
       console.error('Error uploading photos:', error);
   });
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
              <div key={index} className="h-32 flex items-center">
                <img className='rounded-2xl mb-4 object-cover h-32 w-full' src={`http://localhost:4000/uploads/${link}`} alt="" />
              </div>
            ))}
         <label  className='h-32 text-slate-500  cursor-pointer bg-white text-4xl items-center p-2 gap-1 flex  text-2xl hover:text-black'>
         <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
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
                <Perks selected={perks} onChange={setPerks} />
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