
import { getPostMeta,getMagazineData } from "@/app/lib/server-api";
import PageFlipComponent from "./PageFlipComponent";

// or Dynamic metadata
export async function generateMetadata({params}) {
  const seoMetaData = await fetch(`${process.env.BASE_API_URL}seo-meta-show/publication_single_page`).then((res) => res.json());
  var metaData = seoMetaData?.data;
  if(metaData==null){
    const blogData = await fetch(`${process.env.BASE_API_URL+'magazine'}/${params.id}`).then((res) => res.json());
    var metaData = blogData?.data;
  }
  return {
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US'
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
      url: `/publication/${metaData?.slug}`,
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
      url: `/publication/${metaData?.slug}`,
      images: [`${metaData?.image_url}`],
      siteId: process.env.SITE_ID,
    },
  }
}

const Page = async ({params}) => {
  const pageMeta = await getPostMeta();
  const magazineData = await getMagazineData(params.id);

  return (
      // <Flipbook slug={params.id} bannerContent={pageMeta?.data.publication}  />  
      <PageFlipComponent bannerContent={pageMeta?.data.publication} slug={params.id} magazineData={magazineData.data}/>
  );
}
export default Page;