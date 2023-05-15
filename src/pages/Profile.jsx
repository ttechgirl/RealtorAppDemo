import { getAuth, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { collection, doc, orderBy, updateDoc,where,query, getDocs, deleteDoc } from 'firebase/firestore';
import {FcHome} from 'react-icons/fc'
import ListedItem from '../components/ListedItem';

export default function Profile() {
  const auth =getAuth();
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  });
  const {name,email}=formData;
  const navigate = useNavigate();

  function logOut(){
    auth.signOut();
    navigate('/')
  }
 const [updateDetails, setUpdateDetails] = useState(false);
 const [listings,setListings] =useState(null);
 const [loading,setLoading] =useState(false);

 useEffect(()=>{
  async function fetchListings(){
    //fetch the listings created by the user with the same primary key/uid&userRef from the database and it arranges it in order by ascending since its not specified
    const listingRef = collection(db,'listings');
    const queries = query(
      listingRef,where('userRef','==',auth.currentUser.uid),orderBy('timestamp','desc'),
    );
    const querySnap =await getDocs(queries);
    let listings = [];
    querySnap.forEach((doc) => {
      //uploads the items in the doc to the array list
      return listings.push({
        id: doc.id,
        data:doc.data()
      });
    });
    setListings(listings);
    setLoading(false);
  }
  fetchListings();
  //dependency
},[auth.currentUser.uid]);

 function onChange(e){
  setFormData((prevState)=>({
    ...prevState,[e.target.id]: e.target.value,
  })) 
 }
 
  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !==name){
        await updateProfile(auth.currentUser,{
          displayName:name,
        });
      const data= doc(db,'users', auth.currentUser.uid);
      await updateDoc(data,{
        name
      });
      toast.success('Profile updated successfully')
      }
    } catch (error) {
      toast.error('profile update not successful');
    }
  }
  

  async function onDelete(listingId){
    if(window.confirm('Are you sure you want to delete?')){
      await deleteDoc(doc(db,'listings',listingId));
      const updatedListing = listings.filter(
        (listing)=>listing.id !== listingId
      );
      setListings(updatedListing);
      toast.success('Listing successfully deleted')
    }
  }

  function onEdit(listingId){
    navigate(`/edit-listings/${listingId}`)
  }
  
  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Welcome {name} !</h1>
      <div className='w-full md:w-[50%] mt-6 px-3 '>
        <form>
          {/*name input*/}
          <input type='text' id='name' value={name} disabled ={!updateDetails} onChange={onChange} className={`w-full px-4 py-2 mb-6  text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${updateDetails && 'bg-red-200 focus:bg-red-200'}`} ></input>
          {/*name input*/}
          <input type='email' id='email' value={email} disabled  className='w-full px-4 py-2 mb-6  text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' ></input>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p>Do you want to change your details?
               <span onClick={()=> {
                updateDetails && onSubmit() 
                setUpdateDetails((prevState) => !prevState);
               } }  className='text-blue-600 hover:text-blue-900 cursor-pointer transition ease-in-out duration-200'>

                {/*the user details is enable when update details is true but remains disabled when is false */}
               {updateDetails? 'Apply change' : 'Edit' } 
               </span>
            </p>
            <p onClick={logOut} className='flex ml-2 text-red-600 hover:text-red-900 transition ease-in-out duration-200 cursor-pointer'> Sign out</p>
          </div>
        </form>
        <button  type='submit' className='w-full  px-7 bg-blue-600 text-white text-sm sm:text-lg font-medium shadow-md transition ease-in-out duration-150 py-3 rounded-sm uppercase hover:bg-blue-700 hover:shadow-lg cursor-pointer mb-6'>
          <Link to='/create-listing' className='flex justify-center items-center'>
          <FcHome className='rounded-full bg-red-200 mr-2 text-2xl  border-2'/>
            Sell or rent your home
          </Link> 
          </button>
      </div>
    </section>
    <div className='max-w-6xl px-3 mx-auto '>
      {!loading && listings !=null && listings.length > 0 && (
        <>
          <h2 className='font-semibold text-2xl text-center mb-6'>My Listings</h2>
          <ul className=' sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {/*gets listings by id */}
            {listings.map((listing)=>(
             <ListedItem
               key={listing.id}
                id={listing.id} 
                listing={listing.data}
                onDelete={()=>onDelete(listing.id)}
                onEdit={()=>onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  )
}
