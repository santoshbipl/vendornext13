import Image from "next/image";

const HeroSection = ({bannerData}) => {
  
  return (
    <div
      id="hero_section"
      className=" bg-cover bg-no-repeat bg-left relative before:content[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#2e252594] xl:h-[80vh] lg:h-[80vh] md:h-[65vh] sm:h-[65vh] h:[40vh]"
    > 
      <Image
        src={bannerData?.advertise_background}
        alt="Product screenshot"
        className="mx-auto max-w-none xl:h-[80vh] lg:h-[80vh] md:h-[65vh] sm:h-[65vh] h:[40vh] w-full object-cover object-top"
        width="100"
        height="100"
      />
      <div className="absolute z-40 left-0 right-0 top-0 sm:h-[65vh] md:h-[65vh] lg:h-[80vh] h-[28vh] w-full flex items-center justify-center text-center">
        <div className="px-4 sm:px-6 lg:px-8 z-10 lg:pb-8">
          <div className="text-center2">
            {bannerData?.advertise_title && 
            <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold  text-white   font-lato lg:px-10">
              {bannerData.advertise_title}
            </h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
