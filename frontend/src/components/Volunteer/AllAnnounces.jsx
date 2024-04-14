    import React, {useState, useEffect} from 'react';
    import {jwtDecode} from "jwt-decode";

    const AllAnnounces = () => {
        const [annonces, setAnnonces] = useState([]);

        useEffect(() => {
            fetchAnnounces();
        }, []);

        const fetchAnnounces = async () => {
            try {
                const response = await fetch('http://localhost/api/allAnnonces');
                if (response.ok) {
                    const data = await response.json();
                    setAnnonces(data);
                } else {
                    console.error('Failed to fetch announcements:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };


        const handleApply = async (annonceId) => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user_id;

                const response = await fetch('http://localhost/api/postule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` // Using token directly if it's a string

                    },
                    body: JSON.stringify({
                        annonce_id: annonceId,
                        user_id: userId // Include the user_id in the request body
                    })
                });
                if (response.ok) {
                    console.log('Successfully applied to announcement.');
                    // You may want to update the UI or show a success message here
                } else {
                    console.error('Failed to apply to announcement:', response.statusText);
                }
            } catch (error) {
                console.error('Error applying to announcement:', error);
            }
        };

        const formatDate = (dateString) => {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        };
        return (
            <div className="mt-16 px-10">
                <div className="flex justify-center">
                    <h1 className="text-black font-bold text-3xl font-serif underline">All Announcements</h1>
                </div>

                <div className="flex flex-wrap gap-5 w-[80%] mx-auto mt-14">
                    {annonces.map((annonce, index) => (
                    <div className=" w-[470px] max-w-2xl px-8 py-4 bg-white rounded-md shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-light text-gray-600 dark:text-gray-600">{formatDate(annonce.date)}</span>
                            <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                               abIndex="0" role="button">{annonce.type}</p>
                        </div>

                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-700   hover:underline" tabIndex="0"
                               role="link">{annonce.titre}</p>
                            <p className="mt-2 text-gray-600 dark:text-gray-700">{annonce.description}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <button onClick={() => handleApply(annonce.id)}  className="text-white bg-black px-10 py-1 rounded hover:bg-gray-800 duration-300">Apply</button>

                            <div className="flex items-center">
                                <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                                     src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                                     alt="avatar"/>
                                <p className="font-bold text-gray-700 cursor-pointer" tabIndex="0" role="link">{annonce.user.fname} {annonce.user.lname}</p>
                            </div>
                        </div>
                        </div>
                        ))}
                    </div>
            </div>
        );
    };

    export default AllAnnounces;