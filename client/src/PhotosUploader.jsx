
import axios from "axios";
import { useState } from "react";



export default function PhotosUploader({addedPhotos,onChange})
{
    
    const[photoLink,setPhotoLink] = useState('');
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => { 
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
            onChange(prev => {
                return [...prev, ...filenames];
            });
        })
        .catch(error => {
            console.error('Error uploading photos:', error);
        });
     }
     
 return(
    <>
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
    </>
   );
}