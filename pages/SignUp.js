import {React} from 'react'
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../components/Layout'

const NUEVA_CUENTA = gql `
     mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id
            name
            surname
            email
            created
        } 
     }  
`;



const SignUp = () => {

    //State to manage the messages
    const [message, setMessage] = useState(null)

    //Mutation to create new users
    const [ CreateUser ] = useMutation(NUEVA_CUENTA)

    //Routing
    const router = useRouter()



    const formik = useFormik({

         //Initial values of the form
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
        },

        //Rules to validate form
        validationSchema: Yup.object({
             name: Yup.string()
                      .required('Name is required'),
             surname: Yup.string()
                         .required('Surname is required'),
             email: Yup.string()
                        .required('Email is required'),
             password: Yup.string()
                          .required('password is required')
                          .min(6, 'The password must have more than 6 character')
        }),

        onSubmit: async values => {

            console.log(values)

            const {name, email, surname, password} = values 
            
            //Create new account
            try {
                 const { data } = await CreateUser({
                     variables: {
                         input: {
                             name,
                             surname,
                             email,
                             password
                         }
                     }
                 })
                 setMessage(`The user has been created: ${data.createUser.name}`)
                 //Redirect to the login page
                 setTimeout(() => {
                     setMessage(null)
                      router.push('/Login')
                 }, 3000);

                

            } catch (error) {
                 setMessage(error.message.replace('ApolloError: ', ''))
                 setTimeout(() => {
                     setMessage(null)
                 }, 3000);
            }
        }   
  

 });

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
        <h1 className='text-center text-white text-2xl font-light'>Create New Account</h1>
        { message && showMessage() }
        <div className='flex justify-center mt-5'>
            <div className='w-full max-w-sm'>
               <form
                   className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
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
                         placeholder='user name'
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
                         placeholder='user surname'
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
                         placeholder='user Password'
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
                     value="Create Account"
                 />
               </form>
            </div>
        </div>
    </Layout>

</>
  )
}

export default SignUp