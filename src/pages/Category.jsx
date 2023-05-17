import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';
import Spinning from '../components/Spinning';
import ListedItem from '../components/ListedItem';
import { useParams } from 'react-router';

export default function Category() {
  const [loading,setLoading] = useState(true);
  const [offerListings,setOfferListings] =useState(null);
  const [recentListings,setRecentListings] =useState(null);
  const params =useParams();

  useEffect(()=>{
    async function fetchListings(){
      try {
         //get reference
         const listingRef = collection(db,'listings')
         //create query
         const queries = query(listingRef,where('type', '==', params.categoryName),orderBy('timestamp' ,'desc'),limit(8))
         //execute query
         const querySnap =await getDocs(queries);
         const recent = querySnap.docs[querySnap.docs.length - 1];
         setRecentListings(recent);
         const listings=[];
         querySnap.forEach((doc)=>{
           return listings.push({
             id:doc.id,
             data: doc.data()
           });
         });
         setOfferListings(listings);
         setLoading(false);
      } catch (error) {
        toast.error('Could not fetch list');
      }
    }
    fetchListings();
  },[params.categoryName])

  async function loadMoreListings(){
    try {
      //get reference
      const listingRef = collection(db,'listings')
      //create query
      const queries = query(listingRef,where('type', '==', params.categoryName),orderBy('timestamp' ,'desc'),startAfter(setRecentListings) ,limit(4))
      //execute query
      const querySnap =await getDocs(queries);
      const recent = querySnap.docs[querySnap.docs.length - 1];
      setRecentListings(recent);
      const listings=[];
      querySnap.forEach((doc)=>{
        return listings.push({
          id:doc.id,
          data: doc.data()
        });
      });
      setOfferListings((prevState)=> [...prevState,...listings]);
      setLoading(false);
   } catch (error) {
         console.log(error)
   }
  }
  return (
    <div className='max-w-6xl mx-auto px-3'>
        <h1 className='font-bold text-3xl text-center mt-6'>
            {params.categoryName === 'rent' ? 'Places for rent' : 'Places for Sale'}
        </h1>
        {loading ? (
          <Spinning/>
        ): offerListings && offerListings.length > 0 ?(
          <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6'> 
            {offerListings.map((listing)=>
              <ListedItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
              />
            )}
            </ul>
          </main>
          {recentListings && (
              <div className="text-center items-center flex justify-center " >
                  <button className='bg-white py-1 px-2  mb-6 mt-3 text-gray-700 border border-y-gray-300 hover:border-slate-600 transition duration-150 ease-in-out rounded '
                  onClick={loadMoreListings}
                  >
                    Load more
                  </button> 
              </div>
          )}
          </>
        ):(
          <p>There is no current offer</p>
        )
        }
    </div>
  )
}
