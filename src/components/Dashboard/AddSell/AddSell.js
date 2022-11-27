import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Loading/Loading';

const AddSell = () => {
    const { user } = useContext(AuthContext);
    //  console.log(user);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();
    const { data: booksCategory, isLoading } = useQuery({
        queryKey: ['booksCategory'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/booksCategory');
            const data = await res.json();
            return data;
        }
    });
    const handleAddBook = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {

                if (imgData.success) {
                    console.log(imgData.data.url);
                    const book = {
                        bookName: data.bookName,
                        email: user.email,
                        SellerName: user.displayName,
                        postDate: new Date(),
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        condition: data.condition,
                        booksCategory: data.booksCategory,
                        image: imgData.data.url,
                        phone: data.phone,
                        location: data.location,
                        description: data.description,
                        purchaseYear: data.purchaseYear,
                        status: 'Available'
                    }

                    //save books info to the database
                    fetch('http://localhost:5000/books', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(book)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.bookName} is added successfully`);
                            navigate('/dashboard/managedoctors');
                        })
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h2 className='text-3xl font-bold'>Add A Book for Sell</h2>
            <form onSubmit={handleSubmit(handleAddBook)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Book Name</span>
                    </label>
                    <input type='text'
                        {...register('bookName', {
                            required: 'book name is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input type='text'
                        {...register('originalPrice', {
                            required: 'original price is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Resale Price</span>
                    </label>
                    <input type='text'
                        {...register('resalePrice', {
                            required: 'Resale price is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Condition</span>
                    </label>
                    <select
                        {...register('condition')}
                        className="select select-bordered w-full max-w-xs">
                        <option value='Excellent'>Excellent</option>
                        <option value='Good'>Good</option>
                        <option value='Fair'>Fair</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Book Category</span>
                    </label>
                    <select
                        {...register('booksCategory')}
                        className="select select-bordered w-full max-w-xs">

                        {
                            booksCategory.map(special => <option
                                key={special._id}
                                value={special.name}
                            >{special.name}</option>)
                        }


                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type='file'
                        {...register('image', {
                            required: 'Photo is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Mobile Number</span>
                    </label>
                    <input type='text'
                        {...register('phone', {
                            required: 'phone number is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type='text'
                        {...register('location', {
                            required: 'location is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type='text'
                        {...register('description', {
                            required: 'description is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Year of purchase</span>
                    </label>
                    <input type='date'
                        {...register('purchaseYear', {
                            required: 'date is required'
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-600'>{errors.name?.message}</p>} */}
                </div>

                <input className='btn btn-primary w-full text-white mt-6' value='Add Product' type="submit" />

            </form>
        </div>
    );
};

export default AddSell;