import React, { useState } from 'react'

export default function Listings() {
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
        regular:0,
        discount:0

    });
    const {type,name,bedrooms,bathrooms,parking,furnished,address,description,offers,regular,discount}=formData;
    function onChange(){

    }
    function onSubmit(){

    }
  return (
    <main className='max-w-md px-2 mx-auto text-sm sm:text-lg'>
        <h1 className='font-bold text-center text-3xl mt-6'>Create a Listing</h1>
        <form className=''>
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
                maxLength='50' 
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
                 id="image" 
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
