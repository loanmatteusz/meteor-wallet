import React, {Fragment} from "react";
import { Listbox, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const SelectContact = ({title, contact, setContact, contacts}) => {
    return (<Listbox value={contact} onChange={setContact}>
        {({open}) => (<>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
                {title}
            </Listbox.Label>
            <div className="mt-1 relative">
                <Listbox.Button
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                {contact?.imageUrl && (<img
                    src={contact.imageUrl}
                    alt=""
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                />)}
                  <span className="ml-3 block truncate">
                  {contact?.name || "Select a contact"}
                </span>
              </span>
                    <span
                        className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                </svg>

              </span>
                </Listbox.Button>

                <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {!contacts.length && (<Listbox.Option
                            className={classNames("text-gray-900", "cursor-default select-none relative py-2 pl-3 pr-9")}
                            disabled={true}
                        >
                            <div className="flex items-center">
                      <span
                          className={classNames("font-normal", "ml-3 block truncate")}
                      >
                        No contacts found
                      </span>
                            </div>
                        </Listbox.Option>)}

                        {contacts.map((contact) => (<Listbox.Option
                            key={contact._id}
                            className={({active}) => classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "cursor-default select-none relative py-2 pl-3 pr-9")}
                            value={contact}
                        >
                            {({selected, active}) => (<>
                                <div className="flex items-center">
                                    {contact.imageUrl && (<img
                                        src={contact.imageUrl}
                                        alt=""
                                        className="flex-shrink-0 h-6 w-6 rounded-full"
                                    />)}
                                    <span
                                        className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}
                                    >
                            {contact.name}
                          </span>
                                </div>

                                {selected ? (<span
                                    className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                          </span>) : null}
                            </>)}
                        </Listbox.Option>))}
                    </Listbox.Options>
                </Transition>
            </div>
        </>)}
    </Listbox>);
};