import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import blueTick from '../../../assets/images/bluTick.jpg';
import useVerified from '../../../hooks/useVerified';

const CategoryDetail = ({ book }) => {
    const { user } = useContext(AuthContext);
    const { _id, bookName, email, SellerName, postDate, originalPrice, resalePrice, condition, booksCategory, image, phone, location, purchaseYear, description } = book;
    const [isVerified] = useVerified(user?.email);
    console.log('gg', isVerified);
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const contact = form.contact.value;
        const meetinglocation = form.meetinglocation.value;
        const buyList = {
            bookId: _id,
            bookName: bookName,
            email: user?.email,
            contact,
            meetinglocation

        }
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(buyList)
        })
            .then(res => res.json())
            .then(data => {
                console.log('saveBooking', data);



            })


    }
    const handlebookingStatus = id => {
        fetch(`http://localhost:5000/books/status/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log('booked')
                    toast.success('booked Successfully');

                }
            })
    }
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
                <div className="card-actions">
                    <label htmlFor="my-modal-5" className="btn">Book Now</label>
                    <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg mb-3">Book Now to buy this book </h3>
                            <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <form onSubmit={handleBooking}>
                                <div className='grid grid-cols-1 gap-2 mb-2'>
                                    <input type='text' defaultValue={_id} readOnly hidden />
                                    <label className='label'>Your Email</label>
                                    <input name='email' type="text" defaultValue={user?.email} className="input input-ghost w-full input-bordered" readOnly />
                                    <label className='label'>your Name</label>
                                    <input name='displayName' type="text" defaultValue={user?.displayName} className="input input-ghost w-full input-bordered" readOnly />
                                    <label className='label'>Book Name</label>
                                    <input name='bookName' type="text" defaultValue={bookName} className="input input-ghost w-full input-bordered " readOnly />
                                    <label className='label'>Price</label>
                                    <input name='price' type="text" defaultValue={resalePrice} className="input input-ghost w-full input-bordered " readOnly />
                                    <label className='label'>Phone</label>
                                    <input name='contact' type="text" placeholder="Your phone" className="input input-ghost w-full input-bordered " required />
                                    <label className='label'>Meeting Location</label>
                                    <input name='meetinglocation' type="text" placeholder="Your meeting location" className="input input-ghost w-full input-bordered " />
                                </div>

                                <div className="modal-action">
                                    <input onClick={() => handlebookingStatus(_id)} type='submit' htmlFor="my-modal-5" value='Confirm Booking' className="btn" />
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;