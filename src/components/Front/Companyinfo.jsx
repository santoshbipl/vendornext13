import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { Label } from "reactstrap";
import { getResponse } from "@/app/lib/load-api";
import { getCookie } from "cookies-next";
import AddressAutocomplete from "./AddressAutocompleteFront";



const Companyinfo = (props) => {

  const Router = useRouter();
  const Pathname = usePathname();
  const searchParams = useSearchParams();
  const [urlString,setUrlString] = useState("");
  const [searchCategoryvalue, setSearchCategoryvalue] = useState(props.categoryInput);
  const [SearchStatevalue, setSearchStatevalue] = useState(props.stateInput);
  const [Searchkeywordvalue, setSearchkeywordvalue] = useState(props.key_word);

  
  
  
  
  const handleSearch = async (e) => {
    e.preventDefault();
	
	if (!searchCategoryvalue &&  !SearchStatevalue &&  !Searchkeywordvalue) {
      alert('Please select state or category or company name.')
      return false
    }
	
    props.setIsLoding(true);
    
    // vendorResponse()
    props.bannerResponse();
  };
  

async function onStatChange(event) {
       
        props.setStateInput(event.target.value);
		setSearchStatevalue(event.target.value);
      }


async function onCategoryChange(event) {
        
        props.setCategoryInput(event.target.value);
		setSearchCategoryvalue(event.target.value);
		
      }
	  
	async function onKeywordChange(event) {
        
        props.setsearchWord(event.target.value);
		setSearchkeywordvalue(event.target.value);
		
      }  

  return (
    <>
      <div className="search-section bg-[#f7f9f8]">
        <div className=" isolate px-6   lg:px-8">
          <div className="mx-auto max-w-2xl py-5 lg:py-12 md:pt-10  lg:pt-8">
            <div className="text-center">
              <h1 className="xl:text-5xl  lg:text-4xl text-3xl font-bold tracking-tight text-[#221F20] md:text-4xl">
                Search Results
              </h1>

              <p class="d-block lg:mt-2 mt-3 lg:text-xl text-sm leading-3 text-[#221F20] font-semibold hidden">
              {props.searchWord && (props.locality ? `${props.searchWord} near ${props.locality}` : props.searchWord)}
                
                </p>
            </div>
          </div>
        </div>
        <div className="text-sm text-center hidden">Latitude: {props.latitude}, Longitude: {props.longitude}</div>


        <div className="md:block justify-center px-10 sm:px-20 md:px-28 lg:px-8 xl:px-12 text-sm items-center">
  <div className="lg:flex xl:text-sm text-xs items-center justify-center">
   
    <div className="px-4 py-3 bg-black w-[10rem] lg:w-[290px] mx-auto lg:mx-0 mb-4 lg:mb-0 lg:mr-[30px] hidden">
      <p className="font-bold text-white text-center">Advanced Search</p>
    </div>

   
    <div className=" px-4 py-6 lg:py-3 rounded-xl lg:rounded-none justify-between">
      <form className="lg:flex justify-center items-center gap-5 text-sm lg:pr-[0.1rem] xl:pr-[1.1rem] pr-4" onSubmit={handleSearch}>
        <div className="main lg:flex lg:items-center lg:justify-center ">
        
          <div className="grid xl:grid-cols-12 lg:mx-4 items-center lg:pl-0 lg:mb-0  mb-3 company_search">
            <div className="col-span-12 lg:text-left xl:mb-0 mb-1">
              <label className="font-bold xl:text-sm lg:text-sm text-base text-[#221F20]">
                States
              </label>
            </div>
            <div className="col-span-12 mt-3">
              <select className="xl:col-span-12 w-[100%] h-[34px] border-gray-300 lg:w-[10rem]  placeholder:text-sm border-solid rounded border-[1px]  pl-2" value={props.stateInput} onChange={onStatChange}  >
                <option className="xl:col-span-12  " value="">Select State</option>
                {props?.states?.data && props.states.data.map((row,i)=>{
                  return(
                    <option key={i} value={row.id}>{row.name}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="grid xl:grid-cols-12 lg:mx-4 items-center lg:pl-0 lg:mb-0  mb-3 company_search">
            <div className="col-span-12 lg:text-left xl:mb-0 mb-1">
              <label className="font-bold xl:text-sm lg:text-sm text-base text-[#221F20]">
                Category
              </label>
            </div>
            <div className="col-span-12 mt-3">
              <select className="xl:col-span-12 w-[100%] h-[34px] border-gray-300 lg:w-[10rem]  placeholder:text-sm border-solid rounded border-[1px]  pl-2" value={props.categoryInput} onChange={onCategoryChange} >
                <option className="xl:col-span-12  " value="">Select Category</option>
                {props.categoryData && props.categoryData?.data?.map((row,i)=>{
                  return(
                    <option key={i} value={row.id}>{row.title}</option>
                  )
                })}
              </select>
            </div>
          </div>
         
          <div className="grid xl:grid-cols-12 lf:items-center lg:mb-0 mb-3 company_search">
            <div className="col-span-12 text-left xl:mb-0 mb-1">
              <label className="font-bold xl:text-sm md:text-sm text-base text-[#221F20]">
                Search Company
              </label>
            </div>
            <div className="col-span-12 mt-3">
              <input
                type="text"
                className="w-full xl:w-[10rem] focus:!outline-none focus:border-red-700 py-4    border-gray-300 lg:w-[10rem] h-[1.6rem] placeholder:text-sm border-solid rounded border-[1px]  pl-2"
                value={props.key_word}
                onChange={onKeywordChange}
              />
            </div>
          </div>

        
          <div className="grid xl:grid-cols-12 lg:pl-0 lg:mb-0 mb-5 company_search lg:pt-4 hidden">
            <div className="col-span-12 xl:mb-0 mb-1">
              <label className="font-bold xl:text-sm lg:text-sm text-base text-[#221F20]">
                Area
              </label>
            </div>
            <div className="col-span-12 mt-3 items-center">
              <AddressAutocomplete
                val={props.val}
                setGeoLatitude={props.setGeoLatitude}
                setGeoLongitude={props.setGeoLongitude}
                setStateInput={props.setStateInput}
                setPostalCode={props.setPostalCode}
                bannerResponse={props.bannerResponse}
                setLocality={props.setLocality}
              />
            </div>
          </div>
        </div>

        
        <div className="pl-4 flex items-center lg:justify-start lg:pt-[25px] justify-center">
          <div className="flex text-left justify-end gap-x-6">
            <button type="submit" className="rounded-full px-8 lg:px-5 py-1 lg:py-0.5 xl:text-sm lg:text-xs text-base border-solid border-[1px] border-black font-semibold text-black shadow-sm">Search</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>



      </div>
    </>
  );
};

export default Companyinfo;
