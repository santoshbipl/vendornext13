"use client";
import Modal from "@/components/Modal";
import { useAuth } from "@/context/UserContext";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddForm from "./AddForm";
import PropertieAllData from "./PropertieAllData";

const Propertypage = () => {
  const {user}  = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [propertieData, setPropertieData] = useState([]);
  const [regionalManagerData, setRegionalManagerData] = useState([]);
  const [propertyManagerData, setPropertyManagerData] = useState([]);
  const [leasingManagerData, setLeasingManagerData] = useState([]);
  const [propertyManagementCompanyData, setPropertyManagementCompanyData] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  
  useEffect(() => {
    if(!getCookie('token')){
      router.push('/');
    }

    const propertyType = async () => {
      try {
          const type = 0;
          const response = await fetch(`${process.env.BASE_API_URL}property-type`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				'token': `${getCookie('token')}`
            }
          })
          if (!response.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.title
          }));
          setPropertyTypeData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }

    propertyType();
    
    const regionalManager = async () => {
      try {
          const type = 0;
          const response = await fetch(`${process.env.BASE_API_URL}manager?type=${type}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				'token': `${getCookie('token')}`
            }
          })
          if (!response.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
          setRegionalManagerData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }
    
    const propertyManager = async () => {
      try {
          const type1 = 1;
          const response1 = await fetch(`${process.env.BASE_API_URL}manager?type=${type1}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				'token': `${getCookie('token')}`
            }
          })
          if (!response1.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response1.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
          setPropertyManagerData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }
    
    const leasingManager = async () => {
      try {
          const type2 = 2;
          const response2 = await fetch(`${process.env.BASE_API_URL}manager?type=${type2}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				'token': `${getCookie('token')}`
            }
          })
          if (!response2.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response2.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
          setLeasingManagerData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }
    
    const propertyManagementCompany = async () => {
      try {
          const type3 = 3;
          const response3 = await fetch(`${process.env.BASE_API_URL}manager?type=${type3}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				'token': `${getCookie('token')}`
            }
          })
          if (!response3.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response3.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
          setPropertyManagementCompanyData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }

    regionalManager();
    propertyManager();
    leasingManager();
    propertyManagementCompany();

    const allResult = async () => {
      try {
        var response2 = await fetch(`${process.env.BASE_API_URL}property`,{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`,
			  'token': `${getCookie('token')}`
          },
        })
        if (!response2.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
        
        // Handle response if necessary
        var dataProp = await response2.json()
        var newData = dataProp.data;
        const updatedRows = newData.map(item => ({
          'property_name':item.property_name,
          'property_type':item?.property_types?.title,
          'id':item.id,
        }));
        setPropertieData(updatedRows);
        // console.error(requestsQuotes)
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
      }
    }
    allResult();

    const statesResult = async () => {
        var response2 = await fetch(`${process.env.BASE_API_URL}vendor-state-list`,{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`,
			  'token': `${getCookie('token')}`
          }
            
        })
    
        if (!response2.ok) {
        throw new Error('Failed to submit the data. Please try again.')
        }
        var categoryResult = await response2.json();
        var newColourOptions = categoryResult.data.map((v) => ({
            value: v.id,
            label: v.name
        }));
          
        setStates(newColourOptions);
    }
    statesResult();
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="pt-14">
        <div className="px-10">
          <div className="mb-10 text-right">
          <Link
                    href="#"
                    onClick={openModal}
                    className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid  border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >Add</Link>
          </div>
            <PropertieAllData propertieData={propertieData} setPropertieData={setPropertieData} />


          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {user!=null ? (
              <>
              <h1 className="text-3xl font-medium" >Add Property Form </h1>
              <AddForm user={user} navigate={router} onClose={closeModal} states={states} setPropertieData={setPropertieData} regionalManagerData={regionalManagerData} propertyManagerData={propertyManagerData} leasingManagerData={leasingManagerData} propertyManagementCompanyData={propertyManagementCompanyData} propertyTypeData={propertyTypeData} />
              </>
            ) : (
              <>
                <p className="text-xl mt-2">Kindly login or register</p>
                <div className="flex justify-center gap-x-2 mt-10">
                  <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href="/manager/login" >Login</Link>
                  <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href='/manager/register' >Register</Link>
                </div>
              </>
            )}
          </Modal>
        </div>
      </section>
    </>
  );
};

export default Propertypage;
