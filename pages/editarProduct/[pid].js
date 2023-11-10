import React from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from "@apollo/client"
import { Formik } from "formik"
import * as Yup from "yup";
import Swal from 'sweetalert2'


const GET_PRODUCT = gql `
    query  getProductId($id: ID!) {
        getProductId(id: $id) {
            id
            name
            stock
            price
            created
        }
    }
`;

const UPDATE_PRODUCT = gql `
     mutation  updateProduct($id: ID!, $input: ProductInput) {
         updateProduct(id: $id, input: $input) {
            id
            name
            stock
            price
            created
        }
}`;


const EditarProduct = () => {
 
   const router = useRouter()
   const {query: {pid} } = router

   //Query to get a specific product
   const {data, loading, error} = useQuery(GET_PRODUCT, {
         variables: {
             id: pid
         }
   })

   //Mutation to update product information
   const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

   //Validation Schema
   const validationSchema = Yup.object({
        name: Yup.string()
                 .required('The product name is required'),
        stock: Yup.number()
                  .required('The stock is required')
                  .positive('Only positive numbers are accepted')
                  .integer('Must be an integer'),
        price: Yup.number()
                 .positive('Only positive numbers are accepted')
                 .required('The price is required')
   })

   if(loading) return 'Loading...'

   if(!data)  return 'Action not allowed'

   const updateInfoProduct = async values => {

        const { name, stock, price } = values

        try {
             const {data} = await updateProduct({
                 variables: {
                     id: pid,
                     input: {
                         name,
                         stock, 
                         price
                     }
                 }
             })

             //Show an alert
              Swal.fire(
                'Updated',
                'The product has been updated',
                'success'
            )
           
           //Redirect to the products index 
           router.push('/Products')
             
        } catch (error) {
             console.log(error)
        }
   }

   const { getProductId } = data



  return (
     <Layout>
           <h1 className="text-2xl text-gray-800 font-light">Edit Product</h1>
           <div className='flex justify-center mt-5'>
              <div className='w-full  max-w-lg'>
                 <Formik
                     validationSchema={validationSchema}
                     enableReinitialize
                     initialValues={getProductId}
                     onSubmit={ values => {
                         updateInfoProduct(values)
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
                                    >Product Name
                                    </label>

                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline'
                                        id='name'
                                        type='text'
                                        placeholder='product name'
                                        value= {props.values.name}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    </div>
                                        
                                    { props.touched.name && props.errors.name ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error:</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    ): null }


                                    <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'
                                            htmlFor='stock'
                                    >Stock
                                    </label>

                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline'
                                        id='stock'
                                        type='number'
                                        placeholder='product stock'
                                        value= {props.values.stock}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    </div>

                                    { props.touched.stock && props.errors.stock ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error:</p>
                                            <p>{props.errors.stock}</p>
                                        </div>
                                    ): null }


                                    <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'
                                            htmlFor='price'
                                    >Price
                                    </label>

                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline'
                                        id='price'
                                        type='number'
                                        placeholder='product price'
                                        value= {props.values.price}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    </div>

                                    { props.touched.price && props.errors.price ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error:</p>
                                            <p>{props.errors.price}</p>
                                        </div>
                                    ): null }


                                    <input
                                        type="submit"
                                        className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-700'
                                        value="Edit Product"
                                    />
                                </form>
                            )}}
                     </Formik>
                  </div>
               </div>
     </Layout>
  )
}

export default EditarProduct