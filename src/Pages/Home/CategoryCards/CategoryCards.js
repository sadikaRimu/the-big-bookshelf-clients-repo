import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';


const CategoryCards = () => {
    const [bookCategory, setBookCategory] = useState([]);

    // const { data: bookCategories = [] } = useQuery({
    //     queryKey: ['bookCategories'],
    //     queryFn: async () => {
    //         const res = await fetch('/BooksCategory.json');
    //         const data = await res.json();
    //         return data;
    //     }
    // })
    useEffect(() => {
        fetch('BooksCategory.json')
            .then(res => res.json())
            .then(data => {
                setBookCategory(data);
            })
    }, [])

    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14'>

            {bookCategory.map(card => <CategoryCard
                key={card.id}
                card={card}
            ></CategoryCard>)}
        </div>
    );
};

export default CategoryCards;