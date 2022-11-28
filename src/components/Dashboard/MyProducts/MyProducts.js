import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/books?email=${user?.email}`;
    const { data: books = [], refetch } = useQuery({
        queryKey: ['books', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/books/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('booksToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Advertised Successfully');
                    refetch();
                }
            })
    }
    const handleDeleteProduct = id => {
        const proceed = window.confirm('Are you sure, you want to delete this?');
        if (proceed) {
            fetch(`http://localhost:5000/books/${id}`, {
                method: 'DELETE'

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        handleRemoveBooked(id);
                        toast('deleted successfully');
                        refetch();
                    }
                })
        }
    }
    const handleRemoveBooked = (id) => {
        fetch(`http://localhost:5000/booking/books/${id}`, {
            method: 'DELETE'

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    console.log('deleted')
                }
            })

    }
    return (
        <div>
            <h2 className='font-bold mb-6'>My all Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Book Name</th>
                            <th>Book's Info</th>
                            <th>AddVertise</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            books?.map((book, i) => <tr key={book._id}>
                                <th>{i + 1}</th>
                                <td>{book.bookName}</td>
                                <td><p>Original Price: {book.originalPrice}</p>
                                    <p>Resale Price: {book.resalePrice}</p>
                                    <p>Condition: {book.condition}</p>
                                </td>
                                <td>
                                    {
                                        book?.status === 'Available' ?
                                            <>
                                                {
                                                    book?.advertise !== 'Advertised' ?
                                                        <button
                                                            onClick={() => handleAdvertise(book._id)}
                                                            className='btn btn-primary btn-sm'
                                                        >Advertise</button>
                                                        :
                                                        <button className='btn btn-secondary btn-sm'>Advertised</button>
                                                }
                                            </>
                                            :
                                            <button className='btn btn-praimary btn-sm' disabled>Advertise</button>
                                    }
                                </td>
                                <td className='font-bold'>{book.status}</td>
                                <td>
                                    {
                                        book?.status === 'Reported' ?
                                            <button className='btn btn-primary' disabled>Delete</button>
                                            :
                                            <button
                                                onClick={() => handleDeleteProduct(book._id)}
                                                className='btn btn-nutral btn-sm'
                                            >Delete</button>
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

export default MyProducts;