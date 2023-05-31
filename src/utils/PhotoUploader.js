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


function removePhoto(ev,filename){
    ev.preventDefault()
onChange([...addedPhotos.filter(photo=>photo!==filename)]);
}

function selectAsMainPhoto(ev,filename){
    ev.preventDefault()
    onChange([filename,...addedPhotos.filter(photo=>photo!==filename)]);
    // const addedPhotosWithoutSelected = addedPhotos.filter(photo=>photo!==filename) 
    // const newAddedPhotos = [filename,...addedPhotosWithoutSelected];

}
    
    

    return(
<>


<div>
                            <input className='inline-flex border-2 border-gray-300 rounded-md w-5/6 max-w-full justify-between mt-1 p-1' value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)} placeholder=' Add photos using the link ...jpg '></input>
                            <button onClick={addPhotoByLink} className=" mt-4 px-4 py-2 ml-2 bg-primary rounded-2xl hover:translate-x-1.5 duration-500 hover:scale-95 hover:bg-three hover:text-primary">Add photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="flex relative  h-32 " key={link}>
                                    {/* {link} */}
                                    <img  className='rounded-2xl w-full object-cover'src={'http://localhost:5000/uploads/' + link} alt=""/> 
                                    <button onClick={ev=>removePhoto(ev,link)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black p-1 bg-opacity-50 rounded-xl">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    </button>

                                    <button onClick={ev=>selectAsMainPhoto(ev,link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black p-1 bg-opacity-50 rounded-xl">
                                    {link ===addedPhotos[0] && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="evenodd" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                        )}
                                    {link !==addedPhotos[0] && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                        )}
                                        

                                    </button>
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