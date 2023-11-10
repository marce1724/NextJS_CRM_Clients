import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    PRODUCT_AMOUNT,
    UPDATE_TOTAL
} from "../../Types"

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, actions) => {
     switch(actions.type) {
           case SELECT_CLIENT:
                return {
                     ...state,
                     client: actions.payload
                }
           case SELECT_PRODUCT:
                return {
                     ...state,
                     products: actions.payload
                }
           case PRODUCT_AMOUNT: 
                return {
                     ...state,
                     products: state.products.map(product => product.id === actions.payload.id ? product = actions.payload : product)
                }
           case UPDATE_TOTAL: 
                 return {
                     ...state,
                     total: state.products.reduce((newTotal, article) => newTotal += article.price * article.amount,0)
                 }
        default: 
             return state
     }
}