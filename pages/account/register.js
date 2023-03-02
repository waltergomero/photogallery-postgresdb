import { FaUser } from 'react-icons/fa'
import { useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/AuthForm.module.css'
import { accountService } from '@/services/account.service';
import { alertService } from '@/services/alert.service';
import { useRouter } from 'next/router';
import { getProviders, getSession, signIn } from "next-auth/react"
import Password from './password';

const RegisterPage = ({ providers }) => {
    const router = useRouter();
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   const passwordHandler = (_password) => {
    setPassword(_password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    return accountService.register(first_name, last_name, email, password)
    .then(() => {
        alertService.success('Registration successful', { keepAfterRouteChange: true });
        router.push('/account/signin');
    })
    .catch(alertService.error);
     }

    return (
        <div className="flex items-center pt-10  lg:justify-center ">
            <div className="flex flex-col overflow-hidden border-2 border-gray-100 rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="p-4 py-6 text-white bg-gray-700 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                    <div className="my-3 text-3xl font-bold tracking-wider text-center">
                        <a href="#">Create New Account</a>
                    </div>
                    <p className="flex flex-col items-center justify-center mt-10 text-center">
                        <span>Do you have an account?</span>
                        <Link href="/account/signin" className="underline">Login</Link>
                    </p>
                    <p className="mt-6 text-sm text-center text-gray-300">
                        Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                    </p>
                </div>
                <div className="p-5 md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Register</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div>
            <label htmlFor='firstname' className="block text-dark text-sm">First Name:</label>
            <input
              type='text'
              id='firstname'
              className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={first_name}
              minLength="2"
              maxLength="32"
              required
              title="First name is requiered field."
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='lastname' className="block text-dark text-sm">Last Name:</label>
            <input
              type='text'
              required
              id='lastname'
              minLength="2"
              maxLength="32"
              className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email' className="block text-dark text-sm">Email Address:</label>
            <input
              type='email'
              required
              id='email'
              className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={email}
              minLength="6"
              maxLength="32"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Password onPassword={passwordHandler}/>
          <input type='submit' value='Register' className="px-6 py-1 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700" />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage;
RegisterPage.layout = "Front";

// export async function getServerSideProps(context) {
//     const { req } = context;
//     const session = await getSession({ req });
//     const providers = await getProviders()
//     if (session) {
//         return {
//             redirect: { destination: "/" },
//         };
//     }
//     return {
//         props: {
//             providers,
//         },
//     }
// }