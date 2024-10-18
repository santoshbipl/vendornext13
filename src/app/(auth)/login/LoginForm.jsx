"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import TableCheckbox from "@/components/Front/Company/TableCheckbox"
import Link from "next/link";
import { useState } from 'react'
import Button from "@/components/Front/UI/Button";
import { useAuth } from "@/context/UserContext";
import ForgetPasswordForm from "../forget-password/ForgetPasswordForm";

const LoginForm = () => {
    const [loginData, setLoginData] = useState([]);
    const {login,isLoding} = useAuth();
    const makeRequest = (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        login(formData)
    };
    return (
        <div className="md:col-span-2 lg:col-span-1 col-span-12 lg:-mr-16 order-2 sm:order-1 ">
            <div className="login_container mx-auto overflow-hidden p-12 md:pt-12 px-12 md:px-12 xl:px-12">
                <div className="">
                    {/* <div className="absolute inset-x-0 top-[-10rem] -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">

                    </div> */}
                    <div className="login_text text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  text-left">Login</h1>

                    </div>
                    <form action="#" method="POST" id="login_form" className="mx-auto mt-6" onSubmit={makeRequest}>
                        <div className="">
                            <div className="w-full my-2 login_box" >
                                <Label label="Email" required="required" />

                                <div className="mt-2.5">
                                    <Input name="email" id="email" value={loginData.email} onChange={(e) => {
                                        var value = e.target.value;
                                        setLoginData({ ...loginData, email: value });
                                    }
                                    } />
                                </div>
                                {/* {renderFieldError('email')} */}
                            </div>
                            <div className="w-full my-2 login_box">
                                <Label label="Password" required="required" />
                                <div className="mt-2.5">
                                    <Input type="password" name="password" id="password" value={loginData.password}
                                        onChange={(e) => {
                                            var value = e.target.value;
                                            setLoginData({ ...loginData, password: value });
                                        }
                                        }
                                    />
                                </div>
                                {/* {renderFieldError('password')} */}
                            </div>
                            <div className="flex gap-2 pt-3">
                                <TableCheckbox />  <p className=" text-lg font-semibold"> Remember Me</p>
                            </div>

                            <div className="my-4 flex justify-center sm:justify-start">
                                <Button type="Submit" className="block sm:w-auto w-full rounded-md bg-[#c13e27] px-10 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" is_loding={isLoding} disabled={isLoding} />
                            </div>

                            <div className="py-2 sm:py-0">
                                <Link href="/register" className="text-[#c13e27] text-lg font-semibold">Register</Link>
								
                            </div>
                            <div>
                                <Link href="/forget-password" className="text-[#c13e27] text-lg font-semibold">Forget Password</Link>
                            </div>

                        </div>
                        {/* <div className="mt-2 mb-8" >

                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm