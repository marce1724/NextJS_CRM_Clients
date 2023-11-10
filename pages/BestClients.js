import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { gql, useQuery  } from '@apollo/client'

const BEST_CLIENTS = gql `
    query getBestClients {
        getBestClients {
            total
            client {
            name
            company
        }
        total
    }
}
`;

const BestClients = () => {

   const { data, loading, error, startPolling, stopPolling} = useQuery(BEST_CLIENTS)

   useEffect(() => {
         //In case the database have something different it will bring the results
         startPolling(1000)
         
         return () => {
             stopPolling();
         }
          
   }, [startPolling, stopPolling])
   
   if(loading) return 'Loading...'

   const { getBestClients } = data

   const ClientGraph = [];

   getBestClients.map((client, index) => {
     ClientGraph[index] = {
           ...client.client[0],
           total: client.total
       }
   })

  return (
     <Layout>
         <h1 className="text-2xl text-gray-800 font-light mb-5">Best Clients</h1> 
          <BarChart
            className='mt-10'
            width={600}
            height={500}
            data={ClientGraph}
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

export default BestClients