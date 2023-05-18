import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Spinning from './Spinning';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay,EffectFade } from 'swiper';
import 'swiper/css/bundle';
import { useNavigate } from 'react-router';

export default function Slider() {
    const [getListings,setGetListings] =useState(null);
    const [loading,setLoading] =useState(true);
    const navigate =useNavigate();
    SwiperCore.use([Autoplay,Navigation,Pagination]);

  useEffect(()=>{
    async function fetchListings(){
        const listingRef = collection(db,'listings');
        const queries = query(
        listingRef,orderBy('timestamp','desc'),
       limit(5));
        const querySnap =await getDocs(queries);
        let listings =[];
        querySnap.forEach((doc)=>{
            return listings.push({
                id:doc.id,
                data:doc.data(),
            });
        });
        setGetListings(listings);
        setLoading(false);
    }
    fetchListings();
  },[]);
  if(loading){
    <Spinning/>
  }
  
  return (
     getListings && (
        <>
            <Swiper
                slidesPerView ={1}
                navigation
                pagination={{type:'progressbar'}}
                effect='fade'
                modules={[EffectFade]}
                autoplay={{delay:2000}}
             >
                {getListings.map(({data,id}) => (
                <SwiperSlide
                key={id} 
                onClick={()=> navigate(`/category/${data.type}/${id}`)}> 
                <div 
                style={{
                  background:`url(${data.imgUrls[0]}) center no-repeat`,backgroundSize:'cover'
                }}
                className="w-full  h-[450px] lg:h-[650px] relative overflow-hidden "
                >
                    <p className='text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-blue-500 shadow-lg opacity-90 rounded-br-2xl p-2'>
                        {data.name}
                    </p>
                    <p className='text-[#f1faee] absolute left-1 bottom-1 font-medium max-w-[90%] bg-red-500 shadow-lg opacity-90 rounded-tr-3xl p-2'>
                       #{data.discount ?? data.regular}
                        {data.type ==='rent' && ' /month' }
                    </p>
                </div>
              </SwiperSlide>
              ))}
            </Swiper>
        </>
     ) 
  )
}
