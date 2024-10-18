'use client';
import Image from "next/image";
import { getResponse } from "@/app/lib/load-api";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";

const BannerSectionCard = () => {
  const [vendorData, setVendorData] = useState();
  const [isLoading, setIsLoding] = useState(true);
  useEffect(() => {
    bannerResponse();
  }, [])
  const bannerResponse = async () => {
    const vendorResult = await getResponse('vendor-advertisement?limit=5&offset=0')
    setVendorData(vendorResult.data)
    setIsLoding(false)
  }
  if (isLoading) return <LoadingScreen/>
  return (
      <div className="grid grid-cols-5 items-center justify-center gap-3  lg:gap-5 xl:gap-4 md:gap-4 sm:mt-0 md:mt-0 px-2 sm:px-8 lg:px-12 pb-5 md:pb-10">
      {vendorData && vendorData.map((row, i) => {
        return (
          <div key={i} className="col-span-4 sm:col-span-2 lg:col-span-1  shadow-2xl h-full" >
            <div className="sm:mt-0 flex justify-center md:justify-end h-full items-center">
              <Image
                src={row?.image_url}
                alt={row?.name}
                className="w-full w-auto"
                width="100"
                height="100"
              />
            </div>
          </div>
        );
      })}
      </div>
  );
};

export default BannerSectionCard;
