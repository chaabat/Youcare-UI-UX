import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.ok) {
            // Parse the response data
            const data = await response.json();

            if (data && data.authorization && data.authorization.token) {
                localStorage.setItem('token', data.authorization.token);

                if (data && data.user && data.user.role) {
                    switch (data.user.role) {
                        case 'organizer':
                            navigate('/annonces');
                            break;
                        case 'volunteer':
                            navigate('/AllAnnounces');
                            break;
                        default:
                            console.log("Role not recognized:", data.user.role);
                            navigate('/defaultRedirectPage');
                            break;
                    }
                }
            }
        }
    }
        return (
            <div>
            <div className="grid mt-24 place-items-center">
                <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                    <h1 className="text-xl font-mono text-center font-semibold">
                        Connect to your account
                    </h1>
                    <form onSubmit={submit} className="mt-6">
                        <div className="flex justify-between gap-3"></div>
        
                        <label className="block mt-2 text-m font-mono font-semibold text-black ">
                            E-mail
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner peer placeholder-transparent border-b-2 border-gray-300"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                           
                        </div>
        
                        <label
                            htmlFor="password"
                            className="block mt-2 text-m font-mono font-semibold text-black "
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner peer placeholder-transparent border-b-2 border-gray-300"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            
                        </div>
        
                        <button
                            type="submit"
                            className="w-full py-3 mt-6 font-medium tracking-widest text-white bg-blue-900 shadow-lg focus:outline-none"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        );
    };


export default Signin;