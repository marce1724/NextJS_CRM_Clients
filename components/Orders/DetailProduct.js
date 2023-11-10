import React,  {useContext, useState, useEffect} from 'react'
import OrderContext from '../../Context/Orders/OrderContext';

const DetailProduct = ({product}) => {

   
    //Context of Orders
    const orderContext = useContext(OrderContext)
    const { amountProducts, updateTotal } = orderContext

    const [amount, setAmount] = useState(0)

    useEffect(() => {
         updateAmount()
         updateTotal()

    }, [ amount ])


 
  const updateAmount = () => {
       const newProduct = {
              ...product,
              amount: Number(amount)
       }
       amountProducts( newProduct )
  }

  const { name, price } = product

  return (
     <div className='md:flex md:justify-between md:items-center mt-5'>
         <div className='md:w-2/4 mb-2 md:mb-0'>
             <p className='text-sm'>{name}</p>
             <p>$ {price}</p>

         </div>

         <input
             type='number'
             placeholder='Amount'
             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: shadow-outline md:ml-4'
             onChange={ e => setAmount(e.target.value)}
             value={amount}
         
         
         />

     </div>
  )
}

export default DetailProduct