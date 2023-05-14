import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {MdLocationPin} from 'react-icons/md'
import {FaTrashAlt} from 'react-icons/fa'
import {RiEdit2Fill} from 'react-icons/ri'

export default function ListedItem({listing,id,onDelete,onEdit}) {
  return (
    <li className='bg-white flex flex-col justify-between items-center rounded-md overflow-hidden shadow-xl hover:shadow-xl transition-shadow duration-150 relative m-[10px]'>
      <Link to={`/category/${listing.type}/${id}`} className='contents'>
        <img src={listing.imgUrls[2]} alt="image"
         className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in '
         loading='lazy'
       />
        <Moment className='bg-[#2b45d8ce] px-2 py-1 font-semibold uppercase text-xs shadow-lg left-2 text-white absolute top-2 rounded-md' fromNow>
          {listing.timestamp?.toDate()} 
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationPin className='h-4 w-4 text-green-600 '/>
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>{listing.address}</p>
          </div>
          <p className='font-semibold m-0 text-lg truncate'>{listing.name} </p>
          <p className=' text-[#27a0eb] font-semibold mt-2'> 
             #{listing.offer ? listing.discount 
             .toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
              : listing.regular .toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}
              {listing.type==='rent' && ' / month' }
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className='font-bold text-xs'>
                {listing.bedrooms >1 ? `${listing.bedrooms} Beds` : '1 Bed'}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className='font-bold text-xs'>
                {listing.bathrooms >1 ? `${listing.bathrooms} Baths` : '1 Bath'}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrashAlt className='absolute bottom-2 right-2 h-[14px] text-red-600 cursor-pointer' onClick={()=>onDelete(listing.id)}/>
      )}
      {onEdit && (
        <RiEdit2Fill className='absolute bottom-2 right-8 h-[16px] text-black cursor-pointer'
         onClick={()=>onEdit(listing.id)}
         />
      )}
    </li>
  )
}
