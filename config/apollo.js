import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import fetch from "node-fetch";


//Manage headers with context
const httpLink = createHttpLink({
     uri: 'http://localhost:4000/',
     fetch
})

const authLink = setContext((_, {headers}) => {

     //Read the token saved in the storage
     const token = localStorage.getItem('token')

     return {
         headers: {
             ...headers,
             authorization: token ? `Bearer ${token}` : ''
         }
     }
})

// Configurate Apollo Client
const client = new ApolloClient({
      connectToDevTools: true,
      cache: new InMemoryCache(), //Manage cache
      link: authLink.concat(httpLink)
});


export default client;