
import React, { useReducer } from "react"
import OrderContext from "./OrderContext"
import OrderReducer from "./OrderReducer"

import {
     SELECT_CLIENT,
     SELECT_PRODUCT,
     PRODUCT_AMOUNT,
     UPDATE_TOTAL
} from "../../Types"
import client from "../../config/apollo"

const OrderState = ({children}) => {

     // Order State
     const initialState = {
         client: {},
         products: [],
         total: 0
     }

     const [state, dispatch] = useReducer(OrderReducer, initialState)

     //Add selected client to the state
     const addClient = client => {
        dispatch( {
             type: SELECT_CLIENT,
             payload: client
        })
     }

     //Add selected products to the state
     const addProduct = productSelects => {

          let newState
          if(state.products.length > 0) {
             newState = productSelects.map(product => {
                 const newObject = state.products.find(productState => productState.id === product.id)
                 return {
                      ...product,
                      ...newObject
                 }
             })

          }else{
             newState = productSelects
          }


          dispatch({
              type: SELECT_PRODUCT,
              payload: newState
          })
     }
    

     //Update amount of the products
     const amountProducts = newProduct=> {
          dispatch({
              type: PRODUCT_AMOUNT,
              payload: newProduct

          })
     } 


      //update payment total
     const updateTotal = () => {
             dispatch({
                 type: UPDATE_TOTAL
             })
     }


     return (
         <OrderContext.Provider
             value= {{
                client: state.client,
                products: state.products,
                total: state.total,
                addClient,
                addProduct,
                amountProducts,
                updateTotal
             }}
         >{children}
         </OrderContext.Provider>

     )
}

export default OrderState