"use client";
import React, {useState} from "react";
import {useForm} from "@/hooks/useForm";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setErrors, renderFieldError, navigate } = useForm();

    const makeRequest = (e) => {
        e.preventDefault();
        setErrors(null);
        axios.post(process.env.BASE_API_URL+'manager/login', {
            email,
            password
        }).then(response => {
            console.log(response.data.success);
            if(response.data.success==true) {
                // alert("Register success");
                navigate.push('/')
            }
        }).catch(error => {
            // console.log(error.response.data.data);
            if(error.response.data.data.errors) {
                if (error.response.data.data.errors) {
                    setErrors(error.response.data.data.errors);
                    
                }
            }
        });
    };

    return (
        <>

        <div className="md:col-span-1 col-span-12 lg:-mr-16 order-2 sm:order-1 ">
            <div className="container mx-auto overflow-hidden p-12 md:pt-12 px-12 md:px-12 xl:px-12">
                <div className="">
                    <div className="absolute inset-x-0 top-[-10rem] -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">

                    </div>
                    <div className=" text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  text-left">Login</h2>

                    </div>
                    <form method="POST" className="mx-auto mt-6" onSubmit={makeRequest}>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-lg font-semibold leading-6 text-[#3B3C40]">Email <span className="text-[#c13e27] text-sm font-normal italic ">*</span></label>
                                <div className="mt-2.5">
                                    <input type="email" name="email" id="email"  className="block bg-[#e3e3e3cc] w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" value={email} onChange={e => setEmail(e.target.value)}  />
                                    {renderFieldError('email')}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="password" className="block text-lg font-semibold leading-6 text-[#3B3C40]">Password <span className="text-[#c13e27] text-sm font-normal italic ">*</span></label>
                                <div className="mt-2.5">
                                    <input type="password" name="password" id="password" className="block bg-[#e3e3e3cc] w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" value={password} onChange={e => setPassword(e.target.value)}  />
                                    {renderFieldError('password')}
                                </div>
                            </div>
                            <div className="my-2">
                                <button type="submit" className="block  rounded-md bg-[#c13e27] px-10 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                            </div>

                        </div>
                        <div className="mt-2 mb-8" >
                            <p className='text-lg font-normal'>Already registered? <span className="text-[#c13e27] font-normal">Sign Up</span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default LoginForm