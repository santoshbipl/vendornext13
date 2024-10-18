import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import Image from "next/image";
const DetailsHero = ({src , filterData,backgroundImage}) => {

  const vendor_details  = backgroundImage.details_background;

  return (
    <>
    <section
      id="hero_section"
      className=" bg-cover bg-center bg-no-repeat relative before:content[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#2e252594]  xl:h-[40vh] lg:h-[40vh] md:h-[40vh] sm:h-[40vh] h:[40vh]"
    
    >
      <Image
              src={vendor_details}
              alt="Product screenshot"
              className="mx-auto max-w-none xl:h-[40vh] lg:h-[40vh] md:h-[40vh] sm:h-[40vh] h:[40vh] object-cover w-full"
              width="100"
              height="100"
            />

      <div className="absolute top-0 left-0 right-0 z-40 sm:h-[40vh] md:h-[40vh] lg:h-[40vh] h-[40vh] w-full max-w-5xl mx-auto">
        <div className="magazine_breadcrumb relative">
          <div className="breadcrumb text-white py-4 text-lg">
            <Link href="#">Vendor Guide</Link>
            <span className="seprater"> / </span>
            <span className="current text-xl font-lato">{filterData?.name}</span>
          </div>
        </div>
        <main className="magazine_heading px-4 sm:px-6 lg:px-8 z-10 lg:py-12 relative text-center">
          <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[3rem] font-lato -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold  text-white   font-lato lg:px-10">
            {filterData?.name}
          </h1>
        </main>
      </div>
    </section>
    </>
  );
};

export default DetailsHero;
