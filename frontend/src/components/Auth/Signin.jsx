import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            if (data && data.authorisation && data.authorisation.token) {
                localStorage.setItem('token', data.authorisation.token);

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
        } catch (error) {
            setError(error.message);
        }
    }

    return (
       
    
        <div className="grid mt-24 place-items-center" >
            <div className="w-11/12 p-12 bg-blue-900 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded">
                <h1 className="text-xl font-mono text-center font-semibold uppercase text-white">
                    Connect to your account
                </h1>
                <form onSubmit={submit} className="mt-6">
                    <label className="block mt-2 text-m font-mono font-semibold text-white">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner peer placeholder-transparent border-b-2 border-gray-300"
                        required
                    />

                    <label htmlFor="password" className="block mt-2 text-m font-mono font-semibold text-white">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner peer placeholder-transparent border-b-2 border-gray-300"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 font-bold text-blue-900 rounded rounded-full bg-white shadow-lg focus:outline-none"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Signin;
