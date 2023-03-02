import '@/styles/globals.css'
import LayoutAdmin from '@/components/layout/layoutAdmin';
import LayoutFrontEnd from '@/components/layout/layout';

import { SessionProvider, useSession} from "next-auth/react";

const layouts = { Front : LayoutFrontEnd,  Admin: LayoutAdmin,};

export default function App({Component,  pageProps: { session, ...pageProps },}) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      <Layout>
      {Component.auth ? (
         <Auth>
          <Component {...pageProps} />
         </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      </Layout>
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}