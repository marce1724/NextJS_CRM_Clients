import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation  } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';


const NEW_CLIENT = gql`
    mutation createCLient ($input: ClientInput) {
     createCLient (input: $input) {
        name
        surname
        company
        email
        phone

     }
  }`;

const GET_CLIENTS_USER = gql `
  query getClientsSeller{
     getClientsSeller {
        id
        name
        surname
        company
        email
     }
  }`;


const NewClient = () => {

   const router = useRouter()

   //State to manage messages
   const [message, setMessage] = useState(null); 

  //Mutation to create new clients
  const [ createCLient ] = useMutation(NEW_CLIENT, {
      update(cache, { data: {createCLient}}) {

         //Get cache object that we want to update
         const {getClientsSeller} = cache.readQuery({ query: GET_CLIENTS_USER })

         //Rewrite cache
         cache.writeQuery({
             query: GET_CLIENTS_USER,
             data: {
                 //create a copy and add to the mutation we want to refresh
                 getClientsSeller: [...getClientsSeller, createCLient]
             }
         })
      }
  })

  const formik = useFormik({
         initialValues: {
             name: '',
             surname: '',
             company: '',
             email: '',
             phone: ''
         },
         validationSchema: Yup.object({
             name: Yup.string()
                      .required('The name is required'),
             surname: Yup.string()
                         .required('The surname is required'),
             company: Yup.string()
                         .required('The company is required'),
             email: Yup.string()
                       .email('Email not valid')
                       .required('The email is required')
         }),
         onSubmit: async values => {

             const {name, surname, company, email, phone} = values

             try {
                 const {data} = await createCLient({
                     variables: {
                         input: {
                             name,
                             surname,
                             company,
                             email,
                             phone
                         }
                     }
                 })

                 //Redirect to the client index
                 router.push('/')
           
             } catch (error) {
                 setMessage(error.message.replace('ApolloError: ', ''))
                 setTimeout(() => {
                    setMessage(null)
                 }, 3000);
             }
         }

  })

  const showMessage = () =>{
    return(
        <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
            <p>{message}</p>
        </div>
    )
 }




  return (
     <Layout>
         <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

         { message && showMessage() }

         <div className='flex justify-center mt-5'>
             <div className='w-full  max-w-lg'>
                 <form
                     className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                     onSubmit={formik.handleSubmit}
                 >
                     <div className='mb-4'>
                         <label className='block text-gray-700 text-sm font-bold mb-2'
                                 htmlFor='name'
                         >Name
                         </label>

                         <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline'
                             id='name'
                             type='text'
                             placeholder='client name'
                             values= {formik.values.name}
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                         />
                     </div>

                      
                     { formik.touched.name && formik.errors.name ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error:</p>
                            <p>{formik.errors.name}</p>
                        </div>
                     ): null }

                     <div className='mb-4'>
                         <label className='block text-gray-700 text-sm font-bold mb-2'
                                 htmlFor='surname'
                         >Surname
                         </label>

                         <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline'
                             id='surname'
                             type='text'
                             placeholder='client surname'
                             values= {formik.values.surname}
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                         />
                     </div>

                     { formik.touched.surname && formik.errors.surname ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error:</p>
                            <p>{formik.errors.surname}</p>
                        </div>
                     ): null }


                     <div className='mb-4'>
                         <label className='block text-gray-700 text-sm font-bold mb-2'
                                 htmlFor='company'
                         >Company
                         </label>

                         <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline'
                             id='company'
                             type='text'
                             placeholder='client company'
                             values= {formik.values.company}
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                         />
                     </div>

                     { formik.touched.company && formik.errors.company ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error:</p>
                            <p>{formik.errors.company}</p>
                        </div>
                     ): null }

                     <div className='mb-4'>
                         <label className='block text-gray-700 text-sm font-bold mb-2'
                                 htmlFor='email'
                         >Email
                         </label>

                         <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline'
                             id='email'
                             type='email'
                             placeholder='client email'
                             values= {formik.values.email}
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                         />
                     </div>

                     { formik.touched.email && formik.errors.email ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error:</p>
                            <p>{formik.errors.email}</p>
                        </div>
                     ): null }

                     <div className='mb-4'>
                         <label className='block text-gray-700 text-sm font-bold mb-2'
                                 htmlFor='phone'
                         >Phone
                         </label>

                         <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline'
                             id='phone'
                             type='text'
                             placeholder='client phone'
                             values= {formik.values.phone}
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                         />
                     </div>

                     { formik.touched.phone && formik.errors.phone ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error:</p>
                            <p>{formik.errors.phone}</p>
                        </div>
                     ): null }

                     <input
                         type="submit"
                         className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-700'
                         value="Create Client"
                     />
                 </form>
             </div>
             
         </div>
     </Layout>
 
  )
}

export default NewClient