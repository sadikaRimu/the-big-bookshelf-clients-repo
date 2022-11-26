import React from 'react';

const HomeAddBooksCard = ({ book }) => {
    const { bookName, email, SellerName, postDate, originalPrice, resalePrice, condition, booksCategory, image, phone, location, purchaseYear, description } = book;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold">{bookName}</h2>
                <p><strong>Book description:</strong> {description}</p>
                <p><strong>Seller's Name:</strong> {SellerName} <span>{email}</span>,<span>{phone}</span>,<span>{location}</span></p>
                <p><span><strong>Original Price: </strong>{originalPrice}</span> <span><strong>Resale Price: </strong>{resalePrice}</span></p>
                <p><strong>Books Condition: </strong>{condition}</p>
                <p><strong>Purchase Date: </strong>{purchaseYear}</p>
                <p><strong>Post Date: </strong>{postDate}</p>
                <div className="card-actions">

                </div>
            </div>
        </div>
    );
};

export default HomeAddBooksCard;