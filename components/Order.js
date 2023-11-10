
import React, {useState, useEffect} from 'react'
import  { gql, useMutation} from '@apollo/client'
import Swal from 'sweetalert2'


const UPDATE_ORDER = gql `
     mutation updateOrder($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input) {
             state  
     }
}`;

const DELETE_ORDER = gql `
     mutation deleteOrder($id: ID!) {
         deleteOrder(id: $id) 
     }

`;

const GET_ORDERS = gql `
    query getOrdersSeller {
      getOrdersSeller {
        id
      }
}`;


const Order = ({order}) => {

  const {id, total, client : {name, surname, email, phone}, state, client} = order

  //Mutation to update order status
  const [updateOrder] = useMutation(UPDATE_ORDER)
  const [deleteOrder] = useMutation(DELETE_ORDER ,  {
     update(cache) {
         const { getOrdersSeller } = cache.readQuery({
             query: GET_ORDERS
         });

         cache.writeQuery({
             query: GET_ORDERS,
             data:  {
                getOrdersSeller: getOrdersSeller.filter(order => order.id !== id)
             }
         })
     }
  })

  const [stateOrder, setStateOrder] = useState(state)
  const [clasState, setClasState] = useState('')

  useEffect(() => {
     if(stateOrder) {
         setStateOrder(stateOrder)
     }

     ClassOrder()
  }, [stateOrder])

  //Function to modifiy the color of the order according with the state
  const ClassOrder = () => {
     if(stateOrder === 'PENDING'){
         setClasState('border-yellow-500')

     }else if (stateOrder === 'COMPLETED') {
         setClasState('border-green-500')

     }else{
         setClasState('border-red-800')
     }
  }

  const updateOrderState = async newState => {
     try {
         const { data } = await updateOrder({
              variables : {
                 id,
                 input : {
                     state: newState,
                     client: client.id
                 }
              }
         })
         setStateOrder(data.updateOrderState.state)

     } catch (error) {
         console.log(error)
     }
  }

  const confirmDeleteOrder = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

      }).then(async (result) => {
        if (result.isConfirmed) {

             try {
                 //Delete client by ID
                 const {data} = await deleteOrder({
                     variables: {
                         id: id
                     }
                 })

                 //Show alert
                Swal.fire(
                    'Deleted!',
                     data.deleteOrder,
                    'success'
                  )
             } catch (error) {
                 console.log(error)
             }
        }
      })
  }

  return (
     <div className={`${clasState} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gab-4 shadow-lg`}>
         <div>
             <p className='font-bold text-gray-800'>Client: {name} {surname}</p>

             {email && (
                 <p className='flex items-center my-2'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                     </svg>
                    {email}
                </p>
             )}

             
             {phone && (
                 <p className='flex items-center my-2'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                     </svg>

                    {phone}
                </p>
             )}


             <h2 className='text-gray-800 font-bold mt-10'>State order: {stateOrder}</h2>
             <select 
                 className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:online-none 
                            focus:bg-blue-800 focus:border-blue-500 uppercase text-xs font-bold'
                 value={stateOrder}
                 onChange={e => setStateOrder(e.target.value)}
             >
                <option value="COMPLETED">COMPLETE</option>
                <option value="PENDING">PENDING</option>
                <option value="CANCEL">CANCEL</option>
             </select>
         </div>

         <div>
             <h2 className='text-gray-800 font-bold mt-2'>Order Summary</h2>
             {order.order.map(item => (
                     <div 
                         key={item.id}
                         className='mt-4'
                     >
                     <p className='text-sm text-gray-600'>Product: {item.name} </p>
                     <p className='text-sm text-gray-600'>Amount: {item.amount}</p>

                     </div>
             ))}

             <p className='text-gray-800 mt-3 font-bold'>Total to pay: 
                 <span className='font-light'> ${total}</span>
             </p>

             <button
                 className='flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold'
                 onClick={ ()=> confirmDeleteOrder() }
             >
                Delete Order
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </button>
         </div>
     </div>
  )
}

export default Order