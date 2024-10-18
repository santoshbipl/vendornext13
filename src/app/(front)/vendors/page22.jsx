"use client";
import Input from "@/components/Front/Input"
import Label from "@/components/Front/Label"
import TopBanner from "@/components/Front/TopBanner"
import VendorCard from "@/components/Front/VendorCard"
import TopBarImage from 'public/images&icons/search_result/banner1.jpg'
import { useEffect,useState } from "react";
const Search = () =>{
    const [location, setLocation] = useState();
    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            })
        }
    }, []);

    console.log(location);

    return (
        <>
            <TopBanner title="All Vendors" image={TopBarImage.src} />
            <section className='contact_search bg-[#f7f9f8] '>
                <div className="py-20 px-10">
                    <div className="grid grid-cols-12 sm:gap-12 ">
                        <div className="col-span-12  md:col-span-8 lg:col-span-9  order-2 sm:order-1 ">
                            <div className="grid grid-cols-12 gap-6 items-center">
                                <VendorCard/>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-3 md:col-span-4  order-1 md:order-2  sm:mb-0 mb-5">
                            <div className="rounded-xl overflow-hidden shadow-lg flex flex-col  bg-white">
                                <div className=" items-center px-4 py-2 bg-[#B13634]">
                                    <p className="text-center text-white font-normal">Refine Search</p>
                                </div>
                                <div className="lg:px-4 px-3 lg:pb-3 pb-3  lg:pt-5 pt-2">
                                    <form className="">
                                        <div className="grid grid-cols-12 mb-4 items-center  ">
                                            <Label htmlFor="horizontal-company-name-input" className="col-span-12 lg:col-span-5 font-bold text-sm  text-[#221F20] dark:text-zinc-100" name="Company Name" />
                                            <div className="col-span-12 lg:col-span-7">
                                                <Input type="text" className="w-full  placeholder:text-sm border-solid  border-[1px] border-black  dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100 dark:text-zinc-100" id="horizontal-company-name-input" placeHolder="" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 mb-4 items-center  ">
                                            <Label htmlFor="horizontal-email-input" className="col-span-12 lg:col-span-4 font-bold text-sm text-[#221F20] dark:text-zinc-100" name="Category" />
                                            <div className="col-span-12 lg:col-span-8">
                                                <Input type="email" className="w-full  placeholder:text-sm border-solid  border-[1px] border-black  dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100 dark:text-zinc-100" id="horizontal-email-input" placeHolder="" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 mb-4 items-center  ">
                                            <Label htmlFor="horizontal-zip-code-input" className="col-span-12 lg:col-span-4 font-bold text-sm text-[#221F20] dark:text-zinc-100" name="Zip Code" />
                                            <div className="col-span-12 lg:col-span-8">
                                                <Input type="text" className="w-full  placeholder:text-sm border-solid  border-[1px] border-black  dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100 dark:text-zinc-100" id="horizontal-zip-code-input" placeHolder="" />
                                            </div>
                                        </div>
                                        <div className="mb-1">
                                            <Label className="block font-bold text-sm text-[#221F20] dark:text-gray-100 mb-2" htmlFor="customRange1" name="Proximity to Zip" />
                                            <Input className="w-full form-range h-px" type="range" id="customRange1" />
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="block font-bold text-sm text-[#221F20] dark:text-gray-100 mb-2">1 mile</span>
                                            <span className="block font-bold text-sm text-[#221F20] dark:text-gray-100 mb-2">15 miles</span>
                                            <span className="block font-bold text-sm text-[#221F20] dark:text-gray-100 mb-2">30 miles+</span>
                                        </div>
                                        <div className="pt-4" role="group">
                                            <div className="flex text-left justify-end gap-x-6">
                                                <a href="#" className="rounded-[0.7rem]  px-5 py-1 text-sm border-solid  border-[1px] border-black font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Search