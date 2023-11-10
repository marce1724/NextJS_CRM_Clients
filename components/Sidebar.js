import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const Sidebar = () => {

    const router = useRouter()



  return (
       <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
          <div>
              <p className='text-white text-2xl font-black mb-10'>CRM Clients</p>
          </div>

          <nav className='mt-5 list-none'>
              <li className={router.pathname === "/" ? "bg-blue-800 list-none": "list-none" }>
                 <Link href="/" legacyBehavior>
                     <a className='text-white block p-3'>
                        Clients
                     </a>
                 </Link>
              </li>

              <li className={router.pathname === "/Orders" ? "bg-blue-800 list-none": "list-none" }>
                 <Link href="/Orders" legacyBehavior>
                     <a className='text-white  block p-3'>
                        Orders
                     </a>
                 </Link>
              </li>

              <li className={router.pathname === "/Products" ? "bg-blue-800 list-none": "list-none" }>
                 <Link href="/Products" legacyBehavior>
                     <a className='text-white block p-3'>
                        Products
                     </a>
                 </Link>
              </li>
          </nav>


          <div className='sm:mt-10'>
              <p className='text-white text-2xl font-black mb-10'>Other Options</p>
          </div>

          <nav className='mt-5 list-none'>
            <li className={router.pathname === "/BestSellers" ? "bg-blue-800 list-none": "list-none" }>
               <Link href="/BestSellers" legacyBehavior>
                     <a className='text-white block p-3'>
                         Best Sellers
                     </a>
               </Link>
            </li>

            <li className={router.pathname === "/BestClients" ? "bg-blue-800 list-none": "list-none" }>
               <Link href="/BestClients" legacyBehavior>
                     <a className='text-white block p-3'>
                         Best Clients
                     </a>
               </Link>
            </li>

          </nav>
       </aside>
       
  )
}

export default Sidebar