import React, { useEffect, useState } from 'react'
import Card from './Card'
import { BiSearch } from 'react-icons/bi'
import { FilteredData, TicketType } from '../types/MainTypes'
import { useMainContext } from '../contexts/MainContext'
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
        console.log("TATA", selectedOrder.name)
        console.log("TATA2", sortedTickets)
    }, [selectedOrder, data?.tickets]) // selectedOrder.name can have 2 values: Title or Priority

    return (
        <div className='flex flex-col space-y-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 py-2'>
                    {data?.icon && <BiSearch className='text-xl' />}
                    <p className='text-sm'>{data?.title}</p>
                    <p className='text-sm font-light'>{data?.tickets?.length}</p>
                </div>
                <div className='flex items-center space-x-2 py-2'>
                    <BiSearch className='text-xl' />
                    <BiSearch className='text-xl' />
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