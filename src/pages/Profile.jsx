import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {FcHome} from 'react-icons/fc'

export default function Profile() {
  const auth =getAuth();
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  });
  const {name,email}=formData;
  const navigate = useNavigate();

  function logOut(){
    auth.signOut();
    navigate('/')
  }
 const [updateDetails, setUpdateDetails] = useState(false);

 function onChange(e){
  setFormData((prevState)=>({
    ...prevState,[e.target.id]: e.target.value,
  })) 
 }
 
async function onSubmit(){
  try {
    if(auth.currentUser.displayName !==name){
      await updateProfile(auth.currentUser,{
        displayName:name,

      });
    const data= doc(db,'users', auth.currentUser.uid);
    await updateDoc(data,{
      name
    });
    toast.success('Profile updated successfully')
    }
  } catch (error) {
     toast.error('profile update not successful');

  }}
 
  return (
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Welcome {name} !</h1>
      <div className='w-full md:w-[50%] mt-6 px-3 '>
        <form  >
          {/*name input*/}
          <input type='text' id='name' value={name} disabled ={!updateDetails} onChange={onChange} className={`w-full px-4 py-2 mb-6  text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${updateDetails && 'bg-red-200 focus:bg-red-200'}`} ></input>

          {/*name input*/}
          <input type='email' id='email' value={email} disabled  className='w-full px-4 py-2 mb-6  text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' ></input>

          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p>Do you want to change your details?
               <span onClick={()=> {
                updateDetails && onSubmit() 
                setUpdateDetails((prevState) => !prevState);
               } }  className='text-blue-600 hover:text-blue-900 cursor-pointer transition ease-in-out duration-200'>

                {/*the user details is enable when update details is true but remains disabled when is false */}
               {updateDetails? 'Apply change' : 'Edit' } 
               </span>
            </p>
            <p onClick={logOut} className='flex ml-2 text-red-600 hover:text-red-900 transition ease-in-out duration-200 cursor-pointer'> Sign out</p>
          </div>
        
        </form>
        <button  type='submit' className='w-full  px-7 bg-blue-600 text-white text-sm sm:text-lg font-medium shadow-md transition ease-in-out duration-150 py-3 rounded-sm uppercase hover:bg-blue-700 hover:shadow-lg cursor-pointer'>
          <Link to='/create-listing' className='flex justify-center items-center'>
          <FcHome className='rounded-full bg-red-200 mr-2 text-2xl  border-2'/>
            Sell or rent your home
          </Link> 
          </button>
      </div>
    </section>
  )
}
