import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { gql, useQuery  } from '@apollo/client'

const BEST_SELLERS = gql `
     query getBestSellers {
        getBestSellers {
          total
          seller {
            name
            email
          }
        }
    }
`;

const BestSellers = () => {

   const { data, loading, error, startPolling, stopPolling} = useQuery(BEST_SELLERS)

   useEffect(() => {

         //In case the database have something different it will bring the results
         startPolling(1000)

         return () => {
             stopPolling();
         }
          
   }, [startPolling, stopPolling])
   
   if(loading) return 'Loading...'

   const { getBestSellers } = data

   const sellerGraph = [];

   getBestSellers.map((seller, index) => {
       sellerGraph[index] = {
           ...seller.seller[0],
           total: seller.total
       }
   })

  return (
     <Layout>
         <h1 className="text-2xl text-gray-800 font-light mb-5">Best Sellers</h1> 
          <BarChart
            className='mt-10'
            width={600}
            height={500}
            data={sellerGraph}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3182CE" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>
     </Layout>
  )
}

export default BestSellers