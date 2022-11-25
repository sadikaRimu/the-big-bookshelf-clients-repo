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
                authorization: `bearer ${localStorage.getItem('accessToken')}`
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
                            <th>AddVestise</th>
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
                                        book?.advertise !== 'Advertised' ?
                                            <button
                                                onClick={() => handleAdvertise(book._id)}
                                                className='btn btn-primary btn-sm'
                                            >Advertise</button>
                                            :
                                            <button className='btn btn-secondary btn-sm'>Advertised</button>
                                    }
                                </td>
                                <td>
                                    {
                                        book?.status === 'Booked' ?
                                            <p
                                                className='text-primary font-bold'
                                            >Booked</p>
                                            :
                                            <p
                                                className='text-primary font-bold'
                                            >Availabe</p>
                                    }
                                </td>
                                <td><button
                                    className='btn btn-nutral btn-sm'
                                >Delete</button></td>
                                {/* <td>
                                    {
                                        book.price && !book.paid && <Link
                                            to={`/dashboard/payment/${book._id}`}><button
                                                className='btn btn-primary btn-sm'
                                            >Pay</button></Link>
                                    }
                                    {
                                        book.price && book.paid && <span className='text-green-500'>Paid</span>
                                    }
                                </td> */}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;