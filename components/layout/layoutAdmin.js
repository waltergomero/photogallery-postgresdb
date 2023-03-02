import Head from "next/head";
import Header from "./Header";
import { Alert } from "../Alert";
import Sidebar from "./sidebar/index";

export default function LayoutAdmin({
  title,
  keywords,
  description,
  children,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Alert />
          {children}
        </div>
      </div>
    </>
  );
}
LayoutAdmin.auth = true;
LayoutAdmin.defaultProps = {
  title: "Gallery Admin Page",
  keywords: "images, photos, photogallery, imagegallery",
  description: "The best place to view great images",
};
