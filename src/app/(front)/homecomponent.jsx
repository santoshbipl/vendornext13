import BannerSectionCardHome from "@/components/Front/BannerSectionCardHome";
import FeaturSection from "@/components/Front/FeaturSection";
import FeaturSectionWord from "@/components/Front/FeaturSectionWord";
import PartnerSection from "@/components/Front/PartnerSection";
import SearchBar from "@/components/Front/SearchBar";
import Link from "next/link";
import Image from "next/image";


const HomeComponent = ({blogs,vendors,bannerContent,categories,states,homeBannerText}) => {
  
  const backgroundImage = bannerContent.hero_background;

  return (
    < >
     {backgroundImage!=undefined &&
      <div id="hero_section" >
          <div className={`hero_section_content relative  bg-cover bg-no-repeat before:content[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#0000007d] bg:opacity-25 `}>
          <Image
              src={backgroundImage}
              alt="Product screenshot"
              className="mx-auto max-w-none h-[60vh]  object-cover w-full"
              width="100"
              height="100"
            />
          <SearchBar   homeMeta={bannerContent} categories={categories} states={states} />
		  
		  
		  
		  
		  
         </div>
      </div>}
      <div id="banner_section">
        <div className="container mx-auto py-3 px-6 md:px-8 md:py-4">
		
            <BannerSectionCardHome vendor={vendors} />
			
			<FeaturSectionWord blogs={blogs} homeBannerText={homeBannerText} />

			  
        </div>
      </div>
      <div id="featurs_section" className="lg:py-16 lg:pt-12 xl:pt-10">
        <div className="overflow-hidden bg-white lg:py-4 lg:py-7 px-4 lg:ps-12">
          <h2 className="text-2xl lg:hidden block text-center md:text-3xl  font-semibold leading-7 text-grey-500 mb-8 uppercase">
            In The News
          </h2>
          <div className="mx-auto xl:max-w-[90rem] lg:max-w-7xl px-2 sm:px-7">
                  <FeaturSection blogs={blogs} />
				  
				  
				  
				
				  
				  
            <div className="py-9 md:py-12 lg:float-right text-center">
              <Link
                href="blog"
                className="text-center tracking-wide flex-none rounded-md bg-[#221F20] px-5 sm:px-10 py-3 text-sm sm:text-lg lg:text-xl font-normal  font-lato text-white shadow-sm hover:bg-[#221F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20] lg:mr-9"
              >
                Explore Our Resource Library
              </Link>
            </div>
          </div>
        </div>
        
        <PartnerSection homeMeta={bannerContent}
          btnTitle="Get Started"
        />
      </div>
    </>
  );
}

export default HomeComponent;


