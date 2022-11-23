import React from 'react';

const CategoryCard = ({ card }) => {
    console.log(card);
    const { name, items } = card;
    return (
        <div className='card w-96 mx-5 bg-gradient-to-r from-secondary to-primary text-white'>
            <div className="card-body flex flex-col lg:flex-row items-center">
                {/* <img className='w-20 h-20 mx-4' src='' alt='' /> */}
                <div className=''>
                    <h2 className="card-title">{name}</h2>
                    <p>{items} books are available in this category</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;