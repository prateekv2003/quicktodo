import React from 'react'
import UserImg from '../assets/user.webp'
import { BiSearch } from 'react-icons/bi'
import { TicketType } from '../types/MainTypes';
type Props = {
  ticket: TicketType;
}

const Card = ({ ticket }: Props) => {
  return (
    <div className='p-4 flex flex-col space-y-2 w-full bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between w-full'>
        <p className='text-sm text-gray-600'>{ticket?.id}</p>
        <div className='w-8 h-8 rounded-full overflow-hidden'>
          <img src={UserImg} alt="" />
        </div>
      </div>
      <p className='w-full font-semibold text-sm line-clamp-2 h-10'>{ticket?.title}</p>
      <div className='flex items-center w-full space-x-2'>
        <button className='rounded-md p-1 border border-gray-600'>
          <BiSearch className='text-sm'/>
        </button>
        {
          ticket?.tag?.map((t, idx) => {
            return <button key={idx} className='rounded-md p-1 border border-gray-600 flex space-x-1 items-center'>
            <BiSearch className='text-sm'/>
            <p className='text-sm leading-none'>{t}</p>
          </button>
          })
        }
      </div>
    </div>
  )
}

export default Card