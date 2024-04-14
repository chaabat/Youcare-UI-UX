import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const CreateAnnonces = () => {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [competance, setCompetance] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;

            const response = await fetch('http://localhost/api/annonces', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    titre,
                    description,
                    type,
                    competance,
                    location,
                    date,
                    user_id: userId,
                })
            });

            const data = await response.json();
            console.log(data);
            navigate('/Annonces')
        } catch (error) {
            console.error('Error creating announcement:', error);
            // Handle error states or display error messages to the user
        }
    };

    return (
        <div>
            <div className="mt-44">
                <h1 className="font-medium font-mono text-3xl text-black text-center">Add New Announcement</h1>
            </div>
            <form onSubmit={submit}>
                <div className=" w-[50%] mx-auto bg-white shadow-md rounded px-8 mt-5 pt-6 pb-8 mb-4 flex flex-col my-2">
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">Title</label>
                            <input onChange={e => setTitre(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"   type="text" placeholder="AA ..."/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">Déscription</label>
                            <input onChange={e => setDescription(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"   type="text" placeholder="AA ..."/>
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">Type Announcement</label>
                            <input onChange={e => setType(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="AA ..."/>
                        </div>
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">Skills</label>
                            <input onChange={e => setCompetance(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="AA ..."/>
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-2">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                   htmlFor="grid-city">Location</label>
                            <input onChange={e => setLocation(e.target.value)}
                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" placeholder="AA ...    "/>
                        </div>

                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">Date</label>
                            <input onChange={e => setDate(e.target.value)} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="datetime-local" placeholder="90210"/>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 items-center mt-4">
                        <button type="submit"
                            className="bg-black text-white font-medium px-16 py-2 hover:bg-gray-900 duration-500 rounded-md">Create
                        </button>
                        <Link to="/annonces"
                            className="bg-gray-600 text-white font-medium px-16 py-2 hover:bg-gray-700 duration-500 rounded-md">Back
                        </Link>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateAnnonces;