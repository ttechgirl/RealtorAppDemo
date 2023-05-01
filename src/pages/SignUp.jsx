import React, { useState } from 'react'
import{FaEyeSlash,FaEye} from 'react-icons/fa'
import {Link } from 'react-router-dom';
import {useNavigate} from 'react-router'
import OAuth from '../components/OAuth';
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {db} from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


export default function SignUp() {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] =useState({
    name:"",
    email:"",
    password:""
  });
  const {name,email,password} =formData;
  const navigate= useNavigate();
  function onChange(event){
    //console.log(event.target.value);
    setFormData((prevState)=>({
      ...prevState,[event.target.id]:event.target.value,
    }))
  }
  async function onSubmit(e){
    e.preventDefault()

    try {
    const auth = getAuth();
    //promise
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    updateProfile(auth.currentUser,{
      displayName:name
    })
    const user=userCredential.user;
    //console.log(user)
    const formDataCopy = {...formData};
    //removes the password from saving into the database
    delete formDataCopy.password;
    //gets time the user register
    formDataCopy.timestamp =serverTimestamp();
    //maps the data to database and creates a user table with the user primary key
    await setDoc(doc(db,'users', user.uid),formDataCopy)
    toast.success(`Registration successful,check ${user.email} for confirmation`);
    navigate('/');
        
    } catch (error) {
      if(!name.name ||!password.password || !email.email || !email != null ){
        toast.error('Something went wrong with the registration,kindly input all fields correctly');
      }
      //console.log(error)
      //toast.error('Kindly input all fields correctly');
      
    }
  }
  return (
    <section>
    <h1  className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'> 
            <img src='https://media.istockphoto.com/id/1180641712/photo/lock-your-data.jpg?s=612x612&w=0&k=20&c=yupzk2T4vRxXD-Y6oYjEPN6VyUVGBlo1AKzT_WLPJg0=' alt="key" className='w-full rounded-2xl'/>
        </div>
        <div className='w-fill md:w-[67%] lg:w-[40%] lg:ml-20 mb-6  '>
            <form onSubmit={onSubmit}>
                <input type='text' id='name' placeholder='Full name' value={name} onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-sm transition ease-in-out mb-3' >
                </input>
                <input type='email' id='email' placeholder='Email address' value={email} onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-sm transition ease-in-out mb-3' >
                </input>
                <div className='relative mb-4'>
                <input  type={showPassword? 'text':'password'} id='password' placeholder='Password' value={password} onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-sm transition ease-in-out' >
                </input>
                {showPassword?(<FaEyeSlash className='absolute right-3 top-3 text-lg cursor-pointer ' onClick={()=>setShowPassword((prevState)=> !prevState)}/>)
                 : (<FaEye className='absolute right-3 top-3 text-lg cursor-pointer' onClick={()=>setShowPassword((prevState)=> !prevState)}/>
                )}
                </div>
                <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-4'> 
                  <p>
                    Have an account? <Link to='/sign-in' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out '>Sign in</Link>
                  </p>
                  <p className='ml-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out'>
                    <Link to='/forgot-password'>Forgot password?</Link>
                  </p>
                </div>
                <button className='w-full bg-blue-600 text-white py-2 px-4 text-xs font-medium uppercase rounded-sm shadow-md hover:bg-blue-700 transition duration-100 ease-in-out hover:shadow-lg active:bg-blue-900 mb-1' type='submit'>Sign up</button>
                <div className='flex items-center my-3 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
               <p className='text-center text-sm font-medium'>OR</p>
                </div>
               <OAuth></OAuth>
            </form>
        </div>
    </div>
    </section>
  )
}

  