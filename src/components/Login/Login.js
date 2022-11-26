import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [userdb, setUserdb] = useState('')
    const [loginError, setLoginError] = useState('');
    const [createdUserEmail, setcreatedUserEmail] = useState('');
    const [loginUserEmail, setloginUserEmail] = useState('');
    // const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    // if (token) {
    //     navigate(from, { replace: true });
    // }
    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setloginUserEmail(data.email);
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err.message);
                setLoginError(err.message);
            })
    }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                userSaved(user, user.email)


                // saveUser(user.displayName, user.email)

            })
            .catch(err => console.error(err));
    }
    const userSaved = (user, email) => {
        console.log('email', email);
        fetch(`http://localhost:5000/users/socialUser/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    console.log('exist');
                }
                else {
                    saveUser(user.displayName, user.email);
                    console.log('not');
                }

            })
            .catch(err => console.log(err));
    }
    const saveUser = (name, email, role = 'Buyer') => {
        const user = { name, email, role };
        fetch('http://localhost:5000/users', {
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
                toast.success('user saved successfully');
            })
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type='text'
                            {...register("email", { required: 'email is required' })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password'
                            {...register("password", {
                                required: 'password is required',
                                minLength: { value: 6, message: 'password must be 6 charecters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    <input className='btn btn-primary w-full text-white' value='Login' type="submit" />
                    <div>
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                    </div>
                </form>
                <p>New to The Big Bookshelf? <Link className='text-primary' to='/signup'>Create a new account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;