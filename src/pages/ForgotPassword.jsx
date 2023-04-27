import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function ForgotPassword(){
  const [email,setEmail] =useState("");
  function onChange(e){
    setEmail(e.target.value);
 }
  return (
    <section>
    <h1  className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'> 
            <img src='https://media.istockphoto.com/id/1180641712/photo/lock-your-data.jpg?s=612x612&w=0&k=20&c=yupzk2T4vRxXD-Y6oYjEPN6VyUVGBlo1AKzT_WLPJg0=' alt="key" className='w-full rounded-2xl'/>
        </div>
        <div className='w-fill md:w-[67%] lg:w-[40%] lg:ml-20 mb-6  '>
            <form>
                <input type='email' id='email' placeholder='Email address' value={email} onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-sm transition ease-in-out mb-3' >
                </input>
                <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-4'> 
                  <p>
                    Remember password? <Link to='/sign-in' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-2'>Sign in instead</Link>
                  </p>
                </div>
            </form>
            <button className='w-full bg-blue-600 text-white py-2 px-4 text-xs font-medium uppercase rounded-sm shadow-md hover:bg-blue-700 transition duration-100 ease-in-out hover:shadow-lg active:bg-blue-900 mb-1' type='submit'>Send reset email</button>
            <div className='flex items-center my-3 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center text-sm font-medium'>OR</p>
            </div>
            <OAuth></OAuth>
        </div>
    </div>
    </section>
  )
}

  