import { createContext, useContext, useState } from "react";
import { TicketType, UserType } from "../types/MainTypes";
import { BsCircle } from "react-icons/bs";
import { PiCircleHalfFill } from "react-icons/pi";
import { BiSolidCheckCircle, BiSolidXCircle } from "react-icons/bi";
import { FaStopCircle } from "react-icons/fa";

export const MainContext = createContext({});

export const MainProvider = ({ children }: { children: React.ReactNode }) => {

    const grouping = [
        { name: 'Status' },
        { name: 'User' },
        { name: 'Priority' }
    ]
    const ordering = [
        { name: 'Priority' },
        { name: 'Title' }
    ]
    const [selectedGroup, setSelectedGroup] = useState(grouping[0])
    const [selectedOrder, setSelectedOrder] = useState(ordering[0])
    const [users, setUsers] = useState<UserType[]>([]);
    const [tickets, setTickets] = useState<TicketType[]>([]);

    const status = [
        {
            name: "Backlog",
            icon: <FaStopCircle className='text-xl text-blue-400' />
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
    const priority = ["No Priority", "Low", "Medium", "High", "Urgent"];

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

export function useMainContext() {
    return useContext(MainContext);
}
