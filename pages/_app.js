import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import OrderState from '../Context/Orders/OrderState'

function MyApp({ Component, pageProps }) {

  return(

     //Configurate apollo dev tools
     <ApolloProvider client={client}>
         <OrderState>
             <Component {...pageProps} />
         </OrderState>
     </ApolloProvider>
  ) 
}

export default MyApp;
