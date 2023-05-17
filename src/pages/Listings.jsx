import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {doc,getDoc} from 'firebase/firestore'
import {db} from '../firebase'
import Spinning from '../components/Spinning';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay,EffectFade } from 'swiper';
import 'swiper/css/bundle';
import {IoMdShareAlt}  from 'react-icons/io'
import {MdLocationPin} from 'react-icons/md'
import {FaBath,FaBed,FaParking, FaChair} from 'react-icons/fa'
import { getAuth } from 'firebase/auth';
import Contact from '../components/Contact';
import { Marker, Popup, TileLayer,MapContainer } from 'react-leaflet';

export default function Listings() {
    const auth=getAuth();
    const params = useParams();
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false);
    const [copyLink,setCopyLink] = useState(false);
    const [contactLandlord,setContactLandlord] = useState(false);
    SwiperCore.use([Autoplay,Navigation,Pagination]);

    useEffect(()=>{
        async function fetchListing(){
            const docRef= doc(db,'listings',params.listingId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false);
            }
        }
        fetchListing();
    },[listing,params.listingId])
    if(loading){
        return <Spinning/>
    }
   
  return (
    <main>
            {/*banner slide*/}
        <Swiper  
            slidesPerView ={1}
            navigation
            pagination={{type:'progressbar'}}
            effect='fade'
            modules={[EffectFade]}
            autoplay={{delay:2000}}
         >
           {listing !==null && listing.imgUrls.map((url,index)=>(
            <SwiperSlide key={index}>
              <div className="w-full overflow-hidden h-[450px] lg:h-[650px] relative"
                style={{
                    background: `url(${listing.imgUrls[index]}) center no-repeat `,
                    backgroundSize: `cover`
                }}
              ></div>
            </SwiperSlide>
           ))}
        </Swiper>
                {/*share function*/}
        <div className="top-[10%] fixed right-[5%] z-10 bg-white cursor-pointer rounded-full w-10 h-10 flex justify-center border-2 border-gray-400 items-center hover:animate-pulse"
        onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setCopyLink(true);
            setTimeout(() => {
                setCopyLink(false)
            }, 1000);
        }}>
            <IoMdShareAlt className='text-lg text-slate-500  '/>
        </div>
        {copyLink &&(
            <p className='top-[15%] fixed right-[8%] z-10 bg-white border border-gray-400 px-1 text-gray-500'>Listing link copied</p>
        )}
        <div className="flex bg-white m-4 shadow-lg flex-col md:flex-row rounded-lg max-w-6xl lg:mx-auto lg:space-x-5">
            <div className="shadow-lg shadow-slate-100 w-full">
              <p className='lg:text-xl sm:text-lg font-bold mb-3 text-blue-900 px-2 ml-2 '>
                { listing !==null && listing.name} - # {listing !==null &&listing.offer? listing.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                 :listing !==null && listing.regular.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}
                 {listing !==null &&listing.type ==='rent' ? ' / month' : ''}
              </p>
                <p className='flex items-center mb-3 font-semibold'> 
             <MdLocationPin className='h-4 w-4 text-green-600 mr-1 ml-2'/>
                {listing !==null &&listing.address }
                </p>
                <div className="flex items-center space-x-4 justify-start w-[75%] m-3">
                 <p className='bg-red-800 text-white w-full max-w-[100px] text-center text-sm font-semibold shadow-md rounded p-1'>
                  {listing !==null && listing.type ==='rent' ? 'Rent' : 'Sale'}
                 </p>
                 {/* {listing !==null && listing.offer ?(
                        <p className='bg-green-800 text-white w-full max-w-[100px] text-center text-sm font-semibold shadow-md rounded p-1'>
                            #{+listing.regular -  +listing.discount} discount
                        </p>
                    ): <p className='bg-green-800 text-white w-full max-w-[100px] text-center text-sm font-semibold shadow-md rounded p-1'>No discount</p>}*/}
                     <p className='bg-green-800 text-white w-full max-w-[100px] text-center text-sm font-semibold shadow-md rounded p-1'>
                          {listing !==null && listing.offers ? `Discount`
                          : 'No discount'
                          }
                      </p> 
              </div>
              <p className='m-3 '>
                <span className='font-semibold'>
                   Description - {listing !==null && listing.description}
                </span>
              </p>
              <ul className='flex items-center font-semibold space-x-2 sm:space-x-6 text-sm ml-2 mb-6'>
                <li className='flex items-center whitespace-nowrap'>
                    <FaBed className='text-lg mr-1'/>
                    {listing !==null && +listing.bedrooms > 1? `${listing.bedrooms} Beds` :'1 Bed'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                    <FaBath className='text-lg mr-1'/>
                    {listing !==null && +listing.bathrooms > 1? `${listing.bathrooms} Baths` :'1 Bath'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                    <FaParking className='text-sm sm:text-lg mr-1'/>
                    {listing !==null && listing.parking ? 'Parking space' :'No parking'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                    <FaChair className='text-lg mr-1'/>
                    {listing !==null && listing.furnished ? 'Furnished' :'Not furnished'}
                </li>
              </ul>
              {listing !==null && listing.userRef !== auth.currentUser?.uid && !contactLandlord &&(
                 <div className="mt-6">
                     <button className=' bg-blue-600 text-white font-medium px-7 py-3 items-center w-full rounded uppercase text-sm hover:to-blue-700 shadow-md hover:shadow-lg hover:bg-blue-700  transition duration-150 ease-in-out mb-6 mr-6 '
                     onClick={()=>setContactLandlord(true)}
                     >
                       Contact Realtor
                    </button>
                 </div>
              )}
              {contactLandlord && 
                <Contact userRef={listing.userRef} 
                listing= {listing}/>
              }
            </div>
            {/*map location.will fnction well with geolocation enabled */}
            <div className="shadow-lg w-full h-[200px] md:h-[400px] z-10 md:ml-2 overflow-x-hidden md:mt-6 ">
                <MapContainer 
                 center={[listing !==null && listing.latitude,listing !==null && listing.longitude]} 
                 zoom={13} scrollWheelZoom={false}
                 style={{height:'100%',width:'100%'}}
                 >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[listing !==null && listing.latitude,listing !==null && listing.longitude]}>
                    <Popup>
                    {listing !==null && listing.address}
                    </Popup>
                  </Marker>
                </MapContainer> 
            </div>
        </div>
    </main>
  )
}
