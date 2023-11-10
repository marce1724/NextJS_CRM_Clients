import React from 'react'
import Layout from '../components/Layout'
import Order from '../components/Order'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'

const GET_ORDERS = gql `
    query getOrdersSeller {
      getOrdersSeller {
        id
        order {
          id
          amount
          name
          price
        }
        total
        client {
           id
           name
           surname
           email
           phone
        }
        seller
        created
        state
      }
}`;

const Orders = () => {

   const { data, loading, error } = useQuery(GET_ORDERS)

   if(loading) return 'Cargando...'

   const { getOrdersSeller } = data

   
  return (
    <div>
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Orders</h1>
          <Link href="/CreateOrder" legacyBehavior>
                 <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
                 >New Order</a>
          </Link>
         
         { getOrdersSeller.length === 0 ? (
              <p className='mt-5 text-center text-2xl'>No orders yet</p>
          ): (
             getOrdersSeller.map(order => (
               <Order 
                   key={order.id}
                   order={order}
               />
             )))
          }

        </Layout>
     </div>
  )
}

export default Orders