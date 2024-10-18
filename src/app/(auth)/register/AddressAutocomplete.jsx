// components/AddressAutocomplete.js
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import { useState } from "react";
import { useEffect } from 'react';

const AddressAutocomplete = ({users}) => {
    const [postalCode, setPostalCode] = useState(users?.zip_code);
    const [address, setAddress] = useState(users?.address);
    const [city, setCity] = useState(users?.city);
    const [state, setState] = useState(users?.state);
    const [country, setCountry] = useState(users?.country);
    const [latitude, setLatitude] = useState(users?.latitude);
    const [longitude, setLongitude] = useState(users?.longitude);
	const [form, setForm] = useState([]);

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
  
  
  
  const initializeAutocompleteReset=()=>{
    const address = document.getElementById('address');   
    setAddress(null);
    setCity('');
    setCountry('');
    setState('');
    setPostalCode('');
    setLatitude('');
    setLongitude('');
    console.log('address changed for new...');
    // initializeAutocomplete();
    
  }

  const initializeAutocomplete = () => {
    const address = document.getElementById('address');
    const options = {
      fields: ['place_id','address_components', 'formatted_address', 'geometry', 'name'],
	    types: ["address"],
      componentRestrictions: {country: "us"},
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
	  
      for (let i = 0; i < addressComponents.length; i++) 
	  {
	
        const addressType = addressComponents[i].types[0];

        if (componentForm[addressType]) 
		{
          const val = addressComponents[i][componentForm[addressType]];
          if (addressType === 'postal_code') 
		  {
            zipCode = val;
          }
        }

        if (addressComponents[i].types.includes('locality')) 
		{
          city = addressComponents[i].long_name;
        } else if (addressComponents[i].types.includes('administrative_area_level_1')) 
		{
          state = addressComponents[i].long_name;
        } else if (addressComponents[i].types.includes('country')) 
		{
          country = addressComponents[i].long_name;
        }
      }
                setCity(city);
                setCountry(country);
                setState(state);
                setPostalCode(zipCode);
                setLatitude(latitude);
                setLongitude(longitude);

      // Update your state or perform other actions with the obtained data
    });
  };
  
  

  
const handleFormAddress = (name, value) => {
        setForm({...form, [name]: value});
    }
  
  
  
  

  return (
    <>
	  <div className="grid grid-cols-2 gap-x-4 pb-2">
                <div className="col-span-2 my-2" >
                    <Label label="Address(Type Zip Code...)" required="required" />
                    <div className="mt-2.5">
                        <Input name="address" id="address" value={address} 
                        
                        onChange={initializeAutocompleteReset} />
                        
                    </div>
                </div>
            </div>
			
			
			<div className="grid grid-cols-2 gap-x-4 pb-2">
                <div className="col-span-2 my-2" >
                    <Label label="City" required="required" />
                    <div className="mt-2.5">
					    <Input  type="hidden" name="city" value={city}  />
                        <Input  type="text" name="cityshow" value={city} 
						         
				 onChange={e => {setCity(e.target.value)}}
                          
				       />
                    </div>
                </div>
            </div>
			
			<div className="grid grid-cols-2 gap-x-4 pb-2">
                <div className="col-span-2 my-2" >
                    <Label label="State" required="required" />
                    <div className="mt-2.5">
					  <Input  type="hidden" name="state" value={state} />

                        <Input  type="text" name="stateshow" value={state} onChange={e => {setState(e.target.value)}} />
                    </div>
                </div>
            </div>
			
         <div className="grid grid-cols-2 gap-x-4 pb-2">
                <div className="col-span-2 my-2" >
                    <Label label="Country" required="required" />
                    <div className="mt-2.5">
		        <Input  type="hidden" name="country" value={country} />  

                 <Input  type="text" name="countryshow" value={country} onChange={e => {setCountry(e.target.value)}} />  
				 </div>
                </div>
            </div>
			
			<div className="grid grid-cols-2 gap-x-4 pb-2">
                <div className="col-span-2 my-2" >
                    <Label label="Zip"  />
                    <div className="mt-2.5">
                     <Input  type="hidden" name="postal_code" value={postalCode} />
				     <Input  type="text" name="postal_codeshow" value={postalCode} onChange={e => {setPostalCode(e.target.value)}} />


				 </div>
                </div>
            </div>
    
    
    
    <Input type="hidden" name="latitude" value={latitude} />
    <Input type="hidden" name="longitude" value={longitude} />
    </>
  );
};

export default AddressAutocomplete;
