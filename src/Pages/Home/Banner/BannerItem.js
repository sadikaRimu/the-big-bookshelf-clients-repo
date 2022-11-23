import React from 'react';
import './BannerItem.css';

const BannerItem = ({ slide }) => {
    const { image, id, prev, next } = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-image'>
                <img src={image} alt="" className="w-full rounded-xl" />
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24  top-1/4">
                <h1 className='text-6xl font-bold text-white'>
                    Books,  <br />
                    Things with Feelings<br />

                </h1>
            </div>
            <div className="absolute flex justify-end w-2/5 transform -translate-y-1/2 left-24  top-1/2">
                <p className='text-white text-xl'>
                    Different categories books are available here,you can buy books from here also you can sell your old books here.
                </p>
            </div>
            <div className="absolute flex justify-start w-2/5 transform -translate-y-1/2 left-24  top-3/4">
                <button className="btn btn-primary mr-5 font-bold">Search Category</button>

            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle mr-5">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;