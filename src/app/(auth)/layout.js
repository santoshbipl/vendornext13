import '@/app/globals.css'
import NewRegionalHeader  from '@/components/Layouts/Front/NewRegionalHeader'
import Footer from '@/components/Layouts/Front/Footer'
import Header from '@/components/Layouts/Front/Header'
import { getCategories, getMagazines, getSiteSetting } from '@/app/lib/server-api';

export default async function AuthLayout({ children }) {
  const categories = await getCategories();
  const magazines = await getMagazines();
  const sitesetting = await getSiteSetting();

  return (
    <>
        <Header categories={categories} magazines={magazines} sitesetting={sitesetting.data} />
        <section className='sm:relative  z-40'>
          {children}
        </section>
        <Footer sitesetting={sitesetting.data}/>
    </>
  )
}
