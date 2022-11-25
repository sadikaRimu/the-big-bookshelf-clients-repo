import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryDetail from './CategoryDetail';

const Categories = () => {
    const books = useLoaderData();

    return (
        <div>
            <h2 className='text-center font-bold'>{books.length} book are available in this category</h2>
            <div className='grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
                {
                    books.map(book => <CategoryDetail
                        key={book._id}
                        book={book}
                    ></CategoryDetail>)
                }
            </div>
        </div>
    );
};

export default Categories;