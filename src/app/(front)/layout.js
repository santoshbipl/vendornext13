import '@/app/globals.css'
import '@/app/customstyle.css'
import Footer from '@/components/Layouts/Front/Footer'
import Header from '@/components/Layouts/Front/Header'
import { Fragment} from 'react'
import Image from "next/image";

import { getCategories, getMagazines, getSiteSetting } from '@/app/lib/server-api';

export default async function AuthLayout({ children }) {
  const categories = await getCategories();
  const magazines = await getMagazines();
  const sitesetting = await getSiteSetting();

  
  return (
    <Fragment>
        <Header categories={categories} magazines={magazines}  sitesetting={sitesetting.data}/>
        <main className='sm:relative'>
          {children}
		  
		 
        </main>
        <Footer  sitesetting={sitesetting.data} nationalads={sitesetting.nationalads} />
    </Fragment>
  )
}
