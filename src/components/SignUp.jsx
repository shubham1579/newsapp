import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firestore";
import { useAuth } from "../context/authContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


export default function SignUp(){

    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "all"});
    const { setUserName, setIsAuthenticated, setUserId } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (res) => {
            const user = res.user;
            toast('Sign Up successful');
            await updateProfile(user, {
                displayName: data.name
            });
            setUserName(user.displayName);
            setUserId(user.uid);
            setIsAuthenticated(true);
            navigate('/');
            // setLoggedIn(true);
        })
        .catch((err) => {
            console.log(err.message);
            toast(err.message);
        })
        reset();

    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a New Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                                    
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                    type="text"
                                    placeholder="Enter your name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="text-sm text-red-600">{errors.name?.message}</p>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                            message: 'Email is not valid'
                                        },
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <p className="text-sm text-red-600">{errors.email?.message}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `at least 8 characters | must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number | Can contain special characters`
                                        },
                                    })}
                                    type="password"
                                    placeholder="Enter password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="text-sm text-red-600">{errors.password?.message}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-md font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `at least 8 characters | must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number | Can contain special characters`
                                        },
                                    })}
                                    type="password"
                                    placeholder="Enter password again"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="text-sm text-red-600">{errors.confirmPassword?.message}</p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>
    )

}