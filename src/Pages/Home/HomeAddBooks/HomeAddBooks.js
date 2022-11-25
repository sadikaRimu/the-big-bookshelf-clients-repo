import { useQuery } from '@tanstack/react-query';
import React from 'react';
import HomeAddBooksCard from './HomeAddBooksCard';

const HomeAddBooks = () => {
    const { data: books = [], refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/books/addvertise', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <h2 className='text-xl font-bold text-center'>Some of Available Books</h2>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    books.map(book => <HomeAddBooksCard
                        key={book._id}
                        book={book}
                    ></HomeAddBooksCard>)
                }
            </div>
        </div>
    );
};

export default HomeAddBooks;