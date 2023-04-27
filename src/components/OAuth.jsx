import React from 'react'
import{FcGoogle} from 'react-icons/fc'


export default function OAuth() {
  return (
    <button className='flex items-center justify-center w-full text bg-red-600 text-white py-2 px-4 text-xs font-medium uppercase rounded-sm shadow-md hover:bg-red-700 transition duration-100 ease-in-out hover:shadow-lg active:bg-red-900 mb-1' 
    type='submit'> <FcGoogle className='text-xl bg-white rounded-full mr-1'/>Continue with google
    </button>
  )
}
