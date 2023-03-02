import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_email", session?.user.email);
    }
    return (
      <>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
}
