import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
const EditAnnounces = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        type: '',
        location: '',
        date: '',
    });

    useEffect(() => {
       const fetchAnnouncement = async () => {
           try {
               const response = await fetch(`http://localhost/api/annonces/${id}`);
               if (!response.ok) {
                   throw new Error('Failed to fetch data');
               }
               const data = await response.json();
               setFormData(data);
           } catch (error) {
                console.error('Error fetching announcement data', error);
           }
       };
       fetchAnnouncement();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost/api/annonces/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error('Failed to update Announcement');
            }
            console.log('Announcement Updated Successfully');
            navigate('/annonces');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="mt-44">
                <h1 className="font-medium font-mono text-3xl text-black text-center">Update Your Announcement</h1>
            </div>
            <div className=" w-[50%] mx-auto bg-white shadow-md rounded px-8 mt-5 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">Title</label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="titre"  type="text" placeholder="AA ..."/>
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">Déscription</label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="description"  type="text" placeholder="AA ..."/>
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">Type Announcement</label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" name="type"  type="text" placeholder="AA ..."/>
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-city">Location</label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="location" type="text" placeholder="AA ...    "/>
                    </div>

                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">Date</label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="date" type="datetime-local" placeholder="90210"/>
                    </div>
                </div>

                <div className="flex justify-center gap-2 items-center mt-4">
                    <button
                        className="bg-black text-white font-medium px-16 py-2 hover:bg-gray-900 duration-500 rounded-md">Update
                    </button>
                    <Link to="/annonces"
                          className="bg-gray-600 text-white font-medium px-16 py-2 hover:bg-gray-700 duration-500 rounded-md">Back
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default EditAnnounces;