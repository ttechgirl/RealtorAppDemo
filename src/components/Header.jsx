//the website header
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { FaCircle } from 'react-icons/fa'
//referencing location and navigate the path or route
import { useLocation, useNavigate} from 'react-router'

export default function Header() {
    const location = useLocation()
    const navigate= useNavigate()
    const [pageState,setPageState] = useState('Sign In')
    const auth = getAuth();

    //console.log(location.pathname);
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setPageState('Profile')
            }
            //setPageState('Sign In')
        })
    },[auth])
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                {/*logo*/}
                <img src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg' alt='logo' className='h-5 cursor-pointer' onClick={()=>navigate('/')}/>
            </div>
            <div>
                {/*header menu list*/}
                <ul className='flex space-x-10 cursor-pointer'>
                    <li className={`py-3 text-sm  font-semibold border-b-[3px] text-gray-400 border-b-transparent ${pathMatchRoute('/') && 'text-red-800 border-b-red-800'}`} onClick={()=>navigate('/')} >Home</li>
                    <li className={`py-3 text-sm  font-semibold border-b-[3px] text-gray-400 border-b-transparent ${pathMatchRoute('/offers') && 'text-red-800 border-b-red-800'}`} onClick={()=>navigate('/offers')}>Offers</li>
                    <li className={`py-3 text-sm  font-semibold border-b-[3px] text-gray-400 border-b-transparent ${pathMatchRoute('/sign-in') && 'text-red-800 border-b-red-800' || pathMatchRoute('/profile') && 'text-red-800 border-b-red-800'}`} onClick={()=>navigate('/profile')}>{pageState}</li> 
                    {/*practicing
                    <FaCircle onClick={()=>navigate('/profile')}></FaCircle> */}
                     

                </ul>
            </div>
        </header>
    </div>
  )
}
