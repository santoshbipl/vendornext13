"use client";
import Link from "next/link";
import Logo from "/public/images&icons/SVG/logo.svg";
import Image from "next/image";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "@/context/UserContext";
import { getCookie } from 'cookies-next';
import { usePathname,useRouter } from "next/navigation";
import HeaderDropdown from "./HeaderDropdown";
import Loading from "@/app/loadingScreen";
import { Button } from "primereact/button";
import { useEffect } from "react";

import RequestQuotebtn from "@/components/Front/RequestQuotebtn";

  const Header = ({categories,magazines,sitesetting}) => {
  const {user,isLoding,isInfoLoding,logout}  = useAuth();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const cookie = getCookie('token');
  const pathname = usePathname()
  const  UserType  = getCookie('user-type');
  const [UserTypeName, setUserTypeName] = useState("");


  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(()=>{
    if(getCookie('user-type')==1){
      setProfileUrl('/manager/dashboard');
	  setUserTypeName('Manager');
    }else if(getCookie('user-type')==2){
      setProfileUrl('/company/dashboard');
	  setUserTypeName('Company');
    }else if(getCookie('user-type')==0){
      setProfileUrl('/vendor/dashboard');
	  setUserTypeName('Vendor');
    }
  },[])

    const toggleClass = () => {
      setIsActive(!isActive);
    };
    // console.log(toggleClass);
    const menuClick = () =>{
      setIsActive(false);
    }
 
    const [showMenu, setShowMenu] = useState(true);
    const toggleMenu = (event) => {
        setShowMenu((current) => !current);
    };

    

  return (
    <>
      <header className={`border-b-2 ${scrollPosition > 0 ? "sticky z-50 bg-red-400 top-0 left-0 right-0" : ""}`}>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 p-4 lg:p-7 ">
          <div className="flex xl:flex-wrap justify-between items-center mx-auto max-w-screen-xxl">
            {isInfoLoding ? (
              <Link href="/" className="flex items-center md:ps-8 lg:ps-10">
                  <div className="loading-wave flex justify-center items-end">
                    <div className="loading-bar bg-[#B13634] rounded-[5px] "></div>
                    <div className="loading-bar bg-[#B13634] rounded-[5px]"></div>
                    <div className="loading-bar bg-[#B13634] rounded-[5px]"></div>
                    <div className="loading-bar bg-[#B13634] rounded-[5px]"></div>
                  </div>
              </Link>
            ):(
            <Link href="/" className="flex items-center md:ps-8 lg:ps-10">
              <Image
                src={sitesetting?.sidelogo_url?sitesetting?.sidelogo_url:Logo}
                className="mr-3 h-6 sm:h-9 w-auto"
                alt="Vendor Guide Logo"
                id="Vendor_Guide_Logo"
                width= "100"
                height ="100"
              />
            </Link>
            )}
            {/* {UserType == 1 || !user ? (
              <RequestQuotebtn user={user} />
            ): ''} */}
             <div className="lg:ml-8 flex items-center lg:order-2">
               {UserType == 1 || !user ? (
              <RequestQuotebtn user={user} categories={categories} />
            ): ''}

              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-1 sm:p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400    dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
                onClick={toggleClass}
              >
                <span className="sr-only">{isActive ? 'Close' : 'Open'} main menu</span>
                    {isActive ? (
                      // Close icon (you can replace this with your own close icon)
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      // Open icon (you can replace this with your own open icon)
                      <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                    )}
              </button>
            </div>

            <div
              className={`  ${
                !isActive ? "hidden" : " "
              } lg:ml-auto justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
              id="mobile-menu-2"
            >
              <ul className={`block lg:flex items-start lg:items-center flex-col mt-4 font-semibold lg:flex-row lg:space-x-8 lg:mt-0 text-base text-[#221F20] ${UserType == 1 || !user ? " " : "pr-10"}`}>
                <li className="hidden " >
                  <Link
                    href=""
                    className="flex items-center px-4 pb-4 lg:ps-4"
                  >
                    <Image
                      src={Logo}
                      className="mr-3 h-6 sm:h-9 w-auto"
                      alt="Vendor Guide Logo"
                      id="Vendor_Guide_Logo2"
                    />
                  </Link>
                </li>

                <li >
                  <Link
                    href="/advertise"
                    className="lg:py-3 text-base text-[#221F20] font-semibold block py-2 pr-4 pl-4 text-gray-700 border-b border-gray-100  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                    onClick={menuClick} >
                    Advertise
                  </Link>
                </li>
                <li >
                  <Link
                    href="/about-us"
                    className="lg:py-3 text-base text-[#221F20] font-semibold block py-2 pr-4 pl-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                    onClick={menuClick}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="lg:py-3 text-base text-[#221F20] font-semibold block py-2 pr-4 pl-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                    onClick={menuClick}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <div className="head_dropdown block lg:inline-block relative py-2 lg:py-3 border-b border-gray-100 lg:border-0">
                    <button
                      type="button"
                      className="text-base text-[#221F20] font-semibold flex items-center  dropdown-toggle pl-4"
                      id="page-header-user-dropdown1"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <span className="fw-medium  xl:block pr-2">
                        Resources
                      </span>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="text-[#B13634]"
                      />
                    </button>
                    <ul className="head_dropdown-menu absolute hidden text-gray-700 pt-1 w-[8rem] z-50 bg-white mt-2 shadow-solid-primary ">
                      <li className="py-1 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
                        <Link
                          className="px-3 text-sm font-bold block "
                          href="/blog"
                          onClick={menuClick}
                        >
                          <i className="mdi mdi-lock text-16 align-middle mr-1"></i>
                          Blog
                        </Link>
                      </li>
                      <li className="hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
                        <div className="head_pulbication_dropdown inline-block relative pb-2 pr-8 ">
                          <button
                            type="button"
                            className="text-base text-[#221F20] font-semibold flex items-center  dropdown-toggle  dark:border-zinc-600  pl-3"
                            id="page-header-user-dropdown2"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <span className="pl-1 text-sm font-bold xl:block pr-2">
                              Publication
                            </span>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#B13634]"
                            />
                          </button>
                          <HeaderDropdown magazines={magazines} activemenu={menuClick}/>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                {user?.name ? 
                (<li>
                  <div className="head_profile_dropdown relative px-4 md:px-0 py-2 lg:py-3 border-b border-gray-100 lg:border-0">
                  <button
                    type="button"
                    className="flex gap-x-4 items-center border-gray-50 text-white "
                    id="page-header-user-dropdown3"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={toggleMenu}
                  >
                    {/* <Image
                      width="100"
                      height="100"
                      className="h-8 w-8 rounded-full ltr:xl:mr-2 rtl:xl:ml-2"
                      src="/../../images&icons/profile.png"
                      alt="Header Avatar"
                    /> */}
                    <div>
                      <span className=" align-text-bottom text-[#221F20] text-base font-lato">
                        {isLoding ? (
                            <span>Loading...</span>
                        ) : user?.name } ({UserTypeName})
                        <FontAwesomeIcon icon={faAngleDown}  className="ps-2 text-[#B13634]"/>
                      </span>
                      {/* <span className="text-white block text-xs">
                        Portfolio Manager
                      </span> */}
                    </div>
                  </button>
                  <div
                    className="head_profile_dropdown-menu absolute top-[2rem] left-0 z-40 w-28 list-none rounded bg-white  hidden shadow-solid-primary"
                    id="profile/log"
                    data-popper-placement=""
                  >
                    <div
                      className="border border-gray-50  "
                      aria-labelledby="navNotifications"
                    >
                      <div className="dropdown-item ">
                        <Link
                          className="px-3 py-2 hover:bg-gray-50/50 block"
                          href={profileUrl}
                          onClick={menuClick}
                        >
                          <i
                            className="fa fa-user text-16 align-middle mr-1"
                            aria-hidden="true"
                          ></i>
                          Dashboard
                        </Link>
                      </div>
                      <hr className="border-gray-50 " />
                      <div className="dropdown-item ">
                        <Button
                          className="p-3 hover:bg-gray-50/50 block"
                          onClick={logout}
                        >
                          <i
                            className="fa fa-sign-out text-16 align-middle mr-1"
                            aria-hidden="true"
                          ></i>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                  {/* <Link
                    href=""
                    className="text-base text-[#221F20] font-semibold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0   -700 lg:p-0"
                    onClick={logout}
                  >
                    Logout
                  </Link> */}
                </li>) :
                (
                  <li>
                    <Link
                      href="/login"
                      className="lg:py-3 text-base text-[#221F20] font-semibold block py-2 pr-4 pl-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0   -700 lg:p-0 "
                      onClick={menuClick}
                    >
                      Login
                    </Link>
                  </li>
                )
                }
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
