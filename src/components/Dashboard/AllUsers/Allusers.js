import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider';
import useSeller from '../../../hooks/useSeller';

const Allusers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://sadika-assignment12-server.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin = (id) => {
        const UserRole = {
            role: 'Admin'
        }

        fetch(`https://sadika-assignment12-server.vercel.app/users/makeAdmin/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(UserRole)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make Admin Successful');
                    refetch();
                }
            })
    }
    const handleUserDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete this?');
        if (proceed) {
            fetch(`https://sadika-assignment12-server.vercel.app/users/${id}`, {
                method: 'DELETE'
                // headers: {
                //     authorization: `Bearer ${localStorage.getItem('genius token')}`
                // }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast('deleted successfully');
                        refetch();
                    }
                })
        }
    }
    return (
        <div>
            <h2 className='text-3xl mb-6'>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user?.role !== 'Admin' && <button onClick={() => handleMakeAdmin(user._id)}
                                    className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                                <td><button onClick={() => handleUserDelete(user._id)} className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;