import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import vendorDefult from "@/../../public/images&icons/vendor-default.jpg"
import PropartyForm from "@/components/PropartyForm";
import VendorContactMailForm from "@/components/VendorContactMailForm";
import Modal from "@/components/Modal";
import axios from 'axios';
import { getCookie } from "cookies-next";


const DetailsRight = ({filterData,user}) => {
  const imageUrl = filterData?.image_url;
  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMail, setIsModalOpenMail] = useState(false);
  const [vendorId, setVendorId] = useState(filterData.id);
  useEffect(() => {
    const categoriesResult = async () => {
      var response2 = await fetch(`${process.env.BASE_API_URL}category`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getCookie('token')}`
        },
          
      })
  
      if (!response2.ok) {
      throw new Error('Failed to submit the data. Please try again.')
      }
      var categoryResult = await response2.json();
      setCategoryData(categoryResult)
      // console.log(vendorResult)
    }
    categoriesResult();
    
  }, [])



//openModal start
  const openModal = (id) => {
    // e.preventDefault();
    setIsModalOpen(true);
    setVendorId(id);
    // console.log(id)
  };
const closeModal = () => {
    setIsModalOpen(false);
  };
//openModal end


//openModalMail start
 const openModalMail = (id) => {
    setIsModalOpenMail(true);
    setVendorId(id);
    
  };
const closeModalMail = () => {
    setIsModalOpenMail(false);
  };
//openModalMail end




  return (
    <>
    <div className="brand-star md:col-span-1 col-span-12   order-1 sm:order-2  sm:gap-x-5 md:px-16">
    <div className=" rounded-2xl overflow-hidden  flex flex-col  bg-white">
	
      <div className="text-center pb-6">
        <div className="Search_details_img">
          <Image
            width="275"
            height="150"
            src={imageUrl ? imageUrl : vendorDefult.src}
            alt="Product screenshot"
            className={`mx-auto md:mx-0`}
          />
        </div>
        <div className="py-8  lg:py-7 gap-x-4 block text-left">
          <h3 className="text-lg font-lato font-bold   text-[#647589]">
          {filterData?.address}
          </h3>
        {(filterData?.postal_code && filterData.address) ?(
             <h3 className="text-lg font-lato font-bold text-[#647589] py-3">
                {/*{filterData.country}  */}
               {filterData.postal_code }
             </h3>
       ) : ( 
          <h3 className="text-lg font-lato font-bold text-[#647589] py-3"></h3>
          
         )} 
         {filterData?.mobile ? (
          <h3 className="text-lg font-lato font-bold   text-[#647589]">
          Phone Number : <Link href={`tel:${filterData.mobile}`} className="">{filterData.mobile}</Link>
          </h3>
         ):(
          ''
         )}
        </div>
		
		
        <div className="block text-left requestButtons">
          <Link
            href=""
            className="px-10 lg:px-4 md:px-5 py-3 text-center inline-block  rounded-md bg-[#c13e27] lg:text-lg md:text-lg text-sm tracking-wide font-semibold font-lato text-white shadow-sm hover:bg-[#783426] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20] mr-4 mb-2 "
             onClick={(e)=>{e.preventDefault(); openModal(filterData.id)}}
          >
            Request quote
          </Link>
		  
		  
		  
		   <Link
            href=""
            className="px-10 lg:px-4 md:px-5 py-3 text-center inline-block  rounded-md bg-[#c13e27] lg:text-lg md:text-lg text-sm tracking-wide font-semibold font-lato text-white shadow-sm hover:bg-[#783426] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20] mr-4 mb-2 "
             onClick={(e)=>{e.preventDefault(); openModalMail(filterData.id)}}
          >
            Contact Vendor
          </Link>
		  
		  
		  
          {filterData?.website_url && (
            <Link
              href={filterData.website_url}
              className="px-10 lg:px-4 md:px-5 py-3 text-center inline-block  rounded-md bg-[#c13e27] lg:text-lg md:text-lg text-sm tracking-wide font-semibold font-lato text-white shadow-sm hover:bg-[#783426] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20] "
              rel="nofollow"
              target="_blank"
            >
              Website
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
  
  
  <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-3xl font-medium" >Request a Quote !</h1>
        {user!=null ? (
          <PropartyForm user={user} vendor_id={vendorId} onClose={closeModal} categoryData={categoryData}   />
        ) : (
          <>
            <p className="text-xl mt-2">Kindly login or register to request a quote</p>
            <div className="flex justify-center gap-x-2 mt-10">
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href="/login" >Login</Link>
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href='/manager/register' >Register</Link>
            </div>
          </>
        )}
      </Modal>
	  
	<Modal isOpen={isModalOpenMail} onClose={closeModalMail}>
        <h1 className="text-3xl font-medium" >Contact Vendor</h1>
      <VendorContactMailForm  vendor_id={vendorId} onClose={closeModalMail}   />
      </Modal>
	  
	  
	  

    </>
  );
};

export default DetailsRight;
