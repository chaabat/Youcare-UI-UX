import React from "react";
import { Link } from "react-router-dom";

const Modifier = () => {
    return (
        <div>
            <div className="mt-24">
                <h1 className="font-medium font-mono font-bold text-3xl text-blue-900 text-center">
                    Update Your Announcement
                </h1>
            </div>
            <div className=" w-[50%] mx-auto bg-white shadow-md rounded px-8 mt-5 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block font-mono  tracking-wide text-black font-bold text-m  mb-2">
                            Title
                        </label>
                        <input
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                            name="titre"
                            type="text"
                        />
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="block font-mono  tracking-wide text-black font-bold text-m  mb-2">
                            Déscription
                        </label>
                        <input
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                            name="description"
                            type="text"
                        />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block font-mono  tracking-wide text-black font-bold text-m  mb-2">
                            Type Announcement
                        </label>
                        <select
                            name="type"
                            id=""
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                        >
                            <option value="value">value</option>
                        </select>
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block font-mono  tracking-wide text-black font-bold text-m  mb-2">
                            Location
                        </label>
                        <input
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                            name="localisation"
                            type="text"
                        />
                    </div>

                    <div className="md:w-1/2 px-3">
                        <label className="block font-mono  tracking-wide text-black font-bold text-m  mb-2">
                            Date
                        </label>
                        <input
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                            name="date"
                            type="datetime-local"
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-2 items-center mt-4">
                    <button
                        type="submit"
                        className="bg-black text-white font-medium px-16 py-2 hover:bg-gray-900 duration-500 rounded-md"
                    >
                        Update
                    </button>
                    <Link
                        to="/annonce"
                        className="bg-gray-600 text-white font-medium px-16 py-2 hover:bg-gray-700 duration-500 rounded-md"
                    >
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Modifier;
