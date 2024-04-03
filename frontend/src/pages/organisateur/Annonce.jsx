import React from 'react'
import {Link} from "react-router-dom";

const Annonce = () => {
  return (
    <div className="mt-16 px-10">
            <div className="flex justify-between">
                <h1 className="text-black font-bold text-3xl font-serif">All Announcements</h1>
                <Link to="/annonce/create" className="bg-black text-white font-medium px-5 py-2 rounded-md hover:text-black hover:bg-white hover:border border-black duration-500">New Announcement</Link>
            </div>

            <div className="flex flex-wrap gap-5 w-[80%] mx-auto mt-14">

                <div className=" w-[470px] max-w-2xl px-8 py-4 bg-white rounded-md shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-gray-600 dark:text-gray-600">Mar 10, 2019</span>
                        <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                           abIndex="0" role="button">Design</p>
                    </div>

                    <div className="mt-2">
                        <p className="text-xl font-bold text-gray-700   hover:underline" tabIndex="0"
                           role="link">Accessibility tools for designers and developers</p>
                        <p className="mt-2 text-gray-600 dark:text-gray-700">Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto
                            eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione
                            libero!</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-center gap-2">
                            <Link to="/annonce/update" className="bg-blue-200 hover:bg-blue-300 duration-500  rounded px-1 py-1 hover:cursor-pointer ">
                                <svg className="w-8 h-8 text-blue-500 " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                            </Link>
                            <div className="bg-red-200 hover:bg-red-300 duration-500 rounded px-1 py-1 hover:cursor-pointer hover:text-red-500">
                                <svg className="w-8 h-8 text-red-600" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                            </div>


                        </div>
                        <div className="flex items-center">
                            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                                 src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                                 alt="avatar"/>
                            <p className="font-bold text-gray-700 cursor-pointer" tabIndex="0" role="link">Khatab
                                wedaa</p>
                        </div>
                    </div>
                </div>

            </div>
    </div>
  )
}

export default Annonce
