import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {createUser, logOut} = useAuth();
    const navigate = useNavigate();

  const onSubmit = (data) => {
     createUser(data.email, data.password)
     .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
            title: 'Success!',
            text: 'Your account has been created.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          reset();
            logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => console.log(error));
     })
     .catch(error => console.log(error));
  };
    return (
        <div>
            <div className="mt-2 text-center">
                <h2 className="text-4xl font-bold text-[#002B2B]">Create an Account</h2>
                <p className="text-slate-500 mt-2">Register with Profast</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#002B2B]">Name</label>
                    <input
                        type="text"
                        {...register("name", {
                            required: true,
                        })}
                        placeholder='Name'
                        className='p-3 border rounded-lg outline-none transition-all
                         border-slate-300 focus:border-trust-lime'
                    />
                    {errors.name?.type === 'required' && <span className="text-red-500 text-xs">Name is required</span>}
                </div>

                

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
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Password must be less than 20 characters"
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/,
                                message: "Password must include at least one uppercase letter, one special character, and one number"
                            }
                        })}
                        placeholder='Password'
                        className='p-3 border rounded-lg outline-none transition-all
                         border-slate-300 focus:border-trust-lime'
                    />
                    {errors.password?.type === 'required' && <span className="text-red-500 text-xs">Password is required</span>}
                    {errors.password?.type === 'minLength' && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    {errors.password?.type === 'maxLength' && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    {errors.password?.type === 'pattern' && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>

                

                <button type="submit" className="w-full bg-trust-lime py-3.5 rounded-xl font-bold text-[#002B2B] hover:bg-[#cde360] transition-colors">
                    Register
                </button>
            </form>

            <div className="mt-4 text-center space-y-2">
                <p className="text-sm text-slate-500">
                    Already have an account?
                    <Link to="/login" className="text-[#A3B83F] font-bold hover:underline"> Login</Link>
                </p>
                <div className="flex items-center gap-2 text-slate-300">
                    <hr className="flex-1" /> <span className="text-xs text-slate-400">Or</span> <hr className="flex-1" />
                </div>
                <button className="w-full flex items-center justify-center gap-2 border bg-slate-200 border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-all">
                    <FcGoogle className="text-xl" />
                    <span className="text-sm font-medium text-slate-600">Register with google</span>
                </button>
            </div>
        </div>
    );
};

export default Register;