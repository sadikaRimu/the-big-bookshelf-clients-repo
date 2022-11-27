import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyWishList = () => {
    const { user } = useContext(AuthContext);
    const { data: wishList = [], refetch } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/wishList/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    const handleWishDelete = (id, bookId) => {

        const proceed = window.confirm('Are you sure, you want to delete this?');
        if (proceed) {
            fetch(`http://localhost:5000/wishList/${id}`, {
                method: 'DELETE'
                // headers: {
                //     authorization: `Bearer ${localStorage.getItem('genius token')}`
                // }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        handleRemoveBooked(bookId);
                        toast('deleted successfully');
                        refetch();
                    }
                })
        }
    }
    const handleRemoveBooked = id => {
        console.log(id);
        const bookStatus = {
            status: 'Available'
        }
        fetch(`http://localhost:5000/books/statusAvailable/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bookStatus)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    // toast.success('Make Admin Successful');
                    //refetch();
                }
            })
    }
    return (
        <div>
            <h2 className='font-bold'>My wishList</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Book Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            wishList.map((item, i) => <tr key={item._id}>
                                <th>{i + 1}</th>
                                <td>{item.bookName}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>{item.meetinglocation}</td>
                                <td><button onClick={() => handleWishDelete(item._id, item.bookId)} className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyWishList;