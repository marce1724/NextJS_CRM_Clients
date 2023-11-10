import React from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from "yup";
import Swal from 'sweetalert2';
import {gql, useMutation, useQuery} from '@apollo/client'

const GET_CLIENT = gql `
     query  getClient($id: ID!){
        getClient(id: $id) {
            id
            name
            surname
            company
            email
            phone
        }
}`;

const UPDATE_CLIENT = gql `
     mutation updateClient($id: ID!, $input: ClientInput) {
         updateClient(id: $id, input: $input){
          id
          name
          surname
          company
          email
          phone
          seller
        }
}`;


const EditClient = () => {

  //Get the currency ID
  const router = useRouter()
  const {query: {pid}} = router

  //Get client information
  const {data, loading, error} = useQuery(GET_CLIENT, {
     variables: {
        id: pid
     }
  })

  //Mutation to update client information
  const [ updateClient ] = useMutation(UPDATE_CLIENT)

  //Validation Schema
  const validationSchema = Yup.object({
        name: Yup.string()
                .required('The name is required'),
        surname: Yup.string()
                    .required('The surname is required'),
        company: Yup.string()
                    .required('The company is required'),
        email: Yup.string()
                .email('Email not valid')
                .required('The email is required')
    })

  if(loading) return 'Loading...'

   //Get client information
  const { getClient } = data

  const updateInfoClient = async (values) => {
     const { name, surname, company, email, phone} = values

     try {
         const {data} = await updateClient({
             variables: {
                 id: pid,
                 input: {
                     name,
                     surname,
                     company, 
                     email,
                     phone
                 }
             }
         })    

         //Show alert
         Swal.fire(
            'Updated!',
             'The client has been updated', 
            'success'
          )
         
         //Redirect to the index page
         router.push("/")

     } catch (error) {
         console.log(error)
     }
  }



  return (
     <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>
          <div className='flex justify-center mt-5'>
             <div className='w-full  max-w-lg'>
                 <Formik
                     validationSchema={validationSchema}
                     enableReinitialize
                     initialValues={ getClient }

                     onSubmit={(values)=> {
                         updateInfoClient(values)
                     }}
                 >
                 {props => {
                     return (
                        <form
                            className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                            onSubmit={props.handleSubmit}
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
                                    value= {props.values.name}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>

                            
                            {props.touched.name && props.errors.name ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error:</p>
                                    <p>{props.errors.name}</p>
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
                                    value= {props.values.surname}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>

                            {props.touched.surname && props.errors.surname ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error:</p>
                                    <p>{props.errors.surname}</p>
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
                                    value= {props.values.company}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>

                            {props.touched.company && props.errors.company ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error:</p>
                                    <p>{props.errors.company}</p>
                                </div>
                            ): null}

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
                                    value= {props.values.email}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>

                            {props.touched.email && props.errors.email ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error:</p>
                                    <p>{props.errors.email}</p>
                                </div>
                            ): null}

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
                                    value= {props.values.phone}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>

                            {props.touched.phone && props.errors.phone ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error:</p>
                                    <p>{props.errors.phone}</p>
                                </div>
                            ): null}

                            <input
                                type="submit"
                                className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-700'
                                value="Edit Client"
                            />
                        </form>
                     )
                    }}
                 </Formik>
             </div>
         </div>
     </Layout> 
  )
}

export default EditClient