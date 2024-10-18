"use client";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/UserContext";


const FeaturSectionWord = ({blogs}) => {
const {user,isLoding,isInfoLoding,logout}  = useAuth();


  return (
    <>
      <div id="partner_section_word" >
        <div className=" pt-0 px-6  lg:pt-10 lg:px-8">
         
              <p className="mt-3 text-lg sm:text-xl lg:text-[1.400rem] lg:leading-9 text-[#221F20] font-medium font-lato">
                   Welcome to VendorGuideOnline.com, the ultimate online search destination for apartment managers seeking top-notch vendors, suppliers, and service providers for their multi-family properties. Whether you need expert apartment painting, reliable multi-family roofing, comprehensive apartment renovation, smart tech installation, or so much more, we've got you covered. Our platform connects you with skilled professionals in over 90 categories, including those specializing in advertising and promotion, apartment turns, resident screening, property restoration, apartment cleaning, and building exteriors services, with vendors that are experienced in the nuances of working in the multi-family industry. Discover a wide array of trusted suppliers and service providers, ensuring your apartment property’s needs are met with the highest quality and efficiency. 
              </p>
             
           
        </div>
      </div>
    </>
  );
};

export default FeaturSectionWord;
