import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Profile() {
  const auth =getAuth();
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  });
  const {name,email}=formData;
  const navigate = useNavigate();
  function onClick(){
    auth.signOut();
    navigate('/')
  }
  return (
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Welcome {name} !</h1>
      <div className='w-full md:w-[50%] mt-6 px-3 '>
        <form className=''>
          {/*name input*/}
          <input type='text' id='name' value={name} disabled className='w-full px-4 py-2 mb-6  text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' ></input>

          {/*name input*/}
          <input type='email' id='email' value={email} disabled className='w-full px-4 py-2 mb-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'></input>

          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p>Do you want to change your details?
               <span className='text-blue-600 hover:text-blue-900 cursor-pointer transition ease-in-out duration-200'>Edit</span>
            </p>
            <p onClick={onClick} className='flex ml-2 text-red-600 hover:text-red-900 transition ease-in-out duration-200 cursor-pointer'> Sign out</p>
          </div>
        </form>
      </div>
    </section>
  )
}
