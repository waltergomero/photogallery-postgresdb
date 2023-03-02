import { FaUser } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
//import styles from '@/styles/AuthForm.module.css'
import { accountService } from "@/services/account.service";
import { alertService } from "@/services/alert.service";
import { useRouter } from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";
import Password from "./password";

const Signin = ({ providers }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordHandler = (_password) => {
    setPassword(_password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return accountService
      .login(email, password)
      .then((res) => {
        console.log("response: ", res);
        if (res.ok) {
          //console.log("url: ", router.query.returnUrl);
          const returnUrl = router.query.returnUrl || "/admin";
          router.push(returnUrl);
        } else {
          alertService.error(res.error);
        }
      })
      .catch(alertService.error);
  };

  return (
    <div className="flex items-center pt-10 lg:justify-center">
      <div className="flex flex-col overflow-hidden border-2 border-gray-100 rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-gray-700 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Some Project</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            "Attitude is everything...".
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <Link href="/account/register" className="underline">
              Get Started!
            </Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our{" "}
            <a href="#" className="underline">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              conditions
            </a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div>
              <label htmlFor="email" className="block text-dark text-sm">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Password onPassword={passwordHandler} />

            <input
              type="submit"
              value="Login"
              className="px-6 py-1 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            />

            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                {providers &&
                  Object.values(providers).map((provider) => {
                    if (provider.name !== "Credentials") {
                      return (
                        <div key={provider.name} style={{ marginBottom: 0 }}>
                          <a
                            href="#"
                            className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                            onClick={() => signIn(provider.id)}
                          >
                            <span>
                              <svg
                                className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                                viewBox="0 0 16 16"
                                version="1.1"
                                aria-hidden="true"
                              >
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                              </svg>
                            </span>
                            <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                              Sign in with {provider.name}
                            </span>
                          </a>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {
      providers,
    },
  };
}

Signin.layout = "Front";
