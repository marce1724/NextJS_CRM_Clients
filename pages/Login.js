import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

const AUTHENTICATE_USER = gql`
     mutation authenticateUser($input: authenticateInput) {
         authenticateUser(input: $input){
             token
         }
     }
`;



const Login = () => {

    //Routing
    const router = useRouter()

   //State to manage messages
   const [message, setMessage] = useState(null); 

  //Mutation to authenticate user 
  const [ authenticateUser ] = useMutation(AUTHENTICATE_USER)  

  const formik = useFormik({

         //Initial values of the form
        initialValues: {
             email: '',
             password: ''
         },

        //Rules to validate form
        validationSchema: Yup.object({
             email: Yup.string()
                       .email('Email not valid')
                       .required('Email is required'),
             password: Yup.string()
                          .required('Password is required')
         }),

         onSubmit: async values => {
             
             const {email, password} = values; 

             try {
                 const {data} = await authenticateUser({
                     variables :{ 
                         input: {
                             email,
                             password
                         }
                     }
                 })
                 setMessage('Authenticating...')

                 setTimeout(() => {
                     //Save the token to the locaStorage
                      const {token} = data.authenticateUser
                      localStorage.setItem('token', token)
                 }, 1000);

                 //Redirect to the main page
                 setMessage(null);
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
    <>
        <Layout>
            <h1 className='text-center text-white text-2xl font-light'>Login</h1>
            { message && showMessage() }
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                   <form
                       className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                       onSubmit={formik.handleSubmit}
                   >
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
                             placeholder='user email'
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
                                 htmlFor='password'
                         >Password
                         </label>

                         <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline'
                             id='password'
                             type='password'
                             placeholder='user password'
                             values= {formik.values.password}
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                         />
                     </div>

                     
                     { formik.touched.password && formik.errors.password ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error:</p>
                            <p>{formik.errors.password}</p>
                        </div>
                     ): null }

                     <input
                         className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                         type='submit'
                         value="Log In"
                     />
                   </form>
                </div>
            </div>
        </Layout>
    
    </>
  )
}

export default Login