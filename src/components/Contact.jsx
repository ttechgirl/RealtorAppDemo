import React, { useEffect, useState } from 'react'
import {doc, getDoc } from 'firebase/firestore'
import {db } from '../firebase'
import { toast } from 'react-toastify';

export default function Contact({userRef,listing}) {
    const [contactRealtor,setContactRealtor] = useState(null);
    const [message,setMessage] =useState('')
    useEffect(()=>{
        async function getRealtor(){
            const docRef = doc(db,'users',userRef);
            const docSnap= await getDoc(docRef);
            if(docSnap.exists()){
                setContactRealtor(docSnap.data());
            }
            else{
                toast.error('Realtor cannot be contacted');
            }
        }
        getRealtor();
    },[userRef]);
    function onchange(e){
        setMessage(e.target.value);
    }
  return (
    <> {contactRealtor !==null &&(
        <div className='flex flex-col '>
            <p className='ml-2 lg:text-xl sm:text-lg text-gray-800'>
                Contact {contactRealtor.name} for the {listing.name.toLowerCase()}
            </p>
            <div className="mt-3 mb-6">
                <textarea
                 name="message" 
                 id="message"  
                 rows="2"
                 value={message}
                 onChange={onchange}
                 className='w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out text-xl focus:border-slate-600 focus:bg-white focus:text-gray-700'
                 >
             </textarea>
            </div>
            <a href={`mailto:${contactRealtor.email}?Subject=${listing.name}&body=${message}`}>
              <button className='border bg-blue-600 uppercase rounded text-white text-sm w-full hover:bg-blue-700 shadow-md px-7 py-3 text-center  hover:shadow-lg transition duration-150 ease-in-out active:bg-blue-700 active:shadow-lg focus:bg-blue-700 focus:shadow-lg '
              type='button'>
                Send Message
              </button>
         </a>
        </div>
      )}
  </>
  )
}
