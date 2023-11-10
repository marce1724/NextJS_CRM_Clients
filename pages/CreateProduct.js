import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation} from "@apollo/client"
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

const CREATE_PRODUCT = gql`
     mutation createProduct($input: ProductInput) {
      createProduct(input: $input) {
          id
          name
          stock
          price
          created
        }
     }
`;

const GET_PRODUCTS = gql `
   query getProducts {
      getProducts {
            id
            name
            stock
            price
            created
      }
   }
`;



const CreateProduct = () => {

    //Routing
    const router = useRouter();

   //Mutation to create new product
   const [ createProduct] = useMutation(CREATE_PRODUCT, {
       //Update cache
       update(cache, { data: {createProduct}}) {
           //Get object cache
           const  { getProducts } = cache.readQuery({query: GET_PRODUCTS })
           
           //Rewrite object, add new product 
           cache.writeQuery({
               query: GET_PRODUCTS,
               data: {
                  getProducts: [...getProducts, createProduct]
               }
           })
       }
   })

   //Form to create new products
   const formik = useFormik({
       initialValues: {
           name: '',
           stock: '',
           price: ''
       },
       validationSchema: Yup.object({
           name: Yup.string()
                    .required('The product name is required'),
           stock: Yup.number()
                     .required('The stock is required')
                     .positive('Only positive numbers are accepted')
                     .integer('Must be an integer'),
           price: Yup.number()
                    .positive('Only positive numbers are accepted')
                    .required('The price is required')

       }),
       onSubmit: async values=> {
           const {name, stock, price} = values
  
           try {
                const {data} = await createProduct({
                   variables: {
                       input: {
                            name,
                            stock,
                            price
                          }
                     }
                });

                 //Show an alert
                 Swal.fire(
                     'Created',
                     'The product has been created',
                     'success'
                 )
                
                //Redirect to the products index 
                router.push('/Products')

           } catch (error) {
               console.log(error)
           }
       }
   })


  return (
     <Layout>
            <h1 className="text-2xl text-gray-800 font-light" >Create Product</h1>
            <div className='flex justify-center mt-5'>
              <div className='w-full  max-w-lg'>
                  <form
                      className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                      onSubmit={formik.handleSubmit}
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
                                  htmlFor='stock'
                          >Stock
                          </label>

                          <input
                              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                              focus:outline-none focus:shadow-outline'
                              id='stock'
                              type='number'
                              placeholder='product stock'
                              values= {formik.values.stock}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                        </div>

                        { formik.touched.stock && formik.errors.stock ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error:</p>
                                <p>{formik.errors.stock}</p>
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
                              values= {formik.values.price}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                        </div>

                        { formik.touched.price && formik.errors.price ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error:</p>
                                <p>{formik.errors.price}</p>
                            </div>
                        ): null }


                        <input
                            type="submit"
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-700'
                            value="Create Product"
                        />
                    </form>
                  </div>
               </div>
     </Layout>
  )
}

export default CreateProduct