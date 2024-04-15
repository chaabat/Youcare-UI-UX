import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
const VolunteerRegister = () => {
    const [name, setFirstName] = useState("");
    const [skills, setskills] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();

        await fetch("http://127.0.0.1:8000/api/register/volunteer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                skills,
                email,
                password,
            }),
        });
        navigate("/signin");
    };

    return (
        <div>
            <section
                style={{
                    backgroundImage: `url('photos/cover.jpg')`,
                    backgroundSize: "cover",
                     
                }}
            >
                <div className="flex justify-center ">
                    <div className="flex mt-4 h-screen items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl  font-semibold tracking-wider text-white capitalize">
                                Benevole Form
                            </h1>
                            <div>
                                <div className=" flex justify-end mt-3 md:flex md:items-center md:-mx-2">
                                    <Link
                                        to="/OrganizerRegister"
                                        id="organisateur-btn"
                                        className="flex justify-center w-full px-6 py-3 mt-4 text-white border bg-blue-900  rounded-lg md:mt-0 md:w-auto md:mx-2 hover:bg-white hover:text-black hover:border-black duration-500 focus:outline-none"
                                    >
                                      
                                        <span className="mx-2">
                                            Organisateur
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className=" w-full">
                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 ">
                                        <div>
                                            <label className="block mb-2 text-m text-blue-900 font-mono font-bold ">
                                                {" "}
                                                Name
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                type="text"
                                                className="block w-full px-5 py-3 mt-2 text-black bg-white "
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-m text-blue-900 font-mono font-bold ">
                                                Skills
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setskills(e.target.value)
                                                }
                                                type="text"
                                                className="block w-full px-5 py-3 mt-2 text-black bg-white "
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-m text-blue-900 font-mono font-bold">
                                                Email Address
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                type="email"
                                                className="block w-full px-5 py-3 mt-2 text-black bg-white "
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-m text-blue-900 font-mono font-bold">
                                                Password
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                type="password"
                                                className="block w-full px-5 py-3 mt-2 text-black bg-white "
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-6 h-12 mt-7 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-900 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    >
                                        Sign Up
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

export default VolunteerRegister;
