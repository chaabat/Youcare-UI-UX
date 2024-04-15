import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const EditAnnounces = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        location: '',
        date: '',
    });

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/announcements/all`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const announcement = data.announcements.find(announcement => announcement.id === parseInt(id));
                if (!announcement) {
                    throw new Error('Announcement not found');
                }
                setFormData(announcement);
            } catch (error) {
                console.error('Error fetching announcement data', error);
            }
        };
        fetchAnnouncement(); // Call fetchAnnouncement function here
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/api/announcement/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update Announcement');
            }
            console.log('Announcement Updated Successfully');
            navigate('/annonces');
        } catch (error) {
            console.error('Error updating announcement', error);
        }
    }
    

    return (
        <div>
            <div className="mt-16">
            <h1 className="font-bold font-mono text-3xl text-blue-900 text-center">
                    Modifier Annonce
                </h1>            </div>
            <div className=" w-[50%] mx-auto bg-blue-900 shadow-md rounded px-8 mt-5 pt-6 pb-8 mb-4 flex flex-col my-2">
                <form onSubmit={handleSubmit}>
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">Title</label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="title" value={formData.title} onChange={handleChange} type="text" placeholder="AA ..." />
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">Description</label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="description" value={formData.description} onChange={handleChange} type="text" placeholder="AA ..." />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">Type Announcement</label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" name="type" value={formData.type} onChange={handleChange} type="text" placeholder="AA ..." />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-2">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">Location</label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="location" value={formData.location} onChange={handleChange} type="text" placeholder="AA ..." />
                        </div>

                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-zip">Date</label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="date" value={formData.date} onChange={handleChange} type="datetime-local" placeholder="90210" />
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 items-center mt-4">
                        <button
                            className="bg-white text-blue-900 font-medium px-16 py-2   rounded-md">Update
                        </button>
                      
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAnnounces;
