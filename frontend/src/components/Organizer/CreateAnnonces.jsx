import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CreateAnnonces = () => {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [type, setType] = useState("");
    const [required_skills, setrequired_skills] = useState("");
    const [location, setlocation] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;

            const response = await fetch(
                "http://127.0.0.1:8000/api/announcement/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        type,
                        required_skills,
                        location,
                        date,
                        organizer_id: userId,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);
            navigate("/Annonces");
        } catch (error) {
            console.error("Error creating announcement:", error);
        }
    };

    return (
        <div>
            <div className="mt-16">
                <h1 className="font-bold font-mono text-3xl text-blue-900 text-center">
                    Ajouter Annonce
                </h1>
            </div>
            <form onSubmit={submit}>
                <div className=" w-[50%] mx-auto bg-blue-900 shadow-md rounded px-8 mt-5 pt-6 pb-8 mb-4 flex flex-col my-2">
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                Title
                            </label>
                            <input
                                onChange={(e) => settitle(e.target.value)}
                                className="appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3"
                                type="text"
                            />
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Déscription
                            </label>
                            <input
                                onChange={(e) => setdescription(e.target.value)}
                                className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Type Announcement
                            </label>
                            <input
                                onChange={(e) => setType(e.target.value)}
                                className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4 mb-3"
                                type="text"
                            />
                        </div>
                        <div className="md:w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Skills
                            </label>
                            <input
                                onChange={(e) =>
                                    setrequired_skills(e.target.value)
                                }
                                className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4 mb-3"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-2">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                                htmlFor="grid-city"
                            >
                                location
                            </label>
                            <input
                                onChange={(e) => setlocation(e.target.value)}
                                className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4"
                                type="text"
                            />
                        </div>

                        <div className="md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                                htmlFor="grid-zip"
                            >
                                Date
                            </label>
                            <input
                                onChange={(e) => setDate(e.target.value)}
                                className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4"
                                type="datetime-local"
                                placeholder="90210"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 items-center mt-4">
                        <button
                            onClick={submit}
                            className="bg-white text-blue-900 font-medium px-16 py-2   rounded-md"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateAnnonces;
