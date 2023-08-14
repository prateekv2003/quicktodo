import { useState, useEffect } from 'react'
import Dropdown from "./components/Dropdown"
import axios from 'axios'
import { Api } from './utils/api.config'
import { useMainContext } from './contexts/MainContext'
import Tickets from './components/Tickets'
import { FilteredData, TicketType, UserType } from './types/MainTypes'
import { StatusType } from './types/MainTypes'
import UserImg from './assets/user.webp'
function App() {

  const { users, setUsers, tickets, setTickets, selectedGroup, status, priority }: any = useMainContext();

  const [filteredData, setFilteredData] = useState<FilteredData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true)
    const response = await axios.get(Api.getDataApi());
    if (response.status !== 200) {
      alert("Something went wrong!")
      console.log("Error")
      return;
    }
    console.log(response.data)
    setUsers(response.data.users)
    setTickets(response.data.tickets)
    setIsLoading(false);
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
                <span className={`bottom-0 left-4 absolute  w-2.5 h-2.5 ${user?.available ? "bg-green-400" : "bg-gray-400"} border-2 border-white rounded-full`}></span>
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
    <main className="w-screen min-h-screen bg-gray-100 pb-8">
      <header className="py-4 bg-white flex items-center justify-center">
        <nav className='max-w-[1480px] px-4 md:px-2 flex w-full'>
          <Dropdown />
        </nav>
      </header>
      <section className='grid-flow-row-dense w-screen max-w-[1480px] px-4 md:px-2 mx-auto mt-4 p-4 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
        {
          isLoading 
            ? Array.from(Array(5).keys()).map((_, idx) => {
              return (
                <div key={idx} className='animate-pulse flex flex-col space-y-4 min-h-fit'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2 py-2'>
                      <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                      <div className='w-24 h-4 bg-gray-200 rounded-full'></div>
                    </div>
                    <div className='flex items-center space-x-2 py-2'>
                      <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                      <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                    </div>
                  </div>
                  {/* Tickets */}
                  <div className='flex flex-col space-y-2'>
                    {
                      Array.from(Array(5).keys()).map((_, idx) => {
                        return (
                          <div key={idx} className='p-4 flex flex-col space-y-2 w-full bg-white rounded-lg shadow-md animate-pulse'>
                            <div className='flex items-center justify-between w-full'>
                              <div className='w-12 h-4 bg-gray-200 rounded-full'></div>
                              <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                            </div>
                            <div className='flex items-start space-x-2'>
                              <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                              <div className='w-24 h-4 bg-gray-200 rounded-full'></div>
                            </div>
                            <div className='flex items-center w-full space-x-2'>
                              <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                              <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
            : filteredData?.map((data, idx) => {
              return <Tickets key={idx} data={data} />
            })
        }
      </section>
    </main>
  )
}

export default App
