import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
const VolunteerRegister = () => {
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [competance, setCompetance] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('volunteer');
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fname,
                lname,
                competance,
                role,
                email,
                password
            })
        });
       navigate('/signin');
    }

    return (
        <div>
            <section className="">
                <div className="flex justify-center  ">
                    <div  className="flex mt-24 bg-blue-900 rounded  h-full items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl  font-semibold tracking-wider text-white capitalize">
                               SIGN UP AS VOLUNTEER
                            </h1>
                            <div> 
                                <div className=" flex justify-end mt-3 md:flex md:items-center md:-mx-2">
                                <Link to="/OrganizerRegister" className="flex justify-center w-full px-6 py-3 mt-4 text-blue-900 border bg-white  rounded-lg md:mt-0 md:w-auto md:mx-2  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                        <span className="mx-2">As Organizer</span>
                                    </Link>
                                </div>
                            </div>

                                <div  className=" w-full">
                                    <form onSubmit={submit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 ">

                                        <div>
                                            <label className="block mb-2 text-sm text-gray-100 ">First Name</label>
                                            <input onChange={e => setFirstName(e.target.value)} type="text"  
                                                   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm text-gray-100 ">Last Name</label>
                                            <input onChange={e => setLastName(e.target.value)} type="text"  
                                                   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm text-gray-100 ">Skills</label>
                                            <input onChange={e => setCompetance(e.target.value)} type="text"   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm text-gray-100">Email Address</label>
                                            <input onChange={e => setEmail(e.target.value)}type="email"  
                                                   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm text-gray-100">Password</label>
                                            <input onChange={e => setPassword(e.target.value)} type="password" placeholder=""
                                                   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                        </div>

                                        <input type="hidden" name="role" value={role}
                                               onChange={(e) => setRole(e.target.value)}/>

                                        <button type="submit"
                                                className="flex items-center justify-between w-full px-6 h-12 mt-7 text-sm tracking-wide text-blue-900   bg-white rounded-lg ">
                                            <span>Sign Up </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
        ;
};

export default VolunteerRegister;