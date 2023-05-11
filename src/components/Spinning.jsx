import React from 'react'
import spin from '../assets/svg/spin.svg'


export default function Spinning() {
  return (
    <div>
    <div className='flex items-center justify-center bg-black bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 z-50'>
      <img src={spin} alt='Loading...' className='h-30' />
   </div>
 </div>
  )
}
