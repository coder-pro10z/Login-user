import React, { useState } from 'react';
import { UserContext } from './UserContext';
import { useContext } from 'react';

const Card = () => {
  const [image, setImage] = useState(null); // Add state to store the selected image file
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSaveClick = () => {
    // Update the user data in the UserContext
    setUser(editedUser);
    setIsEditing(false);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFileInputChange = (event) => {
    setImage(event.target.files[0]);
  }; // Add a handler for the file input change event

  if (isEditing) {
    return (
      <div className="shadow-lg font-no rounded-md m-7 p-5 flex flex-col items-center">
        <div>
          <img src={image ? URL.createObjectURL(image) : user.profilePicture} alt="Profile picture" className="rounded-full h-20 w-20" />
        </div>
        <form className="flex flex-col items-center gap-3">
          <label>
            Name:
            <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
          </label>
          <label>
            Aadhar Number (Cannot be changed)
            
            <input type="text" name="uid" value={editedUser.uid} pattern="[0-9]{12}" required title="Please enter a valid 12-digit Aadhar number." />

          </label>
          <label>
            Profile picture:
            <input type="file" name="profilePicture" accept="image/*" onChange={handleFileInputChange} />
          </label>
          <div className="flex gap-3">
            <button className="bg-three rounded-md p-3" type="button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="bg-three rounded-md p-3" type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="shadow-lg font-no rounded-md m-[7%]  box-content h-60 w-72 p-4 border-4 flex flex-col items-center bg-three transform tarnsition duration-1000 hover:scale-110 ">
      <div>
        <img src={user.profilePicture} alt="Profile picture" className="rounded-full h-20 w-20" />
      </div>
      <div className=' flex justify-center p-[2%]'>
      <label>
            Name: {user.name}
            
          </label>
      </div>
      
      <span className='flex justify-start'>Email: {user.email}</span>
      <span>Aadhar No.: {user.uid}</span>
      <button className='flex gap-1  bg-three rounded-md p-3 align-end' onClick={handleEditClick}>Edit  
          <svg className='pt-2' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.3em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg></button> 
    </div>
  )
}

export default Card