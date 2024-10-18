'use client';

import Link from "next/link";
import Image from "next/image";
import flogo from "@/../../public/images&icons/SVG/logo_white.svg";
import starImg from "@/../../public/images&icons/SVG/star.svg";
import { useAuth,useState } from "@/context/UserContext";
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Footer = ({sitesetting,nationalads}) => {

console.log('start nationalads');
console.log(nationalads);
console.log('end nationalads');
  
  return (
    <>
	
	<Carousel  showIndicators={false} showThumbs={true} autoPlay={true} infiniteLoop={true} interval={3000} stopOnHover={true}>
       {nationalads.map((row, i) => (
      <div className="bottomAd"  key={i}>
      
	   
        <Image
          src={row.ads_image}
          className="w-full  h-[100%] xl:h-[100%] object-fill"
          alt="Vendor Guide Logo"
          width="1400"
          height="200"
        />
      </div>
    
))}
    </Carousel>
	
	
	

    	
			
      <footer
        className="bg-[#171717] text-white bottom-0 left-0 flex flex-col w-full gap-4  md:gap-8"
      >
        <div className="px-4 lg:px-12 lg:py-5 py-7">
          <div className="footer_content flex items-center gap-3 md:gap-7 justify-between md:flex-row md:mb-0 mb-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center md:ps-8 sm:ps-7"
              >
                <Image
                  width="100"
                  height="100"
                  src={sitesetting?.sidefooterlogo_url?sitesetting?.sidefooterlogo_url:flogo}
                  className="mr-3 h-6 sm:h-8 lg:h-9 w-auto"
                  id="Vendor_Guide_Logo2"
                  alt="Vendor Guide"
                />
              </Link>
            </div>
            <div className="subscribe_input flex flex-col gap-4 xsm:flex-row md:p-0 relative float-label-input md:me-8 sm:my-0">
             
              <Link target="_blank" href="https://api.leadconnectorhq.com/widget/form/dFm4D77pcQYxlnCQBqIT">
              <label
                htmlFor="name"
                className="bg-white rounded px-2 sm:px-2 py-2 lg:py-3 text-[#171717] pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-gray-darker font-semibold lg:text-xl sm:text-lg text-sm">
                Subscribe to Our Newsletter</label></Link>
			  
            </div>
          </div>
          <div className="footer_grid grid gap-2.5 grid-cols-1 sm:justify-items-center sm:grid-cols-2 md:grid-cols-4 px-20  md:mr-20 md:ml-20 lg:mr-48 lg:ml-36 px-7 md:px-0 md:pt-5 lg:pt-10">
            <div className="flex flex-col">
              <h4 className="text-white pb-2 sm:pb-4">Advertise</h4>
              <ul className="flex flex-col nav_list text-sm pl-10 sm:pl-0">
                <li className="py-1">
                  <FontAwesomeIcon icon={faPhoneVolume} className="pr-2" />
                  <Link href={`tel:${sitesetting?.side_phone}`} >{sitesetting?.side_phone}</Link>
                </li>
                <li className="flex items-center py-1">
                  {/* <FontAwesomeIcon icon={faEnvelope} className="pr-2" /> */}
                  <FontAwesomeIcon icon={faEnvelope} className="pr-2" />
                  <Link href={`mailto:${sitesetting?.side_email}`} >{sitesetting?.side_email}</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h4 className="text-white pb-2 sm:pb-4">Explore</h4>
              <ul className="flex flex-col nav_list text-sm pl-10 sm:pl-0">
                <li>
                  <Link href="/advertise" >
                    Advertise{" "}
                  </Link></li>
                <li>
                  <Link href="/blog" >
                    Blog{" "}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h4 className="text-white pb-2 sm:pb-4">Visit</h4>
              <ul className="flex flex-col nav_list text-sm pl-10 sm:pl-0">
                <li className="flex py-1">
                <FontAwesomeIcon icon={faLocationDot} className="pr-2"/>
                  <Link href="//g.page/planet-media-wayzata?share" rel="nofollow" target="_blank">{sitesetting?.side_address}</Link></li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h4 className="text-white pb-2 sm:pb-4">Follow</h4>
              <ul className="flex nav_list text-sm pl-10 sm:pl-0">
               {sitesetting?.side_facebook_url && (
                <li>
                  <Link href={sitesetting?.side_facebook_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                    <FontAwesomeIcon icon={faFacebook} className="pr-2" />
                  </Link>
                  </li>
                )}
                {sitesetting?.side_lingding_url && (
               <li>
                  <Link href={sitesetting?.side_lingding_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                    <FontAwesomeIcon icon={faLinkedin} className="pr-2" />
                  </Link>
                </li>
               )}
               {sitesetting?.side_instagram_url && (
                <li>
                  <Link href={sitesetting?.side_instagram_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                    <FontAwesomeIcon icon={faInstagram} className="pr-2" />
                  </Link>
                </li>
               )}
               {sitesetting?.side_twitter_url && (
                  <li>
                    <Link href={sitesetting?.side_twitter_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                      <FontAwesomeIcon icon={faTwitter} className="pr-2" />
                    </Link>
                  </li>
               )}
              </ul>
            </div>
          </div>
        </div>
 

        <div className="copy_right bg-[#ffffff] flex  items-center justify-center md:flex-row md:justify-center py-4">
          <span className="text-black font-bold text-xs">{sitesetting?.powered_by}</span>
          {sitesetting?.footerlogo_url && (
          <Image
            width="100"
            height="100"
            src={sitesetting?.footerlogo_url}
            className="mr-3 h-16 w-16 sm:h-16"
            alt="Star"
          />)}
        </div>
       
      </footer>

    </>
  );
};

export default Footer;
