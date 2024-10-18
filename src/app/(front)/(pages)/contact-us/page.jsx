
import ContentPage from "@/app/(front)/(pages)/ContentPage";

import { getPages,getPostMeta } from "@/app/lib/server-api";

// or Dynamic metadata
export async function generateMetadata({params}) {
  const seoMetaData = await fetch(`${process.env.BASE_API_URL}seo-meta-show/contact-us`).then((res) => res.json());
  var metaData = seoMetaData?.data;
  if(metaData==null){
    const blogData = await fetch(`${process.env.BASE_API_URL}page/contact-us`).then((res) => res.json());
    var metaData = blogData?.data;
  }
  return {
    alternates: {
      canonical: `/${metaData?.slug?metaData?.slug:'contact-us'}`,
      languages: {
        'en-US': `/${metaData?.slug?metaData?.slug:'contact-us'}`
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'contact-us'}`,
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
      description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'contact-us'}`,
      images: [`${metaData?.image_url}`],
      siteId: process.env.SITE_ID,
    },
  }
}

const SlugPages = async ({params}) => {
  const pages = await getPages('contact');
  const pageMeta = await getPostMeta();
  return (
    <>
    
      <ContentPage page='contact-us' pageData={pages?.data} bannerContent={pageMeta.data}/>
    </>
  );
};

export default SlugPages;
