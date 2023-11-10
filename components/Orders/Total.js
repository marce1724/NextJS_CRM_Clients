import React, { useContext } from 'react'
import OrderContext from '../../Context/Orders/OrderContext';

const Total = () => {

    //Context of Orders
    const orderContext = useContext(OrderContext)
    const { total } = orderContext

  return (
    <div className='flex items-center mt-5 justify-between bg-white p-3'>
         <h2 className='text-gray-800 text-lg'>Total a Pagar</h2>
         <p className='text-gray-800 mt-0'>$ {total}</p>
    </div>
  )
}

export default Total