import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [role, setRole] = useState('Buyer');
    const [createdUserEmail, setcreatedUserEmail] = useState('');
    const handleRoleSelect = event => {
        event.preventDefault();
        const currentRole = event.target.value;
        if (currentRole === '') {
            setRole('Buyer');
        }
        else {
            setRole(currentRole);
        }
        console.log(role);

    }
    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    // if (token) {
    //     navigate('/');
    // }
    const handleSignUp = (data) => {
        console.log('clicked', data);
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                const currentUser = {
                    email: user.email
                }
                //get jwt token
                fetch('https://sadika-assignment12-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data', data);
                        localStorage.setItem('booksToken', data.token);
                        //navigate(from, { replace: true });
                    })
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role);
                        alert('user created successfully');

                    })
                    .catch(err => console.error(err))
            })
            .catch(error => {
                console.error(error);
                setSignUpError(error.message)
            })



    }
    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('https://sadika-assignment12-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('saveuser', data);
                setcreatedUserEmail(email);
            })
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up <select onChange={handleRoleSelect} className="select select-bordered max-w-xs">
                    <option defaultValue='Byuer'>Buyer</option>
                    <option defaultValue='Seller'>Seller</option>
                </select></h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type='text'
                            {...register('name', {
                                required: 'name is required'
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type='text'
                            {...register('email', {
                                required: 'email is required'
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <input type='text'
                            {...register('role', {

                            })}
                            className="input input-bordered w-full max-w-xs"

                            defaultValue={role}
                            readOnly
                        />

                        {/* {errors.email && <p className='text-red-600'>{errors.email?.message}</p>} */}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password'
                            {...register('password', {
                                required: 'password is required',
                                minLength: { value: 6, message: 'password must ber 6 charecter or more' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password must have uppercase, number and special charecters' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-primary w-full text-white mt-6' value='Sign Up' type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account? <Link className='text-primary' to='/login'>Please login</Link></p>
            </div>
        </div >
    );
};

export default SignUp;