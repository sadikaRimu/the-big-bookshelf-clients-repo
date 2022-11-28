import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider';

const ConfirmModal = ({ bookInfo, setBookInfo }) => {
    const { user } = useContext(AuthContext);
    const { _id, bookName, email, SellerName, postDate, originalPrice, resalePrice, condition, booksCategory, image, phone, location, purchaseYear, description } = bookInfo;
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const bookId = form.bookId.value;
        const bookName = form.bookName.value;
        const price = form.price.value;
        const contact = form.contact.value;
        const meetinglocation = form.meetinglocation.value;
        const buyList = {
            bookId,
            bookName,
            price,
            email: user?.email,
            contact,
            meetinglocation

        }
        fetch('https://sadika-assignment12-server.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(buyList)
        })
            .then(res => res.json())
            .then(data => {

                alert('booked Successfully');
                console.log('saveBooking', data);


            })


    }
    const handlebookingStatus = id => {
        fetch(`https://sadika-assignment12-server.vercel.app/books/status/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    setBookInfo(null);
                    console.log('booked')

                }
            })
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="font-bold text-lg mb-3">Book Now to buy this book </h3>
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking}>
                        <div className='grid grid-cols-1 gap-2 mb-2'>
                            <input name='bookId' type='text' value={_id} readOnly hidden />
                            <label className='label'>Your Email</label>
                            <input name='email' type="text" value={user?.email} className="input input-ghost w-full input-bordered" readOnly />
                            <label className='label'>your Name</label>
                            <input name='displayName' type="text" defaultValue={user?.displayName} className="input input-ghost w-full input-bordered" readOnly />
                            <label className='label'>Book Name</label>
                            <input name='bookName' type="text" value={bookName} className="input input-ghost w-full input-bordered " readOnly />
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
            {/* <div className="card-actions">
                <label htmlFor="my-modal-5" className="btn">Book Now</label>
                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg mb-3">Book Now to buy this book </h3>
                        <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <form onSubmit={handleBooking}>
                            <div className='grid grid-cols-1 gap-2 mb-2'>
                                <input name='bookId' type='text' value={_id} readOnly hidden />
                                <label className='label'>Your Email</label>
                                <input name='email' type="text" value={user?.email} className="input input-ghost w-full input-bordered" readOnly />
                                <label className='label'>your Name</label>
                                <input name='displayName' type="text" defaultValue={user?.displayName} className="input input-ghost w-full input-bordered" readOnly />
                                <label className='label'>Book Name</label>
                                <input name='bookName' type="text" value={bookName} className="input input-ghost w-full input-bordered " readOnly />
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

            </div> */}

        </>
    );
};

export default ConfirmModal;