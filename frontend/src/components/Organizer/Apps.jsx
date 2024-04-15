import React, { useEffect, useState } from 'react';

const MyVolunteers = () => {
    const [postulations, setPostulations] = useState([]);

    useEffect(() => {
        fetchPostulations();
    }, []);

    const fetchPostulations = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT TOKEN NOT FOUND');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/applications/all', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.pending_applications)) {
                    setPostulations(data.pending_applications);
                } else {
                    console.error('Data received from API is not an array:', data);
                }
            } else {
                console.error('Failed to fetch postulations:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching postulations:', error);
        }
    };
    const accept = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/api/application/accept/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to accept application');
            }
            console.log('Application accepted successfully');
          
            fetchPostulations();
        } catch (error) {
            console.error('Error accepting application:', error);
        }
    };

    const reject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/api/application/reject/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to reject application');
            }
            console.log('Application rejected successfully');
             fetchPostulations();
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div>
            <div className="flex ml-4 mt-20">
                <h1 className="text-blue-900 font-bold text-3xl font-mono  ">Applications</h1>
            </div>
            <div className="container mx-auto p-6 font-mono">
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
            <table className="w-full  ">
                <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-white bg-blue-900 uppercase border border-white">
                        <th className="px-4 py-3">Application id</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white  ">
                    {postulations.map((postulation, index) => (
                        <tr key={index} className="border-b border-gray-200 font-mono font-bold ">
                            <td className="px-4 py-3">{postulation.id}</td>
                            <td className="px-4 py-3">{formatDate(postulation.created_at)}</td>
                            <td className="px-4 py-3    ">
                                {postulation.confirmed_at ? (
                                    <span className="font-bold text-green-500">Accepted</span>
                                ) : postulation.rejected_at ? (
                                    <span className="font-bold text-red-500">Rejected</span>
                                ) : (
                                    <div className='space-x-4 flex items-center justify-content'>
                                        <button className="text-white bg-green-700     font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => accept(postulation.id)}>Accept</button>
                                        <button className="text-white bg-red-700     font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => reject(postulation.id)}>Reject</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>

        </div>
    );
};

export default MyVolunteers;
