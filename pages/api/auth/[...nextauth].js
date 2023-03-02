import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { conn } from "@/utils/dbconnection";
import { encode } from "@/lib/jwt";

const bcrypt = require("bcryptjs");

export default async function auth(req, res) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    // Configure one or more authentication providers

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
        id: "credentials",
        name: "appwithauth",
        credentials: {
          email: {
            label: "email",
            type: "email",
            placeholder: "jsmith@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, res) {
          const user = await getData(credentials.email);
          if (!user) {
            throw new Error("User with this email doesn't exists.");
          }
          // valid email but incorrect password
          if (
            !(user && bcrypt.compareSync(credentials.password, user.password))
          ) {
            throw new Error("The password submitted is incorrect.");
          }
          if (user) {
            // console.log("user info in db: ", user)
            // const token = encode({user_id: user.user_id, first_name: user.first_name, last_name: user.last_name, role: user.role, email: user.email})
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.user = token;
        return session;
      },
    },
    pages: {
      signIn: "/account/signin",
      signOut: "/",
      error: "/auth/error", // Error code passed in query string as ?error=
      //verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
  });
}

async function getData(email) {
  const query = `SELECT 
                    u.user_id, 
                    u.first_name, 
                    u.last_name, 
                    u.email,
                    u.password, 
                    r.role_name as role FROM southwind.users u 
                    LEFT JOIN southwind.user_roles ur on u.user_id = ur.user_id
                    LEFT JOIN southwind.roles r ON ur.role_id = r.role_id WHERE u.email = $1`;

  const value = [email];
  return await conn.query(query, value).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    const user = data.rows[0];
    return Promise.resolve(user);
  });
}
