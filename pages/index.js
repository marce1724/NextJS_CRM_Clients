
import Layout from "../components/Layout"
import Client from "../components/Client";
import { useQuery, gql } from "@apollo/client"
import { useRouter } from "next/router";
import Link from "next/link";


const GET_CLIENTS_USER = gql `
  query getClientsSeller{
     getClientsSeller {
        id
        name
        surname
        company
        email
     }
  }
`;


export default function Home() {

  const router = useRouter()

  const {data, loading, error, index, client } = useQuery(GET_CLIENTS_USER)

  //do not access the data before getting the results
  if(loading) return 'Loading...'

   //if there is not information
   if(!data.getClientsSeller) { 
      client.clearStore();
      router.push('/Login');
      return <p>Loading...</p>;
   }

  return (
      <div>
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
            <Link href="/NewClient" legacyBehavior>
                 <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center"

                 >New Client</a>
            
            </Link>
            <table className="table-auto shadow-md mt-10 w-full w-lg">
               <thead className="bg-gray-800">
                  <tr className="text-white">
                      <th className="w-1/5 py-2">Name</th>
                      <th className="w-1/5 py-2">Company</th>
                      <th className="w-1/5 py-2">Email</th>
                      <th className="w-1/5 py-2">Delete</th>
                      <th className="w-1/5 py-2">Edit</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                    {data.getClientsSeller.map(client => (
                      <Client
                           key={client.id}
                           client={client}
                      />
                    ))}
                </tbody>
            </table>
        </Layout>
     </div>
  )
}
