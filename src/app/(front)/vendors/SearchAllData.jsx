"use client";

import VendorCard from "@/components/Front/VendorCard";
import { useAuth } from "@/context/UserContext";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

const SearchAllData = ({states}) => {
  const {user}  = useAuth();
  const [geoLatitude, setGeoLatitude] = useState(0);
  const [geoLongitude, setGeoLongitude] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [locality, setLocality] = useState("");
  const [isLoading, setIsLoding] = useState(true);
  const [defaultinputvalue, setDefaultinputvalue] = useState();

  const searchParams = useSearchParams()
  const search = searchParams.get('key_word')?searchParams.get('key_word'):""

  useEffect(() => {
    if(!getCookie('token')){
      if (typeof window !== 'undefined') {
        if('geolocation' in navigator) {
          // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            // return coords;
              const { latitude, longitude } = coords;
              
              setGeoLatitude(latitude);
              setGeoLongitude(longitude);
              
              
          })
        }
      }
      const getLocationByFormatedAddress = async () => {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoLatitude},${geoLongitude}&result_type=postal_code&key=${process.env.GOOGLE_MAP_API_KEY}`,{
          method: 'GET',
        })

        if (res.status === 429) {
            // Handle rate limit exceeded, maybe implement retry logic
            console.warn('Rate limit exceeded. Retry after some time.');
            return null; // or throw an error
        }
        if (!res.ok) {
            throw new Error(`API request failed with status: ${res.status}`);
        }
        
        var resLoc = await res.json();
    
        // Check if the response contains results
        if (resLoc.results && resLoc.results.length > 0) {
          // Loop through address components to find postal code
          const addressComponents = resLoc.results[0].address_components;

          setDefaultinputvalue((addressComponents)? `${addressComponents[1].long_name}, ${addressComponents[2].long_name} ${addressComponents[0].long_name}, ${addressComponents[3].long_name}`:'')
          var postalCode2;
          let state;
          for (const component of addressComponents) {
            // Check if the component has "postal_code" in its types
            if (component.types.includes('postal_code')) {
              postalCode2 = component.short_name;
              
              //break; // Stop the loop once postal code is found
            }
            if (component.types.includes('locality')) {
              state = component.long_name;
              
              //break; // Stop the loop once postal code is found
            }
            if(postalCode2 && state){
              break;
            }
          }

          
          setLocality(state);
          setIsLoding(false);
          setPostalCode(postalCode2);
        }else{
          setIsLoding(false);
        } 
      };

      getLocationByFormatedAddress();
    }else if(user!=null){
        setGeoLatitude(user?.latitude);
        setGeoLongitude(user?.longitude); 
        setPostalCode(user?.postal_code);
        setLocality(user?.city);
        setIsLoding(false);
        
    }
  },[geoLatitude,user]);


  
  return (
    <>
      {(isLoading) ? 
      <>
      <div className="search-section bg-[#f7f9f8]">
      <div className=" isolate px-6   lg:px-8">
        <div className="mx-auto max-w-2xl py-5 lg:py-12 md:pt-10  lg:pt-8">
          <div className="text-center">
            <h1 className="xl:text-5xl  lg:text-4xl text-3xl font-bold tracking-tight text-[#221F20] md:text-4xl">
              Search Results
            </h1>
            <p className="lg:mt-2 mt-3 lg:text-xl text-sm leading-3 text-[#221F20] font-semibold">
              { (locality) ? `${search} in ${locality}` : "" }
            </p>
          </div>
        </div>
      </div>
      </div>
      <div className="contact_search bg-[#f7f9f8]">
        <div className="py-20 pt-8 px-10 md:px-10">
          <div className="grid grid-cols-12 md:gap-12">
            <div className="col-span-12  md:col-span-12 lg:col-span-12  order-2 sm:order-1">
              <div className="loading-screen text-center">
                <p className="text-[#221F20] font-bold text-md">Please wait, we are finding the best Vendors for your project.</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      </>
      :<VendorCard val={defaultinputvalue} lat={geoLatitude} 
      long={geoLongitude} postalCode={postalCode} 
      setPostalCode={setPostalCode} 
      locality={locality} setLocality={setLocality} states={states} />
      }
      
    </>
  );
};

export default SearchAllData;
