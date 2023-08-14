import { createContext, useContext, useState } from "react";
import { TicketType, UserType } from "../types/MainTypes";
import { BsCircle, BsExclamationSquareFill } from "react-icons/bs";
import { PiCircleHalfFill } from "react-icons/pi";
import { BiSolidCheckCircle, BiSolidXCircle } from "react-icons/bi";
import { TbCircleDotted } from "react-icons/tb";
import { AiOutlineDash } from "react-icons/ai";
import { MdSignalCellularAlt, MdSignalCellularAlt1Bar, MdSignalCellularAlt2Bar } from "react-icons/md";

export const MainContext = createContext({});

export const MainProvider = ({ children }: { children: React.ReactNode }) => {

    const grouping = [
        { name: 'Status' },
        { name: 'User' },
        { name: 'Priority' }
    ]
    const ordering = [
        { name: 'Priority' },
        { name: 'Title (A-Z)' },
        { name: 'Title (Z-A)' },
    ]
    const [selectedGroup, setSelectedGroup] = useState(grouping[0])
    const [selectedOrder, setSelectedOrder] = useState(ordering[0])
    const [users, setUsers] = useState<UserType[]>([]);
    const [tickets, setTickets] = useState<TicketType[]>([]);

    const status = [
        {
            name: "Backlog",
            icon: <TbCircleDotted className='text-xl text-gray-400' />
        },
        {
            name: "Todo",
            icon: <BsCircle className='text-sm text-gray-400' />
        },
        {
            name: "In Progress",
            icon: <PiCircleHalfFill className='text-xl text-yellow-400' />
        },
        {
            name: "Done",
            icon: <BiSolidCheckCircle className='text-xl text-violet-600' />
        },
        {
            name: "Cancelled",
            icon: <BiSolidXCircle className='text-xl text-gray-400' />
        }
    ];
    const priority = [
        {
            rank: 0,
            name: "No Priority",
            icon: <AiOutlineDash className='text-xl text-gray-400' />
        },
        {
            rank: 1,
            name: "Low",
            icon: (
                <div className='relative flex justify-center items-center w-4 h-4 text-gray-700'> 
                    <MdSignalCellularAlt className='text-sm text-gray-300 absolute top-0 left-0' />
                    <MdSignalCellularAlt1Bar className='text-sm text-gray-700 absolute top-0 left-0' />
                </div>
            )
        },
        {
            rank: 2,
            name: "Medium",
            icon: (
                // make them overlap
                <div className='relative flex justify-center items-center w-4 h-4 text-gray-700'> 
                    <MdSignalCellularAlt className='text-sm text-gray-300 absolute top-0 left-0' />
                    <MdSignalCellularAlt2Bar className='text-sm text-gray-700 absolute top-0 left-0' />
                </div>
            )
        },
        {
            rank: 3,
            name: "High",
            icon: <MdSignalCellularAlt className='text-sm text-grey-700' />
        },
        {
            rank: 4,
            name: "Urgent",
            icon: <BsExclamationSquareFill className='text-sm text-orange-500' />
        },
    ]

    return (
        <MainContext.Provider value={{
            users,
            setUsers,
            tickets,
            setTickets,
            grouping,
            selectedGroup,
            setSelectedGroup,
            ordering,
            selectedOrder,
            setSelectedOrder,
            status,
            priority
        }}>
            {children}
        </MainContext.Provider>
    );
};

export const useMainContext = () => {
    return useContext(MainContext);
}
