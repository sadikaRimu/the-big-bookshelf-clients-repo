import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';


const CategoryCards = () => {
    const [bookCategory, setBookCategory] = useState([]);



    useEffect(() => {
        fetch('http://localhost:5000/booksCategory')
            .then(res => res.json())
            .then(data => {
                setBookCategory(data);
            })
    }, [])



    return (
        <div>
            <h2 className='text-2xl text-center font-bold mt-12'>Books Category</h2>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>

                {bookCategory.map(card => <CategoryCard
                    key={card._id}
                    card={card}
                ></CategoryCard>)}
            </div>
        </div>
    );
};

export default CategoryCards;