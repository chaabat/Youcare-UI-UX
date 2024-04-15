import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Annonces = () => {
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        fetchAnnonces();
    }, []);

      const fetchAnnonces = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/announcements/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.announcements)) { 
                    setAnnonces(data.announcements); 
                } else {
                    console.error('Data received from API is not an array:', data);
                }
            } else {
                console.error('Failed to fetch announcements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };


    const handleDelete = async (id) => {
        try{
            const token = localStorage.getItem('token');
            if(!token){
                console.error('JWT TOKEN NOT FOUND');
            }

            const response = await fetch(`http://127.0.0.1:8000/api/announcement/delete/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.ok){
                setAnnonces(prevAnnounces => prevAnnounces.filter(annonce => annonce.id !== id));
            } else {
                console.error('Failed to delete announcement:', response.statusText);
            }
        } catch (error){
            console.error('Error deleting announcement:', error);
        }
    }

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="mt-16 px-10">
            <div className="flex justify-between">
                <h1 className="text-blue-900 font-bold text-3xl font-mono">Les annonces</h1>
                <Link to="/CreateAnnonces" className="bg-blue-900 text-white font-medium px-5 py-2 rounded-md ">Ajouter</Link>
            </div>

            <section className="container mx-auto p-6 font-mono">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full ">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-white bg-blue-900 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Titre</th>
                                <th className="px-4 py-3">types</th>
                                <th className="px-4 py-3">description</th>
                                <th className="px-4 py-3">location</th>
                                <th className="px-4 py-3">skills</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {annonces.map((annonce, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="px-4 py-3">{annonce.title}</td>
                                    <td className="px-4 py-3">{annonce.type}</td>
                                    <td className="px-4 py-3">{annonce.description}</td>
                                    <td className="px-4 py-3">{annonce.location}</td>
                                    <td className="px-4 py-3">{annonce.required_skills}</td>
                                    <td className="px-4 py-3">{formatDate(annonce.date)}</td>
                                    <td className="px-4 py-3">
                                        <Link to={`/EditAnnounces/${annonce.id}`} className="text-blue-600 hover:text-blue-900 mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(annonce.id)} className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        </div>

    );
};

export default Annonces;