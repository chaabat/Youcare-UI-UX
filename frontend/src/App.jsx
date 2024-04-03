import { Routes, Route, Link } from "react-router-dom";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Annonce from "./pages/organisateur/Annonce";
import Create from "./pages/organisateur/Create";
import Modifier from "./pages/organisateur/Modifier";

function App() {
    return (
        <div classNameName="bg-sky-50 h-screen">
            <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    <div className="text-blue-900 md:order-1">
                        <div className="flex space-x-4 items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                />
                            </svg>
                            <h2 className="text-black font-mono font-bold text-2xl">
                                YouCare
                            </h2>
                        </div>
                    </div>
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between"></ul>
                    </div>
                    <div className="order-2 md:order-3 flex space-x-4">
                        <Link
                            to="/signin"
                            className="px-4 py-2 bg-blue-900 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
                        >
                            <span>Sign in </span>
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-blue-900 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
                        >
                            <span>Sign up</span>
                        </Link>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/annonce" element={<Annonce />} />
                <Route path="/annonce/create" element={<Create />} />
                <Route path="/annonce/update" element={<Modifier />} />
            </Routes>
        </div>
    );
}

export default App;
