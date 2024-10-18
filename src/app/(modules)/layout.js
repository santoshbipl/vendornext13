import '@/app/globals.css'
import Navbar from './Navbar';
import { getSiteSetting } from '@/app/lib/server-api';

export default async function ModuleLayout({ children }) {
  const sitesetting = await getSiteSetting();
  return (
    <Navbar sitesetting={sitesetting.data}>{children}</Navbar>
  )
}
