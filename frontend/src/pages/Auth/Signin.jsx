import React from "react";

const Signin = () => {
    return (
        <div>
            <div className="grid mt-24 place-items-center">
                <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                    <h1 className="text-xl font-mono text-center font-semibold">
                        Connect to your account
                    </h1>
                    <form className="mt-6">
                        <div className="flex justify-between gap-3"></div>

                        <label className="block mt-2 text-m font-mono font-semibold text-black ">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                        <label
                            for="password"
                            className="block mt-2 text-m font-mono font-semibold text-black "
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full py-3 mt-6 font-medium tracking-widest text-white  bg-blue-900 shadow-lg focus:outline-none "
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
