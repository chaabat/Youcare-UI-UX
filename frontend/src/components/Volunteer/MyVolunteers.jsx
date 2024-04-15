import React, {useEffect, useState} from 'react';

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
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    return (
        <div>
            <div className="flex ml-4  mt-20">
                <h1 className="text-blue-900 font-bold text-3xl font-mono  ">Mes Applications</h1>
            </div>
            <div className="container mx-auto p-6 font-mono">
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-white bg-blue-900 uppercase border border-white">
                        <th className="px-4 py-3">Application id</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {postulations.map((postulation, index) => (
                        <tr key={index} className="border text-m font-bold border-gray-200  ">
                            <td className="px-4 py-3">{postulation.id}</td>
                            <td className="px-4 py-3">{formatDate(postulation.created_at)}</td>
                            <td className="px-4 py-3">
                                {postulation.rejected_at
                                    ? 'Rejected'
                                    : postulation.confirmed_at
                                    ? 'Accepted'
                                    : 'Waiting for approval'}
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