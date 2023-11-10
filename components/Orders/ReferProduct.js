import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import OrderContext from '../../Context/Orders/OrderContext';


const GET_PRODUCTS = gql `
   query getProducts {
      getProducts {
            id
            name
            stock
            price
            created
      }
   }
`;



const ReferProduct = () => {
   
   //State of the component
   const [products, setProducts] = useState([])

   //Context of Orders
  const orderContext = useContext(OrderContext)
  const { addProduct } = orderContext


  //Query to get products
  const { data, loading, error } = useQuery(GET_PRODUCTS)

  useEffect(() => {
        //Function to pass products to the OrderState
        addProduct(products)

  }, [products])

  const selectProduct = (product) => {
       setProducts(product)
  }

  if(loading) return null
  const { getProducts } = data

  return (
    <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'> 2.- Select the products</p>
        <Select
        className='mt-3'
        options={getProducts}
        isMulti={true}
        onChange={option => selectProduct(option)}
        getOptionValue={ options => options.id }
        getOptionLabel={ options => `${options.name} - ${options.stock} availables`}
        placeholder="Select the products"
        noOptionsMessage={() => "No results found"}
        />
   </>
  )
}

export default ReferProduct