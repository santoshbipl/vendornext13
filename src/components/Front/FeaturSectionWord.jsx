"use client";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/UserContext";


const FeaturSectionWord = ({blogs,homeBannerText}) => {
const {user,isLoding,isInfoLoding,logout}  = useAuth();

console.log('homeBannerText');
console.log(homeBannerText);



  return (
    <>
      <div id="partner_section_word" >
        <div className=" pt-0 px-6  lg:pt-10 lg:px-8">
         
          {homeBannerText.description && 
	
          <div class="mt-3 text-lg sm:text-xl lg:text-[1.400rem] lg:leading-9 text-[#221F20] font-medium font-lato"   dangerouslySetInnerHTML={{ __html: homeBannerText?.description }}></div>
            
          }
             
           
        </div>
      </div>
    </>
  );
};

export default FeaturSectionWord;
