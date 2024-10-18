"use client";
import TopBarImage from "/public/images&icons/advertise/banner1.jpg";
import FeaturSection2 from "@/components/Front/FeaturSection2";
import AdvertiseTable from "@/components/Front/AdvertiseTable";
import Link from "next/link";
import HeroSection from "@/components/Front/HeroSection";
import PartnerSection2 from "@/components/Front/PartnerSection2";
import { useAuth } from "@/context/UserContext";
import { useState,useEffect } from "react";
import LoadingComponents from "@/components/LoadingComponents";

const Advertisepage = ({bannerContent}) => {
  
  const pagemetaData = bannerContent;
  const {metaData,loading,user} = useAuth();
  const advertiseMeta = metaData?.advertise;


  return (
    <>

{loading ?(
    <LoadingComponents />
  ):(

    <HeroSection
    bannerData={pagemetaData}
  />
  )}



      
      <div id="featurs_section" className="py-10 sm:pt-14 md:pt-8">
        <div className="overflow-hidden bg-white md:py-8 lg:py-12 px-3 xl:ps-16">
          <div className="mx-auto max-w-7xl px-4 md:px-9">
            <FeaturSection2 />
          </div>
        </div>
      </div>
      <div
        id="advertise_section"
        style={{backgroundImage:`url(images&icons/advertise/pattern.png)`,
        }}
        className="bg-bottom-left
        bg-no-repeat bg-contain"
      >
        <div className="py-5 px-8 lg:py-12 md:px-16 md:ps-16 overflow-x-auto">
          <div className="max-w-7xl lg:px-9 grid grid-cols-12 gap-5 mx-auto">
            <div className="col-span-12 xl:col-span-12">
              <div className="card ">
                <div className="card-body pb-8 md:pb-14">
                  <h2 className="mb-1 text-xl  lg:text-4xl md:text-2xl text-[#221F20] font-bold font-lato">
                    Choose Your Advertising Package:
                  </h2>
                </div>
                <div className="card-body">
                  <div className="relative overflow-x-auto overflow-y-hidden">
                    <AdvertiseTable user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ?(

          <LoadingComponents/>
              // <div className="partner_section relative isolate overflow-hidden pt-5 lg:pt-14 text-black text-center">
              //   Loading...
              // </div>
        ):(
        <PartnerSection2
          title={pagemetaData?.advertise_text}
          btnTitle="Contact Us Today"
        />
        )}
      </div>
    </>
  );
};

export default Advertisepage;
