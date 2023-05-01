import React from 'react'
import{FcGoogle} from 'react-icons/fc'
import { getAuth ,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { toast } from 'react-toastify';
import {db} from '../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';



export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      //promise
      const result = await signInWithPopup(auth,provider);
      const user = result.user;
      //console.log(user);
      //adds user to database
      const data= doc(db,'users', user.uid);
      const dataSnap= await getDoc(data);
      //checking if data does not exist ,then adds to the database
      if(!dataSnap.exists()){
        await setDoc(data,
          {
            name:user.displayName,
            email:user.email,
            timestamp:serverTimestamp()
          });
      }
      navigate('/');
    } catch (error) {
      toast.error('Unable to sign in user with google');
    }
  }

  return (
    <button onClick={onGoogleClick} className='flex items-center justify-center w-full text bg-red-600 text-white py-2 px-4 text-xs font-medium uppercase rounded-sm shadow-md hover:bg-red-700 transition duration-100 ease-in-out hover:shadow-lg active:bg-red-900 mb-1' 
    type='button'> <FcGoogle className='text-xl bg-white rounded-full mr-1'/>Continue with google
    </button>
  )
}
