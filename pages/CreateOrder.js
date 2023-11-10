import React, {useContext, useState} from 'react'
import Layout from '../components/Layout'
import ReferClient from '../components/Orders/ReferClient'
import ReferProduct from '../components/Orders/ReferProduct'
import DetailOrder from '../components/Orders/DetailOrder'
import OrderContext from '../Context/Orders/OrderContext'
import Total from '../components/Orders/Total'
import { gql, useMutation} from '@apollo/client'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'


// Mutation to create order
const CREATE_ORDER = gql `
    mutation createOrder($input: OrderInput) {
        createOrder(input: $input) {
        id  
   }
}
`;

//Mutation to rewrite cache to new orders
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

const CreateOrder = () => {

     const router = useRouter()

    //State to show messages
    const [message, setMessage] = useState(null)

   //Use the context and extract its functions and values
   const orderContext = useContext(OrderContext)
   const { client, products, total  } = orderContext

  // Mutation to create order
  const [ createOrder ] = useMutation(CREATE_ORDER)

   const validateOrder = () => {
       return !products.every(product => product.amount > 0) || total === 0 || client.length === 0 ? " opacity-50 cursor-not-allowed"  : ""
   }

   const createNewOrder = async () => {

     const { id } = client

     // Remove unnecessary fields
     const order = products.map(({__typename, stock, created, name, price, ...product }) => product)

 
     console.log(order)
     
     try {
        const { data } = await createOrder({
            variables: {
                input: {
                     client: id,
                     total,
                     order
                 }
            }
        })

         //Redirect 
         router.push('/Orders')

          //Show alert
          Swal.fire(
            'Created!',
             data.createOrder,
            'success'
          )
       
     } catch (error) {
        setMessage(error.message.replace('ApolloError: ', ''))
        setTimeout(() => {
            setMessage(null)
         }, 3000);
     }
   }

   const showMessage = () => {
     return (
         <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
             <p>{message}</p>
         </div>
     )
   }

  return (
     <Layout>
         <h1 className="text-2xl text-gray-800 font-light mb-5">Create Order</h1>  

          {message && showMessage()}

          <div className='flex justify-center mt-5'>
             <div className='w-full max-w-lg'>
                  <ReferClient/>
                  <ReferProduct/>
                  <DetailOrder/>
                  <Total/>

                  <button
                      type='button'
                      className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${ validateOrder() }`}
                      onClick={() => createNewOrder()}

                  >Create Order</button>
             </div>     
          </div> 
     </Layout>

    
  )
}

export default CreateOrder