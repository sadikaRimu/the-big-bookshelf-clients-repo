import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const AllSeller = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://sadika-assignment12-server.vercel.app/users/seller');
            const data = await res.json();
            return data;
        }
    });
    const handleVerification = id => {
        fetch(`https://sadika-assignment12-server.vercel.app/users/seller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verified Successfully');
                    refetch();
                }
            })
    }
    return (
        <div>
            <h2 className='text-xl font-bold'>All Seller List</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {
                                        user?.status !== 'Verified' ?
                                            user?.role !== 'Admin' && <button onClick={() => handleVerification(user._id)}
                                                className='btn btn-xs btn-primary'>Verify</button>
                                            :
                                            <button className='btn btn-xs btn-primary'>Verified</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;