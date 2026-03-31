import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {signIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

  const onSubmit = (data) => {
      signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully logged in.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
              });
              reset();
                navigate(from, { replace: true });
        })
        .catch(error => console.log(error));

  };
    return (
        <div>
            <div className="mt-2 text-center">
                <h2 className="text-4xl font-bold text-[#002B2B]">Welcome Back</h2>
                <p className="text-slate-500 mt-2">Login with Profast</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#002B2B]">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                        placeholder='Email'
                        className='p-3 border rounded-lg outline-none transition-all
                         border-slate-300 focus:border-trust-lime'
                    />
                    {errors.email?.type === 'required' && <span className="text-red-500 text-xs">Email is required</span>}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#002B2B]">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                        placeholder='Password'
                        className='p-3 border border-slate-300 rounded-lg outline-none transition-all
                          focus:border-trust-lime'
                    />
                    {errors.password?.type === 'required' && <span className="text-red-500 text-xs">Password is required</span>}
                    
                </div>

                <div className="text-right">
                    <button type="button" className="text-sm text-slate-400 hover:text-trust-dark underline">Forget Password?</button>
                </div>

                <button type="submit" className="w-full bg-trust-lime py-3.5 rounded-xl font-bold text-[#002B2B] hover:bg-[#cde360] transition-colors">
                    Login
                </button>
            </form>

            <div className="mt-4 text-center space-y-2">
                <p className="text-sm text-slate-500">
                    Don't have any account? 
                    <Link to="/register" className="text-[#A3B83F] font-bold hover:underline"> Register</Link>
                </p>
                <div className="flex items-center gap-2 text-slate-300">
                    <hr className="flex-1" /> <span className="text-xs text-slate-400">Or</span> <hr className="flex-1" />
                </div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;