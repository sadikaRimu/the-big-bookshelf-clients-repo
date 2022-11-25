import React from 'react';
import { Link } from 'react-router-dom';




const CategoryCard = ({ card }) => {
    const { name } = card;
    return (
        <div className='card w-96 mx-5 bg-gradient-to-r from-secondary to-primary text-white'>
            <div className="card-body flex flex-col lg:flex-row items-center">
                {/* <img className='w-20 h-20 mx-4' src='' alt='' /> */}
                <div className=''>

                    <h2 className="card-title">{name} </h2>


                    <Link to={`/categoryBooks/${name}`}><button className='btn btn-warning mt-6'>View collection</button></Link>
                </div>


            </div>
        </div>
    );
};

export default CategoryCard;