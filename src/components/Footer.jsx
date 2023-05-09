import React from 'react'
import { FaCopyright } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="mt-[50%] justify-end">
       <div className='bg-teal-50 relative  w-full bottom-0 z-40 '>
            <footer className='flex items-center justify-center gap-y-6 gap-x-12 px-3 py-6 text-center md:justify-between text-xs sm:text-sm font-semibold border-b-2 shadow-md border-b-transparent text-red-600 '>
               &copy; 2023 realtor-demo
            </footer>
        </div>
    </div>
       
  )
}
