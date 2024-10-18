"use client";
import Image from "next/image";
import { getResponse } from "@/app/lib/load-api";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import Link from "next/link";
import { getVendors } from "@/app/lib/server-api";
import LoadingComponents from "../LoadingComponents";
import { useAuth } from "@/context/UserContext";

const BannerSectionCardHome = (props) => {
  const {loading} = useAuth();
  const [vendors,setVendors] = useState(props.vendor);

console.log('BannerSectionCardHome props');
console.log( props);
  
 
  return (
  
    <div>
	
		{vendors.count > 0  ? ( <h2 className="lg:text-2xl text-xl font-bold tracking-tight  text-[#171717b] sm:mt-4 px-4 md:px-8 text-center">Featured Suppliers</h2>):''}

   
    <div className="flex items-center justify-center gap-2 md:gap-5 sm:mt-4 px-4 md:px-8 lg:my-4 my-2">
	
{loading?(
  <LoadingComponents/>
)
:(
<>
  {vendors?.data && vendors?.data.map((row, i) => {
    return (
      <div
        key={i}
        className=" lg:col-span-1  shadow-sm border border-gray-300 bg-gray-200 h-full w-1/5"
      >
        <div className="sm:mt-0 flex justify-center md:justify-end h-full items-center p-1">
          <Link href={`/vendors/`+ row.slug }>
          <Image
            src={row.image_url?row.image_url:""}
            alt={row.name?row.name:""}
            className="w-full w-auto"
            width="100"
            height="100"
          />
          </Link>
        </div>
      </div>
    );
  })}

</>
)  
}
    </div> </div>
  );
};

export default BannerSectionCardHome;
