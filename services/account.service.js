import { signIn, signOut } from "next-auth/react";
import Router from "next/router";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { NEXT_API_URL } from "@/config/index";

const baseUrl = `${NEXT_API_URL}/account`;

export const accountService = {
  login,
  logout,
  register,
  getUserId,
};

function login(email, password) {
  return signIn("credentials", {
    redirect: false,
    email: email,
    password: password,
    callbackUrl: `${window.location.origin}`,
  }).then((user) => {
    console.log("user account: ", user);
    return user;
  });
}

function logout() {
  signOut();
  Router.push("/");
}

function register(first_name, last_name, email, password) {
  return fetchWrapper.post(`${baseUrl}/register`, {
    first_name,
    last_name,
    email,
    password,
  });
}

function getUserId(email) {
  return fetchWrapper.get(`${baseUrl}/${email}`, email);
}
