import Link from "next/link";
import Image from "next/image";

export default function FeaturSection({blogs}) {
  const advertiseData = blogs;

  return (
    <>
      {advertiseData && advertiseData?.data.map((row, i) => {
        if (row.id % 2 === 0) {
          return (
            <Link key={i} href={`/blog/${row.slug}`}>
            <div  className="lg:mx-auto grid  md:grid-cols-2 items-center max-w-4xl md:gap-x-8 gap-y-5 sm:gap-y-8 md:gap-y-16 lg:max-w-none">
              <div className="hidden md:block lg:pt-4  md:col-span-1">
                {row.mainTitle && (
                  <h2 className="text-2xl lg:block hidden md:text-3xl  font-semibold leading-7 text-grey-500 xl:mb-10">
                    {row.mainTitle}
                  </h2>
                )}
                <div className="text-center md:text-left">
                  <div className="sm:mt-3 md:mt-[1rem] text-base sm:text-xl lg:text-2xl  lg:leading-10  md:leading-7 text-[#171717] font-medium font-lato sm:order-1 order-2">
                    <h3 className="text-lg sm:text-xl lg:text-2xl text-red-700 font-semibold">
                      {row.title}
                    </h3>
                    <span>{row.short_description}</span>
                  </div>
                </div>
              </div>
              <div
                className="md:col-span-1 relative w-full"
                
              >
                <Image
                  src={row.image_url}
                  alt="Product screenshot"
                  className="mx-auto max-w-none rounded-xl ring-1 ring-gray-400/10 w-auto w-full sm:w-[25rem] md:w-[20rem] lg:w-[25rem] xl:w-[30rem] md:-ml-4 lg:-ml-0 md:float-right"
                  width="100"
                  height="100"
                />
                <Image
                  src="/images&icons/Asset1.png"
                  alt="Product screenshot"
                  className="absolute_class imageicon_right max-w-none absolute lg:block hidden  xl:right-[27.5rem] md:right-[22.5rem] xl:top-32 md:top-20  xl:w-[12rem] md:w-[10rem] sm:w-[9rem]"
                  width="80"
                  height="100"
                />
              </div>
              <div className="block md:hidden lg:pt-4  md:col-span-1">
              {row.mainTitle && 
                <h2 className="text-2xl lg:block hidden md:text-3xl  font-semibold leading-7 text-grey-500 xl:mb-10">
                  {row.mainTitle}
                </h2>}
                <div className="text-center md:text-left">
                  <div className="sm:mt-3 md:mt-[1rem] text-base sm:text-xl lg:text-2xl  lg:leading-10  md:leading-7 text-[#171717] font-medium font-lato sm:order-1 order-2">
                    <h3 className="text-lg sm:text-xl text-red-700  font-semibold">
                      {row.title}
                    </h3>
                    <span>{row.short_description}</span>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          )
        } else {
          return (
            <Link key={i} href={`/blog/${row.slug}`}>
            <div key={i} className="mt-8 lg:mx-auto grid  justify-center md:justify-normal md:grid-cols-2 items-center max-w-4xl md:gap-x-8  gap-y-5 sm:gap-y-8 md:gap-y-16 lg:max-w-none">
              <div
                className="md:col-span-1 relative w-full"
                
              >
                <Image
                  src={row.image_url}
                  alt="Product screenshot"
                  className="mx-auto max-w-none rounded-xl ring-gray-400/10 w-auto w-full sm:w-[25rem] md:w-[20rem] lg:w-[25rem] xl:w-[30rem] md:-ml-4 lg:-ml-0 md:float-left"
                  width="100"
                  height="100"
                />
                <Image
                  src="/images&icons/Asset2.png"
                  alt="Product screenshot"
                  className="absolute imageicon_left xl:left-[21rem] md:top-24 md:left-72 lg:block hidden xl:w-[12rem] md:w-[10rem] sm:w-[9rem]"
                  width="100"
                  height="100"
                />
              </div>
              <div className="lg:pr-8 lg:pt-4 md:col-span-1 xl:-ml-16 mb-8">
                <div className="lg:max-w-lg text-center md:text-left">
                  <div
                    className="text-base sm:text-xl lg:text-2xl lg:leading-10 sm:leading-7
                    text-[#221F20] font-medium font-lato"
                  >
                    <h3 className="text-lg sm:text-xl lg:text-2xl text-red-700 font-semibold">
                      {row.title}
                    </h3>
                    <span>{row.short_description}</span>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          )
        }
      })}
    </>
  );
}
