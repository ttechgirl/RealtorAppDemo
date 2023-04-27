//the website header
import React from 'react'
//referencing location and navigate the path or route
import { useLocation, useNavigate} from 'react-router'

export default function Header() {
    const location = useLocation()
    const navigate= useNavigate()

    //console.log(location.pathname);
    function pathRoute(route){
        if(route === location.pathname){
            return true;
        }
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                {/*logo*/}
                <img src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg' alt='logo' className='h-5 cursor-pointer' onClick={()=>navigate('/')}/>
            </div>
            <div>
                {/*header menu list*/}
                <ul className='flex space-x-10 cursor-pointer'>
                    <li className={`py-3 text-sm  font-semibold border-b-[3px] text-gray-400 border-b-transparent ${pathRoute('/') && 'text-red-800 border-b-red-800'}`} onClick={()=>navigate('/')} >Home</li>
                    <li className={`py-3 text-sm  font-semibold border-b-[3px] text-gray-400 border-b-transparent ${pathRoute('/offers') && 'text-red-800 border-b-red-800'}`} onClick={()=>navigate('/offers')}>Offers</li>
                    <li className={`py-3 text-sm  font-semibold border-b-[3px] text-gray-400 border-b-transparent ${pathRoute('/sign-in') && 'text-red-800 border-b-red-800'}`} onClick={()=>navigate('/sign-in')}>Sign In</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
