"use client";
import BannerSectionCard from "./BannerSectionCard";

import Image from "next/image";
import { getResponse } from "@/app/lib/load-api";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import Link from "next/link";
import { getVendors } from "@/app/lib/server-api";
import LoadingComponents from "../LoadingComponents";
import { useAuth } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";






const SignUpcard = () => {
	
	
const {loading} = useAuth();
const [vendorsFeatures,setVendors] = useState({});
const [latitude,setLatitude] = useState(0);
const [featuredvendorcount,setFeaturedvendorcount] = useState(0);
const [longitude,setLongitude] = useState(0);
const [error, setError] = useState(null);
const searchParams = useSearchParams();
const stateval = searchParams.get('state')?searchParams.get('state'):"";
const [state_id,setState] = useState(stateval);

 
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
	setLongitude(longitude);
	getFeaturedVendor(latitude,longitude);
	return;
  };

  const handleError = (error) => {
	setError(error.message);
	getFeaturedVendor(0,0);
	return;
  };
  
const handleoptions = {
	enableHighAccuracy: false,//if true for accuracy then slower
	timeout: 10000,
	maximumAge: 0,
	};

async function getFeaturedVendor(latitude,longitude) {

   

       var res = await getVendors({ latitude, longitude,state_id });
	   setFeaturedvendorcount(res.count);
       setVendors(res);
	   return;
    }
  
  
  
  
  
  
  useEffect(() => {
    if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
	  	console.log('Geolocation Geolocation Geolocation:'+error);
		getFeaturedVendor(0,0);
        return;
    }
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError,handleoptions);
	
	
  }, []);
  
  
  
  
   
	 console.log('Sign up Featured  count start');
   console.log(featuredvendorcount);
	 console.log('Sign up count end ');
   
   
	
	
	
	
	

  return (
  <>
  {featuredvendorcount && featuredvendorcount > 0 
  ?
  (
      <div className="image_grid  absolute z-40 left-0 right-0 top-[2rem] md:top-[3rem] lg:top-[4rem] xl:top-[5rem]  2xl:top-[3rem] md:px-16 lg:px-16 xl:px-24 px-5 ">
        <div className="">
          <div className="rounded-xl overflow-hidden shadow-xl  flex flex-col  bg-white">
            <div className="flex items-center p-3 bg-[#B13634]"></div>
            <div className="text-center py-3 sm:py-3 md:py-4 lg:py-6">
              <h2 className="lg:text-2xl text-xl font-bold tracking-tight  text-[#171717b] ">
                Featured Suppliers
              </h2>
            </div>
              
			   <BannerSectionCard vendors={vendorsFeatures} />
			  
          </div>
        </div>
      </div>
    )
	:
	''}
	</>
  );
};

export default SignUpcard;
