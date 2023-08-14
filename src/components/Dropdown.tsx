import { Fragment } from 'react'
import { Listbox, Menu, Transition } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { GiSettingsKnobs } from 'react-icons/gi'
import { useMainContext } from '../contexts/MainContext'

type Option = {
  name: string;
}

export default function Example() {

  const { grouping, ordering, selectedGroup, setSelectedGroup, selectedOrder, setSelectedOrder }: any = useMainContext();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <GiSettingsKnobs className="h-4 w-4 text-gray-500 rotate-90" aria-hidden="true" />
          Display
          <BiChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4">
            <div className='flex w-full items-center justify-between'>
              <p className='text-sm font-semibold text-gray-400'>Grouping</p>
              <Menu.Item>
                {
                  () => (
                    <Listbox value={selectedGroup} onChange={setSelectedGroup}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-32 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">{selectedGroup.name}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <BiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {grouping.map((group : Option, groupIdx: number) => (
                              <Listbox.Option
                                key={groupIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none p-2 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={group}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {group.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  )
                }
              </Menu.Item>
            </div>
            <div className='flex w-full items-center justify-between'>
              <p className='text-sm font-semibold text-gray-400'>Ordering</p>
              <Menu.Item>
                {() => (
                  <Listbox value={selectedOrder} onChange={setSelectedOrder}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-32 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selectedOrder.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <BiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {ordering.map((order : Option, orderIdx : number) => (
                            <Listbox.Option
                              key={orderIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none p-2 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={order}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                      }`}
                                  >
                                    {order.name}
                                  </span>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
