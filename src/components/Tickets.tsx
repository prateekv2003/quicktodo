import { useEffect, useState } from 'react'
import Card from './Card'
import { BiPlus } from 'react-icons/bi'
import { FilteredData, TicketType } from '../types/MainTypes'
import { useMainContext } from '../contexts/MainContext'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { GoDotFill } from 'react-icons/go'
type Props = {
    data: FilteredData;
}

const Tickets = ({ data }: Props) => {

    const { selectedOrder }: any = useMainContext();

    const [sortedTickets, setSortedTickets] = useState<TicketType[]>([])

    useEffect(() => {
        setSortedTickets(
            [...(data?.tickets || [])].sort((a, b) => {
                if (selectedOrder.name === 'Title') {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.priority - a.priority
                }
            }
            )
        )
    }, [selectedOrder, data?.tickets]) // selectedOrder.name can have 2 values: Title or Priority

    console.log(data)
    return (
        <div className='flex flex-col space-y-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 py-2'>
                    {data?.icon ? data?.icon : <GoDotFill className='text-xl' />}
                    <p className='text-sm'>{data?.title}</p>
                    <p className='text-sm font-light'>{data?.tickets?.length}</p>
                </div>
                <div className='flex items-center space-x-2 py-2'>
                    <BiPlus className='text-xl text-gray-600' />
                    <BiDotsHorizontalRounded className='text-xl text-gray-600' />
                </div>
            </div>

            {/* Tickets */}
            <div className='flex flex-col space-y-2'>
                {
                    sortedTickets?.map((ticket, idx) => {
                        return <Card key={idx} ticket={ticket} />
                    })
                }
            </div>

        </div>
    )
}

export default Tickets