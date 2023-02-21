import axios from "axios";
import { useState } from "react";

export default function PhotoUploader({addedPhotos, onChange}){
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();

        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        onChange(prev => {
            return [...prev, filename];
        });

        setPhotoLink('');

    }

function uploadPhoto(ev){
    const files=ev.target.files;
    const data=new FormData();
   //adding a new photo from device
    for(let i=0;i<files.length;i++){
        data.append('photos',files[i]);
    }

     //sending a req to API 
     axios.post('/upload',data,{
        headers:{'Content-type':'multipart/form-data'}
     }).then(response=> {
        const{data:filenames}=response;
        onChange(prev => {
            return [...prev, ...filenames];
        });
    })
}
    return(
<>


<div>
                            <input className='inline-flex border-2 border-gray-300 rounded-md w-5/6 max-w-full justify-between mt-1 p-1' value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)} placeholder=' Add photos using the link ...jpg '></input>
                            <button onClick={addPhotoByLink} className=" mt-4 px-4 py-2 ml-2 rounded-2xl">Add photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="flex h-32 " key={link}>
                                    {/* {link} */}
                                    <img  className='rounded-2xl w-full object-cover'src={'http://localhost:5000/uploads/' + link} alt=""/> 
                                </div>)
                            )}
                            <label className="flex justify-center cursor-pointer gap-1 border br-transparent rounded-2xl px-8 py-12 text-2xl text-gray-600">
                                    <input type="file" className="hidden" onChange={uploadPhoto} />

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload</label>
                        </div>


</>
        
    );
}