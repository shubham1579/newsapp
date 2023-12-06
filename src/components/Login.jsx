import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../firestore";
import { useAuth } from "../context/authContext";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";


export default function Login(){

    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "all"});
    const { setUserName, setIsAuthenticated, setUserId, loggedIn, setLoggedIn, userId } = useAuth();

    const onSubmit = (data) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
            setUserName(res.user.displayName);
            toast('Login Successfull');
            setUserId(res.user.uid);
            setIsAuthenticated(true);
            setLoggedIn(true);
        })
        .catch((err) => {
            console.log(err.message);
            toast(err.message);
        })
        reset();
        
    }


    return (
        <>
            {loggedIn && <Navigate to={`/${userId}`} replace={true} />}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                                    placeholder="Enter Your email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="text-sm text-red-600">{errors.email?.message}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `- at least 8 characters\n
                                                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                                - Can contain special characters`
                                        },
                                    })}
                                    type="password"
                                    placeholder="Enter password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Create New Account
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>
    )

}