import { createContext, useContext, useState } from "react";
import { TicketType, UserType } from "../types/MainTypes";
import { BiSad } from "react-icons/bi";

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

    const status = [{
        name: "Todo",
        icon: <BiSad className='text-xl text-gray-400' />
    },
    {
        name: "In Progress",
        icon: <BiSad className='text-xl text-gray-400' />
    },
    {
        name: "Done",
        icon: <BiSad className='text-xl text-gray-400' />
    },
    {
        name: "Backlog",
        icon: <BiSad className='text-xl text-gray-400' />
    },
    {
        name: "Cancelled",
        icon: <BiSad className='text-xl text-gray-400' />
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
