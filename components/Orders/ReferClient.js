import React, { useState, useEffect, useContext} from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import OrderContext from '../../Context/Orders/OrderContext';

const GET_CLIENTS_USER = gql `
  query getClientsSeller{
     getClientsSeller {
        id
        name
        surname
        company
        email
     }
  }
`;




const ReferClient = () => {

  const [client, setClient] = useState([])

  //Context of Orders
  const orderContext = useContext(OrderContext)
  const { addClient } = orderContext

  //Query to get clients of the seller
  const {data, loading, error} = useQuery(GET_CLIENTS_USER)

  useEffect(() => {
       addClient(client)

  },[client])

  const selectClient = (clients) => {
     setClient(clients)
  }


   //Query results
   if(loading) return null
   const { getClientsSeller } = data

  return (

    <>
         <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'> 1.- Assign a client to the order</p>
         <Select
            className='mt-3'
            options={getClientsSeller}
            onChange={option => selectClient(option)}
            getOptionValue={ options => options.id }
            getOptionLabel={ options => options.name }
            placeholder="Select Client"
            noOptionsMessage={() => "No results found"}
         />
    </>
   
  )
}

export default ReferClient