import React, { Component } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import Compressor from "compressorjs";
import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";

export default function Upload() {
  const router = useRouter();
  const [imageExtension, setImageExtension] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [ddlist, setDDList] = useState(null);
  const [selCategoryValue, setSelCategoryValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const userid = userService.userValue?.user_id;

  useEffect(() => {
    setErrorMessage(false);
    categoryService.getDDList().then((x) => setDDList(x));
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required."),
    category_id: Yup.string().required("Category selection is required."),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    const ext = image.name.substr(image.name.lastIndexOf(".") + 1);

    setImageExtension(ext);
    //console.log('original: ', image)
    new Compressor(image, {
      quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
      maxWidth: 1290,
      maxHeight: 1290,
      success: (compressedResult) => {
        console.log("compressed: ", compressedResult);
        setCompressedFile(compressedResult);
      },
    });
  };

  async function onSubmit(data) {
    const userid = localStorage.getItem("user_id");
    if (compressedFile != null) {
      const formdata = new FormData();
      formdata.append("user_id", userid);
      formdata.append("category_id", data.category_id);
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("image", compressedFile);
      formdata.append("extension", imageExtension);

      axios.post("/api/gallery/add", formdata);

      alertService.success("Images were added successfully.", {
        keepAfterRouteChange: true,
      });
      return router.push("/admin/gallery");
    } else {
      setErrorMessage(true);
    }
  }

  const removeSelectedImage = () => {
    setCompressedFile();
  };

  const handleCategoryChange = (e) => {
    setSelCategoryValue(e.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <>
      <div className="flex h-full flex-col items-center">
        <div className="columns-sm px-4 py-4 text-left bg-white shadow-lg rounded-md border border-indigo-200">
          <div className="mt-4 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input type="file" onChange={handleCompressedUpload} />
                {errorMessage && (
                  <div className="invalid-feedback text-sm font-small  text-red-500">
                    Please upload an image.
                  </div>
                )}
              </div>
              <div>
                <input
                  name="title"
                  {...register("title")}
                  maxLength="32"
                  type="text"
                  placeholder="Title"
                  className={`w-full px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600
                     ${errors.title ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback text-sm font-small text-red-500">
                  {errors.title?.message}
                </div>
              </div>
              <div>
                <select
                  name="category_id"
                  placeholder="Select a category"
                  {...register("category_id")}
                  className="px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={handleCategoryChange}
                  value={selCategoryValue}
                >
                  <option value="">Select a category</option>
                  {ddlist &&
                    ddlist.map((d) => (
                      <option key={d.category_id} value={d.category_id}>
                        {d.category_name}
                      </option>
                    ))}
                </select>
                <div className="invalid-feedback text-sm font-small text-red-500">
                  {errors.category_id?.message}
                </div>
              </div>

              {compressedFile && (
                <>
                  <div className="flex justify-center mt-4 p-2 rounded-lg border border-gray-200">
                    <img
                      className="h-72 rounded-lg"
                      src={URL.createObjectURL(compressedFile)}
                      alt="uploaded Images"
                    />
                  </div>
                  <div>
                    <button
                      onClick={removeSelectedImage}
                      className={`w-full px-1 py-1 mb-2 text-white text-xs rounded-md bg-red-500`}
                    >
                      Remove this image
                    </button>
                    <textarea
                      name="description"
                      placeholder="Description"
                      rows={2}
                      cols={5}
                      maxLength="48"
                      className={`w-full px-1 py-1 mt-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600`}
                      {...register("description")}
                    />
                  </div>
                </>
              )}
              <div className="px-4 py-1 text-right sm:px-6">
                <button
                  id="cancel"
                  onClick={handleCancel}
                  className="px-6  text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  {" "}
                  Cancel{" "}
                </button>
                <span>&nbsp; </span>
                <button
                  disabled={formState.isSubmitting}
                  className="px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  Save{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
Upload.auth = true;
Upload.layout = "Admin";
