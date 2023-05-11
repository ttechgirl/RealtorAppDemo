import React, { useState } from 'react'
import Spinning from '../components/Spinning';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth} from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';


export default function Listings() {
    const auth = getAuth();
    const [geoLocationEnabled,setGeoLocationEnabled] =useState(true)
    const [loading,setLoading] = useState(false)
    const [formData,setFormData]=useState({
        type:'rent',
        name:'',
        bedrooms:1,
        bathrooms:1,
        parking:false,
        furnished: false,
        address:'',
        description:'',
        offers:true,
        regular:10000,
        discount:0,
        latitude:0,
        longitude:0,
        images:{},
    });
    const {type,name,bedrooms,bathrooms,parking,furnished,address,description,offers,regular,discount,latitude,longitude,images}=formData;
    function onChange(e){
        let boolean =null;
        if(e.target.value === 'true'){
            boolean = true
        }
        if(e.target.value === 'false'){
            boolean = false
        }
        //files
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,images:e.target.files

            }));
        }
        //text or boolean or number
        else{
            setFormData((prevState)=>({
                ...prevState,[e.target.id]:boolean ?? e.target.value
            }));
        }
    }
    async function onSubmit(e){
        
        e.preventDefault();
        setLoading(true);
        if(discount >= regular){
            setLoading(true);
            toast.error('Discounted price should not be more than regular price')
            return;
        }
        if(images.length > 6){
            setLoading(false);
            toast.error('File exceeded the maximum number of 6')
            return;
        }

        /*let geoLocation={}
        let location
        //google api key is required 
        if(geoLocationEnabled){
            //https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.environ.local.REACT_APP_GEOCODE_API_KEY}`);
            const data = await response.json();
            console.log(data);
            geoLocation.lat = data.results[0]?.geometry.location.lat?? 0
            geoLocation.lat = data.results[0]?.geometry.location.lng?? 0

            //the condition applies when the response status is 'zero result or undefined
            location = data.status === 'ZERO_RESULTS' && undefined;
            if(location === undefined || location.includes('undefined')){
                setLoading(false);
                toast.error('Please enter a correct address');
                return;
            }
            else{
                geoLocation.lat = latitude;
                geoLocation.lng = longitude;
            }
        }*/
        async function storeImage(image){
            return new Promise((resolve,reject)=>{
                const storage =getStorage();
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage,fileName);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error);
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                    });
                }
                );
           });
        }
        const imgUrls=await Promise.all(
            [...images].map((image)=>storeImage(image))
        ).catch((error)=>{
            setLoading(false);
            toast.error('Images not uploaded');
            return;
        })
        console.log(imgUrls)
        
        if(loading){
         return<Spinning/>
        }
    }
  return (
    <main className=' max-w-md px-2 mx-auto text-sm sm:text-lg'>
       
        <h1 className='font-bold text-center text-3xl mt-6'>Create a Listing</h1>
        <form onSubmit={onSubmit}>
            <p className='font-semibold text-lg mt-6'>Sell/Rent </p>
            <div className='flex mb-6'>
                <button type='button ' 
                id='type' 
                value='sale' 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${type==='rent'? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> sell
                </button>
                <button type='button' 
                id='type' 
                value='rent' 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${type==='sale'? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> rent
                </button>
            </div>
            <p className='font-semibold text-lg '>Name</p>
            <input type='text' 
                id='name' 
                value={name} 
                placeholder='Name' 
                onChange={onChange} 
                required 
                minLength='10' 
                maxLength='30' 
                className='w-full rounded transition duration-150 ease-in  text-xl text-gray-700 px-4 py-2 bg-white border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm'
           />
            <div className="flex space-x-6 mb-3">
                <div >
                    <p className='font-semibold text-lg mt-6'>Beds</p>
                    <input type="number"  
                        id="bedrooms" 
                        value={bedrooms} 
                        onChange={onChange} 
                        min='1' 
                        max='10' 
                        required 
                        className='w-full text-center rounded transition duration-150 ease-in-out font-medium text-xl text-gray-700 px-4 py-2 bg-white border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm focus:border-slate-600'
                    />
                </div>
                <div >
                    <p className='font-semibold text-lg mt-6'>Baths</p>
                    <input type="number"  
                        id="bathrooms" 
                        value={bathrooms} 
                        onChange={onChange} 
                        min='1' 
                        max='10' 
                        required 
                        className='w-full text-center rounded transition duration-150 ease-in-out font-medium text-xl text-gray-700 px-4 py-2 bg-white border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm focus:border-slate-600' 
                   />
                </div>
            </div>
            <p className='font-semibold text-lg mt-6'>Parking spot</p>
            <div className='flex mb-6'>
                <button type='button ' 
                id='parking' 
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${!parking? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> Yes
                </button>
                <button type='button ' 
                id='parking' 
                value={false}
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${parking? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> No
                </button>
            </div>
            <p className='font-semibold text-lg mt-6'>Furnished </p>
            <div className='flex mb-6'>
                <button type='button ' 
                id='furnished' 
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${!furnished? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> Yes
                </button>
                <button type='button ' 
                id='furnished' 
                value={false} 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${furnished? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> No
                </button>
            </div>
            <p className='font-semibold text-lg'>Address</p>
            <textarea 
                type='text'
                id='address' 
                value={address}
                placeholder='Address' 
                onChange={onChange} 
                required 
                className='w-full mb-6  rounded transition duration-150 ease-in  text-xl text-gray-700 px-4 py-2 bg-white border border-gray-200 focus:bg-white focus:text-gray-700  focus:border-slate-600 shadow-sm'
            />
            {/*manual map geolocation */}
             <div className="flex items-center mb-4">
                 {geoLocationEnabled && (
                <div>
                        <p className='font-semibold text-lg '>Latitude</p>
                     <input type="number"  
                        id="latitude"
                        value={latitude} 
                        onChange={onChange} 
                        min='-90'
                        max='90' 
                        required ={address}
                        className='w-full text-center rounded transition duration-150 ease-in-out font-medium text-xl text-gray-700 px-4 py-2 bg-white border border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm focus:border-slate-600'
                     />
                    </div>
            )}
            </div>
            {/*manual map geolocation */}
            <div className="flex items-center mb-4">
                 {geoLocationEnabled && (
                <div>
                        <p className='font-semibold text-lg '>Longitude</p>
                     <input type="number"  
                        id="longitude"
                        value={longitude} 
                        onChange={onChange} 
                        min='-180'
                        max='180' 
                        required ={address}
                        className='w-full text-center rounded transition duration-150 ease-in-out font-medium text-xl text-gray-700 px-4 py-2 bg-white border border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm focus:border-slate-600'
                     />
                    </div>
            )}
            </div>
            <p className='font-semibold text-lg '>Description</p>
            <textarea 
            type='text' 
            id='description' 
            value={description} 
            placeholder='Description' 
            onChange={onChange} 
            required  
            className='w-full rounded transition duration-150 ease-in  text-xl text-gray-700 px-4 py-2 bg-white border border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm'/>
            <p className='font-semibold text-lg mt-6'>Offer</p>
            <div className='flex mb-6'>
                <button type='button ' 
                id='offers'
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${!offers? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> Yes
                </button>
                <button type='button' 
                id='offers'
                value={false} 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium uppercase rounded shadow-md active:shadow-lg w-full hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out ${offers? 'bg-white text-black': 'bg-slate-600 text-white' }`
                }> No
                </button>
            </div>
            <div className="flex items-center mb-6 ">
             <div>
                 <p className='font-semibold text-lg '>Regular Price
                 </p>
                 <div className='flex items-center w-full justify-center space-x-6 '>
                    <input type="number"  
                        id="regular"
                        value={regular} 
                        onChange={onChange}
                        min='10,000' 
                        max='100,000,000' 
                        required 
                        className='w-full text-center rounded transition duration-150 ease-in-out font-medium text-xl text-gray-700 px-4 py-2 border bg-white border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm focus:border-slate-600' 
                    />
                    {type==='rent' && (
                    <div >
                        <p className='w-full font-semibold text-md whitespace-nowrap '>  # / Month</p>
                    </div>
                    )}
                </div>
            </div>
           </div>
            <div className="flex items-center mb-4 ">
            {offers && (
                <div>
                <p className='font-semibold text-lg '>Discounted Price</p>
                <div className="flex items-center w-full justify-center space-x-6">
                   <input type="number"  
                        id="discount"
                        value={discount} 
                        onChange={onChange} 
                        min='10,000'
                        max='100,000,000' 
                        required ={offers}
                        className='w-full text-center rounded transition duration-150 ease-in-out font-medium text-xl text-gray-700 px-4 py-2 bg-white border border-gray-200 focus:bg-white focus:text-gray-700 focus:slate-600 shadow-sm focus:border-slate-600'
                  />
                    {type==='rent' && (
                        <div>
                        <p className='w-full font-semibold text-md whitespace-nowrap '>  # / Month</p>
                    </div>
                    )}
                </div>
            </div>
           )}
            </div>
            <div className="mb-6">
                <p className='font-semibold text-lg'>Images</p>
                <p className='text-gray-600 '>The first image will be the cover (max 6)</p>
                <input type="file" 
                 id="images" 
                 accept='.jpg,.png,.jpeg'
                 multiple
                 required
                 className=' w-full border border-gray-300 px-2 py-1 transition duration-150 ease-in-out bg-white rounded focus:bg-white focus:border-slate-600'
                 />
            </div>
            <button type='submit' 
             onSubmit={onSubmit}
             className='w-full text-white  font-medium px-6 py-3 text-center uppercase rounded bg-blue-600 shadow-sm hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg'> Create listing
            </button>
        </form>
    </main>
  )
}
