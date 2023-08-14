import UserImg from '../assets/user.webp'
import { StatusType, TicketType, UserType } from '../types/MainTypes';
import { useMainContext } from '../contexts/MainContext'
import { GoDotFill } from 'react-icons/go'
import { useEffect, useState } from 'react';
type Props = {
  ticket: TicketType;
}

const Card = ({ ticket }: Props) => {

  const { priority, selectedGroup, status, users }: any = useMainContext();
  const [user, setUser] = useState<UserType | null>(null);

  const getSatusIcon = (q: string) => {
    const res : StatusType = status.find((s: StatusType) => s.name.toLowerCase() === q.toLowerCase());
    if (res) {
      return res.icon
    }
    return <GoDotFill className='text-xl text-gray-400' />
  }

  useEffect(() => {
    if(users.length > 0){
      const res = users.find((u: UserType) => u.id === ticket?.userId);
      console.log(res)
      if(res){
        setUser(res)
      }else{
        setUser(null)
      }
    }
    console.log(users)
  }, [users])

  return (
    <div className='p-4 flex flex-col space-y-2 w-full bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between w-full'>
        <p className='text-sm text-gray-600'>{ticket?.id}</p>
        {
          selectedGroup?.name !== "User" && (
            <div className="relative">
              <img className="w-6 h-6 rounded-full shadow-md" src={UserImg} alt="" />
              <span className={`bottom-0 left-4 absolute  w-2.5 h-2.5 ${user?.available?"bg-green-400":"bg-gray-400"} border-2 border-white rounded-full`}></span>
            </div>
          )
        }
      </div>
      <div className='flex items-start space-x-2'>
        <div className='mt-[2px]'>
        {
          selectedGroup?.name !== "Status" && getSatusIcon(ticket?.status)
        }
        </div>
        <p className='w-full font-semibold text-gray-700 text-sm line-clamp-2 h-10'>{ticket?.title}</p>
      </div>
      <div className='flex items-center w-full space-x-2'>
        {
          selectedGroup?.name !== "Priority" && <button className='rounded-md p-1 border border-gray-200'>
            {
              priority[ticket?.priority].icon
            }
          </button>
        }
        {
          ticket?.tag?.map((t, idx) => {
            return <button key={idx} className='rounded-md p-1 border border-gray-200 flex space-x-1 items-center'>
              <GoDotFill className='text-xl text-gray-400' />
              <p className='text-sm leading-none text-gray-500'>{t}</p>
            </button>
          })
        }
      </div>
    </div>
  )
}

export default Card