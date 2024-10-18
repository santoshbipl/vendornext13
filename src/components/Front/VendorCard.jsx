import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/components/Modal";
import PropartyForm from "@/components/PropartyForm";
import vendorDefult from "@/../../public/images&icons/vendor-default.jpg";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import Companyinfo from "./Companyinfo";
import { useAuth } from "@/context/UserContext";
import PaginationCustum from "../Common/Paginations";
import LoadingComponents from "../LoadingComponents";


const VendorCard = (props) => {
  const { user, renderFieldError, isLoding } = useAuth();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [vendorData, setVendorData] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [geoLatitude, setGeoLatitude] = useState(props.lat);
  const [geoLongitude, setGeoLongitude] = useState(props.long);
  const [postalCode, setPostalCode] = useState(`${props.postalCode}`);
  const [categoryData, setCategoryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const startIndex = (currentPage - 1) * pageSize;
  const [vendorId, setVendorId] = useState(0);

  // const endIndex = Math.min(startIndex + pageSize, vendorData?.length || 0);
  // const itemsToDisplay = vendorData?.slice(startIndex, endIndex) || [];

  // console.log('itemsToDisplay', itemsToDisplay);

  const [categoryInput, setCategoryInput] = useState(
    searchParams.get("category") || ""
  );
  const [stateInput, setStateInput] = useState(searchParams.get("state") || "");
  const [key_word, setsearchWord] = useState(searchParams.get("key_word") || "");


  const params = new URLSearchParams();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const handlePageChange = (pageNumber) => {
    setIsFetchingData(true);
    setCurrentPage(pageNumber);
    bannerResponse(pageNumber);
  };




  const openModal = (id) => {
    setIsModalOpen(true);
    setVendorId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function bannerResponse(page = 1) {

  //console.log('Now search data loading.....');
  //console.log(categoryInput+'category id.....');
  //console.log(stateInput+'stateInput id.....');
    setIsLoding(true);
    const params = new URLSearchParams();
    const offset = (page - 1) * pageSize;
    console.log('offset', offset);
    params.set("limit", pageSize);
    params.set("page", offset);
    params.set("latitude", geoLatitude);
    params.set("longitude", geoLongitude);
    params.set("zip_code", postalCode);
    params.set("category_id", categoryInput);
    params.set("state_id", stateInput);
    params.set("key_word", key_word);
    params.set("search", key_word);
    

    if (key_word) 
    {
      //params.set("key_word", key_word);
    } 
    else 
    {
      //params.delete("key_word");
    }

    const urlString = params.toString();
    try {
      const response = await fetch(`${process.env.BASE_API_URL}vendor?${urlString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (!response.ok) {
        setIsLoding(false);
        throw new Error("Failed to submit the data. Please try again.");
      }

      const vendorResult = await response.json();
	  
	  console.log('Vendor Data...');
	  console.log(vendorResult.data);
	  console.log('Vendor Data End...');

      setVendorData(vendorResult.data);
      setIsLoding(false);
      setTotalPage(Math.ceil(vendorResult.Count / pageSize));

    } catch (error) {
      setIsLoding(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsFetchingData(false);
    }
    // console.log('count=', vendorResult.Count)
    // console.log('setTotalPage=', totalPage)
    // console.log('vendorResult=', vendorResult)

  }

  useEffect(() => {
    const categoriesResult = async () => {
      const response2 = await fetch(`${process.env.BASE_API_URL}category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (!response2.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      const categoryResult = await response2.json();
      setCategoryData(categoryResult);
    };
    categoriesResult();
    bannerResponse();
  }, []);

  useEffect(() => {
    const statesResult = async () => {
      const response3 = await fetch(`${process.env.BASE_API_URL}state`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (!response3.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      const stateResult = await response3.json();
      setStateData(stateResult.data);
    };
    statesResult();
    bannerResponse();
  }, []);

  return (
    <>
      <Companyinfo 
        val={props.val}
        search={key_word}
        key_word={key_word}
       setsearchWord={setsearchWord}
        setIsLoding={setIsLoding}
        setVendorData={setVendorData}
        latitude={geoLatitude}
        longitude={geoLongitude}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        locality={props.locality}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        categoryInput={categoryInput}
        setCategoryInput={setCategoryInput}
        bannerResponse={bannerResponse}
        stateData={stateData}
        setStateData={setStateData}
        stateInput={stateInput}
        setStateInput={setStateInput}
        setGeoLatitude={setGeoLatitude}
        setGeoLongitude={setGeoLongitude}
        setLocality={props.setLocality}
        states={props.states}
      />

      <div className="contact_search bg-[#f7f9f8]">
        <div className="py-20 pt-8 px-10 md:px-10">
          <div className="grid grid-cols-12 md:gap-12">
            <div className="col-span-12  md:col-span-12 lg:col-span-12  order-2 sm:order-1">
              {isLoading || isFetchingData ? (
                <div className="loading-screen text-center">
                  <p className="text-[#221F20] font-bold text-md">
                    {/* Please wait, we are finding the best Vendors for your project. */}
                    {/* <Loader /> */}
                    <LoadingComponents />
                  </p>
                </div>
              ) : vendorData.length === 0 ? (
                <DataNotFound />
              ) : (
                <>

                  <div className="grid_system grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-5 gap-6  xl:gap-8 items-center"> 
                    {vendorData.length > 0 &&
                      vendorData.map((row, index) => (
					  
                        <div className="h-full " key={index}>
                          <div className="card mb-0 bg-white px-3 shadow h-full relative">
                            <div className="card-body">
                              <div className="text-center">
                                <div className="w-36 h-28 pt-2 mx-auto flex justify-center">

                                  <div className="vendore-image-logo object-cover">
                                    <Link href={`/vendors/` + row.slug} className="flex justify-center items-center h-full">

                                      <Image
                                        width="100"
                                        height="100"
                                        className={`${vendorDefult.src ? 'w-full object-contain ' : 'w-full object-contain'} h-full`}
                                        src={row.image_url ? row.image_url : vendorDefult.src}
                                        alt={row.name}
                                      />

                                    </Link>
                                  </div>

                                </div>
                                <Link href={`/vendors/` + row.slug} className="">
                                  <h3 className="text-[#B13634] font-bold whitespace-nowrap text-16  mb-1 text-ellipsis overflow-hidden">
                                    {row.name}
                                  </h3>
                                </Link>
                                {/* {row.distanceMile  && ( 
                            <h3 className="text-black font-semibold text-xs">Distance: {row.distanceMile.toFixed(2)} mile</h3>
                            )} */}

                                {/* {row.level?.title  && ( 
                            <span class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 mt-3">{row.level?.title}</span>
                            )} */}

                                {row.mobile ? (
                                  <p className="text-black font-bold my-2">{row.mobile}</p>
                                ) : (
                                  <p className="text-black font-bold my-2" style={{ height: "1.5rem" }}></p>
                                )}

                                {row.city ? (
                                  <p className="text-black font-bold my-2 text-green-700 vendorstatecity">{row.city}</p>
                                ) : (
                                  <p className="my-2" style={{ height: "1.3rem" }}></p>
                                )}
                                {row.level==1 &&  row.description ? (
                                  <p className="text-gray-400 font-normal text-sm whitespace-wrap  overflow-ellipsis line-clamp-3 vendorstatedesc" dangerouslySetInnerHTML={{ __html: row.description }} />
                                ) : (
                                  // Apply styles for when short_description is not accessible
                                  <div style={{ height: "3.9rem" }}></div>
                                )}

                                {/* start */}
                              </div>

                              <div

                                className="py-10"

                                role="group"

                              >

                                <div className="flex items-center justify-center xl:gap-x-4 gap-x-6  md:text-center">

                                  <div>

                                    <Link

                                      href={`/vendors/` + row.slug}

                                      className="rounded-[0.7rem] md:inline-block px-3.5 py-1 2xl:text-sm xl:text-[0.66rem] text-sm border-solid border-[1px] border-black font-extrabold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                    >

                                      Learn More

                                    </Link>

                                  </div>

                                  <div className="">

                                    <Link

                                      href=""

                                      className="rounded-[0.7rem] md:inline-block px-3.5 py-1 2xl:text-sm xl:text-[0.66rem] text-sm border-solid border-[1px] border-black font-extrabold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                      onClick={(e) => { e.preventDefault(); openModal(row.id) }}

                                    >

                                      Request Quote

                                    </Link>
                                    {/* end */}

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>




                      ))}
                  </div>
                </>
              )}
              {totalPage > 1 && (
                <PaginationCustum
                  total={totalPage}
                  current={currentPage}
                  onChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-3xl font-medium" >Request a Quote !</h1>
        {user != null ? (
          <PropartyForm user={user} vendor_id={vendorId} onClose={closeModal} categoryData={categoryData} stateData={stateData} />
        ) : (
          <>
            <p className="text-xl mt-2">Kindly login or register to request a quote</p>
            <div className="flex justify-center gap-x-2 mt-10">
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href="/login" >Login</Link>
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href='/register' >Register</Link>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default VendorCard;

export const DataNotFound = () => {
  return (
    <>
      <div className="h-full">
        <div className="w-100  pt-2 mx-auto text-center text-sm text-[#221F20]">
          <h1 className="text-lg font-medium">Sorry, we could not find any vendors that matched your criteria.</h1>
          <p className="text-base ">Try a different search
            {/* or view all our vendors */}
          </p>
        </div>
      </div>
    </>
  );
};




export const Loader = () => {
  return (
    <div className='wrapper'>
      <div className='loader'>

      </div>
    </div>
  );
}
