//jsx (javascript xml)
import { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'
import ListedItem from '../components/ListedItem'

export default function Home() {
  //offers
  const [offerListings, setOfferListings]  =useState(null)
  
  useEffect(()=>{
    async function fetchListings(){
      try {
          //get reference
          const listingRef = collection(db,'listings')
          //create query
          const queries = query(listingRef,where('offers', '==', true),orderBy('timestamp' ,'desc'),limit(4))
          //execute query
          const querySnap =await getDocs(queries);
          const listings=[];
          querySnap.forEach((doc)=>{
            return listings.push({
              id:doc.id,
              data: doc.data()
            });
          });
          setOfferListings(listings);
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings();
  },[])
   //rent
   const [rentListings, setRentListings]  =useState(null)
  
   useEffect(()=>{
     async function fetchListings(){
       try {
           //get reference
           const listingRef = collection(db,'listings')
           //create query
           const queries = query(listingRef,where('type', '==', 'rent'),orderBy('timestamp' ,'desc'),limit(4))
           //execute query
           const querySnap =await getDocs(queries);
           const listings=[];
           querySnap.forEach((doc)=>{
             return listings.push({
               id:doc.id,
               data: doc.data()
             });
           });
           setRentListings(listings);
       } catch (error) {
         console.log(error)
       }
     }
     fetchListings();
   },[])
   //sale
   const [saleListings, setSaleListings]  =useState(null)
  
   useEffect(()=>{
     async function fetchListings(){
       try {
           //get reference
           const listingRef = collection(db,'listings')
           //create query
           const queries = query(listingRef,where('type', '==', 'sale'),orderBy('timestamp' ,'desc'),limit(4))
           //execute query
           const querySnap =await getDocs(queries);
           const listings=[];
           querySnap.forEach((doc)=>{
             return listings.push({
               id:doc.id,
               data: doc.data()
             });
           });
           setSaleListings(listings);
       } catch (error) {
         console.log(error)
       }
     }
     fetchListings();
   },[])
  return (
    <div>
      <Slider/>
      <div className="max-w-6xl mx-auto pt-10 space-y-6">
        {offerListings !==null && offerListings && offerListings.length > 0 &&(
          <div className="m-2 mb-6">
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent offers</h2>
          <Link to='/offers'>
            <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p> 
          </Link>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {offerListings.map((listing)=>(
              <ListedItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              />
            ))}
          </ul>
          </div>
       )}
       {rentListings !==null && rentListings && rentListings.length > 0 &&(
          <div className="m-2 mb-6">
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent rents</h2>
          <Link to='/category/rent'>
            <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more rents</p> 
          </Link>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {rentListings.map((listing)=>(
              <ListedItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              />
            ))}
          </ul>
          </div>
       )}
       {saleListings !==null && saleListings && saleListings.length > 0 &&(
          <div className="m-2 mb-6">
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent sales</h2>
          <Link to='/category/sale'>
            <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more sales</p> 
          </Link>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {saleListings.map((listing)=>(
              <ListedItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              />
            ))}
          </ul>
          </div>
       )}
      </div>
    </div>
  )
}
