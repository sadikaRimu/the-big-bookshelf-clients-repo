import React from 'react';

const CategoryDetail = ({ book }) => {
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
                    {/* <button className="btn btn-primary">Book Now</button> */}
                    <label htmlFor="book-modal" className="btn btn-primary">Book Now</label>
                    <input type="checkbox" id="book-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="book-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        </div>
                    </div>
                    {/* The button to open modal */}
                    <label htmlFor="my-modal" className="btn">open modal</label>

                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn">Yay!</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;