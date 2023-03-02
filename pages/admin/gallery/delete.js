import React, { Component } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { galleryService } from "@/services/gallery.service";

export default function Delete(props) {
  const imageInfo = props?.data;
  const router = useRouter();
  const title = "Are you sure you want to delete this image?";

  const handleDelete = (id) => {
    galleryService.delete(id);
    router.push("/admin/gallery");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <>
      <div className="flex h-full flex-col items-center">
        <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-indigo-200">
          <h5 className="text-red-500 text-lg leading-tight font-medium ml-6 mt-2">
            {title}
          </h5>
          <div className="mt-4 md:mt-0 md:col-span-2">
            <form>
              <label className="mt-4 block text-sm font-medium text-gray-700">
                Title:
              </label>
              {imageInfo.title}
              <div className="flex justify-center mt-4 rounded-lg border border-gray-200">
                <div className="flex flex-col-2 gap-2 ">
                  <Image
                    width={340}
                    height={340}
                    className="rounded-lg m-2"
                    src={"/" + imageInfo.path_original}
                    alt={imageInfo.image_name}
                  />
                </div>
              </div>
              <div className="px-4 py-2 text-right sm:px-6">
                <button
                  onClick={handleCancel}
                  className="px-6 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <span>&nbsp; </span>
                <button
                  onClick={() => handleDelete(imageInfo.image_id)}
                  className="px-6 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
Delete.auth = true;
Delete.layout = "Admin";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
