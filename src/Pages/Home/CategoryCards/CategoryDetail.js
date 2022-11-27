import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import blueTick from '../../../assets/images/bluTick.jpg';
import useVerified from '../../../hooks/useVerified';

const CategoryDetail = ({ book, setBookInfo }) => {
    const { user } = useContext(AuthContext);
    const { _id, bookName, email, SellerName, postDate, originalPrice, resalePrice, condition, booksCategory, image, phone, location, purchaseYear, description } = book;
    const [isVerified] = useVerified(email);
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold">{bookName}</h2>
                <p><strong>Book description:</strong> {description}</p>
                <p><strong>Seller's Name</strong><span> {SellerName}
                    {
                        isVerified ?
                            <img className='w-10 h-10 mr-15 btn-circle' src={blueTick} alt='' />
                            :

                            <div>not verified</div>

                    }
                </span> <span>{email}</span>,<span>{phone}</span>,<span>{location}</span></p>
                <p><span><strong>Original Price: </strong>{originalPrice}</span> <span><strong>Resale Price: </strong>{resalePrice}</span></p>
                <p><strong>Books Condition: </strong>{condition}</p>
                <p><strong>Purchase Date: </strong>{purchaseYear}</p>
                <p><strong>Post Date: </strong>{postDate}</p>
                <label htmlFor="booking-modal" onClick={() => setBookInfo(book)} className="btn">Book Now</label>

            </div>
        </div>
    );
};

export default CategoryDetail;