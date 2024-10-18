import { getBlogs, getVendors,getPostMeta, getCategories,getStates,getPages } from "@/app/lib/server-api";
import HomeComponent from "./homecomponent";

// or Dynamic metadata
export async function generateMetadata({params}) {
  const res = await fetch(`${process.env.BASE_API_URL}seo-meta-show/home`, { cache: 'no-cache' })
  if (res.status === 429) {
    // Handle rate limit exceeded, maybe implement retry logic
    console.warn('Rate limit exceeded. Retry after some time.');
    return null; // or throw an error
  }
  if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
  }
  var seoMetaData = await res.json()
  var metaData = seoMetaData?.data;

  return {
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/'
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.description}`,
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: '/',
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
      url: '/',
      images: `${metaData?.image_url}`,
      siteId: process.env.SITE_ID,
    },
  }
}



export default async function Home() {
  const blogs = await getBlogs();
  const vendors = await getVendors();
  const pageMeta = await getPostMeta();
  const categories = await getCategories();
  const states = await getStates();
  const homeBannerText = await getPages('home-banner-text');
  
  return (
    <HomeComponent homeBannerText={homeBannerText?.data} blogs={blogs} vendors={vendors} bannerContent={pageMeta?.data.home} categories={categories} states={states} />
  );
}



