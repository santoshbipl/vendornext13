import Advertisepage from "./Advertisepage";
import { getPostMeta } from "@/app/lib/server-api";

// or Dynamic metadata
export async function generateMetadata({params}) {
  const seoMetaData = await fetch(`${process.env.BASE_API_URL}seo-meta-show/advertise`).then((res) => res.json());
  var metaData = seoMetaData?.data;

  return {
    alternates: {
      canonical: `/${metaData?.slug?metaData?.slug:'advertise'}`,
      languages: {
        'en-US': `/${metaData?.slug?metaData?.slug:'advertise'}`
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.description}`,
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'advertise'}`,
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
      locale: 'en',
      type: 'website',
    },
    twitter: {
      card:`${metaData?.title}`,
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'advertise'}`,
      images: [`${metaData?.image_url}`],
      siteId: process.env.SITE_ID,
    },
  }
}

const Advertise = async () => {
  const pageMeta = await getPostMeta();
  return (
    <>
      <Advertisepage bannerContent={pageMeta?.data.advertise}/>
    </>
  );
};

export default Advertise;


