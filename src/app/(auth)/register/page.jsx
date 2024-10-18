
import Right from "@/components/Front/Auth/Right";
import { SignupForm } from "./SignupForm";

// or Dynamic metadata
export async function generateMetadata({params}) {
  const seoMetaData = await fetch(`${process.env.BASE_API_URL}seo-meta-show/register`).then((res) => res.json());
  var metaData = seoMetaData?.data;
  return {
    alternates: {
      canonical: `/${metaData?.slug?metaData?.slug:'register'}`,
      languages: {
        'en-US': `/${metaData?.slug?metaData?.slug:'register'}`
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.description}`,
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: `/${metaData?.slug}`,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: `${metaData?.image_url}`,
          secure_url: `${metaData?.image_url}`,
          width: 725,
          height: 405,
          alt: `${metaData?.title}`,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card:`${metaData?.title}`,
      title: `${metaData?.title}`,
      description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
      url: `/${metaData?.slug}`,
      images: [`${metaData?.image_url}`],
      siteId: process.env.SITE_ID,
    },
  }
}

const Page = () => {

  return (
    <div className="container mx-auto overflow-hidden md:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="lg:mx-auto  max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">
          <div className="md:col-span-2 lg:col-span-1 col-span-12 lg:-mr-16 order-2 sm:order-1 ">
            <div className="container mx-auto overflow-hidden p-8 md:pt-12 sm:px-12 md:px-12 xl:px-12">
              <div className="absolute inset-x-0 top-[-10rem] -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
              </div>
              <div className=" text-left">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  text-left">Registration</h1>
              </div>
              <SignupForm />
            </div>
          </div>
          <Right />
        </div>
      </div>
    </div >
  );
};


export default Page;
