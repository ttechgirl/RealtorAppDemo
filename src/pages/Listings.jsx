import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {doc,getDoc} from 'firebase/firestore'
import {db} from '../firebase'
import Spinning from '../components/Spinning';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay,EffectFade } from 'swiper';
import 'swiper/css/bundle';
import {IoMdShareAlt}  from 'react-icons/io'

export default function Listings() {
    const params = useParams();
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [copylink,setCopyLink] = useState(false);
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
        <Swiper  
            slidePerView ={1}
            navigation
            pagination={{type:'progressbar'}}
            effect='fade'
            modules={[EffectFade]}
            autoplay={{delay:2000}}
         >
           {listing !==null && listing.imgUrls.map((url,index)=>(
            <SwiperSlide key={index}>
              <div className="w-full overflow-hidden h-[450px] relative"
                style={{
                    background: `url(${listing.imgUrls[index]}) center no-repeat `,
                    backgroundSize: `cover`
                }}
              ></div>
            </SwiperSlide>
           ))}
        </Swiper>
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
        {copylink &&(
            <p className='top-[15%] fixed right-[8%] z-10 bg-white border border-gray-400 px-1 text-gray-500'>Link copied</p>
        )}
    </main>
  )
}
