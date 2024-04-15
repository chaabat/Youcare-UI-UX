import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AllAnnounces = () => {
    const [annonces, setAnnonces] = useState([]);
    const [appliedAnnouncements, setAppliedAnnouncements] = useState([]);

    useEffect(() => {
        fetchAnnounces();
        fetchAppliedAnnouncements();
    }, []);

    const fetchAnnounces = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("JWT token not found in local storage");
                return;
            }

            const response = await fetch(
                "http://127.0.0.1:8000/api/announcements/all",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.announcements)) {
                    setAnnonces(data.announcements);
                } else {
                    console.error(
                        "Data received from API is not an array:",
                        data
                    );
                }
            } else {
                console.error(
                    "Failed to fetch announcements:",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const fetchAppliedAnnouncements = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;

            const response = await fetch(
                `http://127.0.0.1:8000/api/application/user/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.applications)) {
                    const appliedAnnouncementIds = data.applications.map(
                        (application) => application.announcement_id
                    );
                    setAppliedAnnouncements(appliedAnnouncementIds);
                } else {
                    console.error(
                        "Data received from API is not an array:",
                        data
                    );
                }
            } else {
                console.error(
                    "Failed to fetch applied announcements:",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching applied announcements:", error);
        }
    };

    const handleApply = async (annonceId) => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;

            const response = await fetch(
                "http://127.0.0.1:8000/api/application/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        announcement_id: annonceId,
                        volunteer_id: userId,
                    }),
                }
            );
            if (response.ok) {
                console.log("Successfully applied to announcement.");
                // Update the appliedAnnouncements state
                setAppliedAnnouncements([...appliedAnnouncements, annonceId]);
            } else {
                console.error(
                    "Failed to apply to announcement:",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error applying to announcement:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <div className="mt-16 px-10">
            <div className="flex">
                <h1 className="text-blue-900 font-bold text-3xl font-mono">
                    All Announcements
                </h1>
            </div>

            <div className="flex flex-wrap gap-5 w-[80%] mx-auto mt-14">
                {annonces.map((annonce, index) => (
                    <div
                        key={annonce.id}
                        className="w-[470px] border border-blue-900 border-4 max-w-2xl px-8 py-4 bg-white rounded-md shadow-lg border border-gray-200"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold px-3 py-1 text-green-600 bg-green-100 rounded">
                                {formatDate(annonce.date)}
                            </span>
                            <p
                                className="px-3 py-1 text-sm font-bold text-blue-900 bg-blue-200 rounded"
                                abindex="0"
                                role="button"
                            >
                                {annonce.type}
                            </p>
                        </div>

                        <div className="mt-8">
                            <p
                                className="text-xl text-center font-bold text-blue-900 uppercase"
                                tabIndex="0"
                                role="link"
                            >
                                {annonce.title}
                            </p>
                            <p className="mt-2 text-black font-mono text-center">
                                {annonce.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <button
                                disabled={appliedAnnouncements.includes(
                                    annonce.id
                                )}
                                onClick={() => handleApply(annonce.id)}
                                className={`text-white px-10 py-1 rounded ${
                                    appliedAnnouncements.includes(annonce.id)
                                        ? "bg-red-500 cursor-not-allowed"
                                        : "bg-blue-900 hover:bg-blue-800"
                                }`}
                            >
                                {appliedAnnouncements.includes(annonce.id)
                                    ? "Déja Appliqueé"
                                    : "Appliqueé"}
                            </button>{" "}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAnnounces;
