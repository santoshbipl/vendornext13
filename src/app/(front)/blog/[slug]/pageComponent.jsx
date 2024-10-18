"use client";
import LoadingComponents from "@/components/LoadingComponents";
import { useAuth } from "@/context/UserContext";
import axios from "@/lib/axios";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function PageComponent({slug}) {
    const {metaData,loading} = useAuth();
    const resourceMeta = metaData?.blog;
    const [blog, setBlog] = useState(null);
    const [isLoading, setLoading] = useState(true);
    // console.log(metaData)
    useEffect(() => {
      const getProducts = () => {
  
        axios.get(`${process.env.BASE_API_URL+'blog'}/${slug}`).then(function(response) {
          var result = response.data;
          setBlog(result.data);
          setLoading(false)
        }).catch(function(error) {
            setLoading(false)
        });
      };
      getProducts();
    }, []);
  return (
    <Fragment>
        {loading ? <div className="top_banner sm:relative">
          {/* <div className="text-center">
          Loading...
          </div> */}
          <LoadingComponents/>
        </div>:
        <div
        id="hero_section"
        className=" bg-cover bg-center bg-no-repeat relative before:content[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#08161eab] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] sm:h-[40vh] h:[40vh]"
        style={{
          backgroundImage: `url(${resourceMeta?.hero_background})`,
        }}>
          <div className="sm:h-[40vh] md:h-[40vh] lg:h-[40vh] h-[40vh] w-full max-w-5xl mx-auto">
            <main className="magazine_heading px-4 sm:px-6 lg:px-8 z-10 lg:py-12 relative text-center">
              <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[3rem] font-lato -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold  text-white   font-lato lg:px-10">
                {blog?.title}
              </h1>
            </main>
          </div>
        </div>
        }
      <div id="featurs_section" className="py-9 md:py-5">
        <div className="container mx-auto overflow-hidden pb-5 pt-5 md:pt-12 px-5 md:px-8 xl:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-5 relative">
              {blog &&
                  (
                    <>
                      <div className="col-span-1 aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                        <Image
                          src={blog?.image_url}
                          alt={blog?.title}
                          width="100"
                          height="100"
                          className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="col-span-2 mt-4 md:ml-10 md:text-left text-center">
                        <div>
                          <h2 className="lg:text-xl text-lg  text-[#B13634] font-bold ">
                            
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              ></span>
                              {blog?.title}
                            
                          </h2>
                          <div className="mt-1 lg:text-xl text-lg text-[#221F20] font-medium " dangerouslySetInnerHTML={{ __html: blog?.description }}/>
                            {/* {blog?.description.replace(/(<([^>]+)>)/ig, '')} */}
                            {/* {striptags(blog?.description)} */}
                          {/* </div> */}
                        </div>
                      </div>
                      </>
                  )
                }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};