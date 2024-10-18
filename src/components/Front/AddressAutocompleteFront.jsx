// components/AddressAutocomplete.js
import Input from "@/components/Front/UI/Input";
import { useState } from "react";
import { useEffect } from 'react';

const AddressAutocomplete = (props) => {
    const [postalCode, setPostalCode] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

  useEffect(() => {
    const gmapKey = process.env.GOOGLE_MAP_API_KEY;
    const gmapLib = 'places';

    if (typeof window !== 'undefined') {
      // Load Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${gmapKey}&libraries=${gmapLib}`;
      script.async = true;
      script.onload = () => {
        initializeAutocomplete();
      };
      document.head.appendChild(script);
    }
  }, []);

  const initializeAutocomplete = () => {
    const address = document.getElementById('address');
    const options = {
      fields: ['address_components', 'formatted_address', 'geometry', 'name'],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(address, options);

    const componentForm = {
      postal_code: 'short_name',
    };

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const formattedAddress = place.formatted_address;
      setAddress(formattedAddress);
      const addressComponents = place.address_components;
      let city, state, country, zipCode;
       var latitude = place.geometry.location.lat();
       var longitude = place.geometry.location.lng();

      for (let i = 0; i < addressComponents.length; i++) {
        const addressType = addressComponents[i].types[0];

        if (componentForm[addressType]) {
          const val = addressComponents[i][componentForm[addressType]];
          if (addressType === 'postal_code') {
            zipCode = val;
          }
        }

        if (addressComponents[i].types.includes('locality')) {
          city = addressComponents[i].long_name;
        } else if (addressComponents[i].types.includes('administrative_area_level_1')) {
          state = addressComponents[i].long_name;
        } else if (addressComponents[i].types.includes('country')) {
          country = addressComponents[i].long_name;
        }
      }

        
      props.setLocality(city);
                // setCountry(country);
                // props.setStateInput(state?state:'');

                  props.setPostalCode(zipCode? zipCode : ' ');
                
               props.setGeoLatitude(latitude);
                props.setGeoLongitude(longitude);
                
                // props.bannerResponse();

      // Update your state or perform other actions with the obtained data

    });
  };
  return (
    <>
   <div className="div">
   <Input className="w-full focus:!outline-none focus:border-red-700   py-4  border-gray-300  xl:w-[370px] lg:w-[295px] h-[1.6rem] placeholder:text-sm border-solid rounded border-[1px]  pl-2" placeholder='Start With Zip Code' name="address" id="address" 
   defaultValue={props.val} 
     />
     <p  className="text-red-300">* start with zip code</p>
   </div>
    

    <Input type="hidden" name="city" value={city} />
    <Input type="hidden" name="state" value={state} />
    <Input type="hidden" name="country" value={country} />
    <Input type="hidden" name="postal_code" value={postalCode} />
    <Input type="hidden" name="latitude" value={latitude} />
    <Input type="hidden" name="longitude" value={longitude} />
    </>
  );
};

export default AddressAutocomplete;