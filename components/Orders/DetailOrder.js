import React, {useContext} from 'react'
import OrderContext from '../../Context/Orders/OrderContext';
import DetailProduct from './DetailProduct';


const DetailOrder = () => {
   
    //Context of Orders
    const orderContext = useContext(OrderContext)
    const { products } = orderContext


  return (
       <>
         <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>3.- Adjust product quantities</p>

         { products.length > 0 ? (
             <>
               { products.map( product => (
                   <DetailProduct
                       key={product.id}
                       product={product}
                   />
               ))}
             </>
         ) : (
            <>
               <p>No products yet</p>
            </>
         )}
       </>
  )
}

export default DetailOrder