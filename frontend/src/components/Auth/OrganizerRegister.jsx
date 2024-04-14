import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const OrganizerRegister = () => {
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('organizer');
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fname,
                lname,
                role,
                email,
                password
            })
        });
        navigate('/signin');
    }

    return (
        <div>
            <section className=" ">
                <div className="flex justify-center  ">
                    <div
                        className="flex mt-24 bg-blue-900 rounded  h-full items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl  font-semibold tracking-wider text-white capitalize">
                                REGISTER AS ORGANIZER
                            </h1>
                            <div>
                                <div className=" flex justify-end mt-3 md:flex md:items-center md:-mx-2">
                                    <Link to="/VolunteerRegister" className="flex justify-center w-full px-6 py-3 mt-4 text-blue-900 border bg-white  rounded-lg md:mt-0 md:w-auto md:mx-2  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                        <span className="mx-2">As Volunteer</span>
                                    </Link>
                                </div>
                            </div>

                            <div  className=" w-full">
                                <form onSubmit={submit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 ">
                                    <div>
                                        <label className="block mb-2 text-sm text-gray-100 ">First Name</label>
                                        <input onChange={(e) => setFirstName(e.target.value)} type="text"   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm text-gray-100 ">Last Name</label>
                                        <input onChange={(e) => setLastName(e.target.value)} type="text"   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm text-gray-100">Email Address</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="text"   className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm text-gray-100">Password</label>
                                        <input onChange={(e) => setPassword(e.target.value)} type="password"  className="block w-full px-5 py-3 mt-2 text-black bg-white "/>
                                    </div>

                                    <input type="hidden" name="role" value={role}
                                           onChange={(e) => setRole(e.target.value)}/>

                                    <button type="submit"
                                            className="flex items-center justify-between w-full px-6 h-12 mt-7 text-sm tracking-wide text-blue-900   bg-white rounded-lg     ">
                                        <span>Register </span>
                                         
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrganizerRegister;