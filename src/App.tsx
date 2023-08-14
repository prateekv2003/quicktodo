import { useState, useEffect } from 'react'
import Dropdown from "./components/Dropdown"
import axios from 'axios'
import { Api } from './utils/api.config'
import { useMainContext } from './contexts/MainContext'
import Tickets from './components/Tickets'
import { FilteredData, TicketType, UserType } from './types/MainTypes'
import { StatusType, PriorityType } from './types/MainTypes'
import UserImg from './assets/user.webp'
function App() {

  const { users, setUsers, tickets, setTickets, selectedGroup, status, priority }: any = useMainContext();

  // const status = [{
  //   name: "Todo",
  //   icon: <BiSad className='text-xl text-gray-400' />
  // },
  // {
  //   name: "In Progress",
  //   icon: <BiSad className='text-xl text-gray-400' />
  // },
  // {
  //   name: "Done",
  //   icon: <BiSad className='text-xl text-gray-400' />
  // },
  // {
  //   name: "Backlog",
  //   icon: <BiSad className='text-xl text-gray-400' />
  // },
  // {
  //   name: "Cancelled",
  //   icon: <BiSad className='text-xl text-gray-400' />
  // }
  // ];
  // const priority = [
  //   {
  //     name: "No Priority",
  //     icon: <BsCircle className='text-sm text-gray-400' />
  //   },
  //   {
  //     name: "Low",
  //     icon: <BsCircle className='text-sm text-blue-400' />
  //   },
  //   {
  //     name: "Medium",
  //     icon: <BsCircle className='text-sm text-yellow-400' />
  //   },
  //   {
  //     name: "High",
  //     icon: <BsCircle className='text-sm text-violet-600' />
  //   },
  //   {
  //     name: "Urgent",
  //     icon: <BsCircle className='text-sm text-red-600' />
  //   }
  // ]

  const [filteredData, setFilteredData] = useState<FilteredData[]>([]);

  const fetchData = async () => {
    const response = await axios.get(Api.getDataApi());
    if (response.status !== 200) {
      alert("Something went wrong!")
      console.log("Error")
      return;
    }
    console.log(response.data)
    setUsers(response.data.users)
    setTickets(response.data.tickets)
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const priorityOrder = [0, 4, 3, 2, 1];
    switch (selectedGroup.name) {
      case 'Status':
        setFilteredData(status.map((stat: StatusType) => {
          return {
            title: stat?.name,
            icon: stat?.icon,
            tickets: tickets.filter((ticket: TicketType) => ticket.status.toLowerCase() === stat.name.toLowerCase())
          }
        }))
        break;
      case 'User':
        setFilteredData(users.map((user: UserType) => {
          return {
            title: user.name,
            icon: (
              <div className="relative">
                <img className="w-6 h-6 rounded-full shadow-md" src={UserImg} alt="" />
                <span className={`bottom-0 left-4 absolute  w-2.5 h-2.5 ${user?.available?"bg-green-400":"bg-gray-400"} border-2 border-white rounded-full`}></span>
              </div>
            ),
            tickets: tickets.filter((ticket: TicketType) => ticket.userId === user.id)
          }
        }))
        break;
      case 'Priority':
        setFilteredData(priorityOrder.map((rank: number) => {
          return {
            title: priority[rank].name,
            icon: priority[rank].icon,
            tickets: tickets.filter((ticket: TicketType) => ticket.priority === rank)
          }
        }))
        break;
      default:
        break;
    }
  }, [users, tickets, selectedGroup]) // selectedGroup can have a value of 'Status', 'User', or 'Priority', so filter ticket basd on that

  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <header className="py-4 bg-white flex items-center justify-center p-2">
        <nav className='max-w-[1480px] flex w-full'>
          <Dropdown />
        </nav>
      </header>
      <section className='max-w-[1480px] mx-auto mt-4 p-4 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
        {
          filteredData?.map((data, idx) => {
            return <Tickets key={idx} data={data} />
          })
        }
      </section>
    </main>
  )
}

export default App
