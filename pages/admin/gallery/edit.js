import React, { Component } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";
import { galleryService } from "@/services/gallery.service";

export default function Edit(props) {
  const imageInfo = props?.data;
  const title = "Edit image information";
  const isEditMode = !imageInfo;
  const router = useRouter();

  const [ddlist, setDDList] = useState(null);
  const [selCategoryValue, setSelCategoryValue] = useState(
    imageInfo ? imageInfo.category_id : ""
  );

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

  // set default form values if in edit mode
  if (!isEditMode) {
    formOptions.defaultValues = props.data;
  }
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    return galleryService
      .update(data.image_id, data)
      .then(() => {
        alertService.success("Image information was updated successful", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/gallery/");
      })
      .catch(alertService.error);
  }

  const handleDelete = (id) => {
    router.push(`/admin/gallery/delete/${id}`);
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
        <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-indigo-200">
          <h5 className="text-gray-600 text-lg leading-tight font-medium mt-2">
            {title}
          </h5>
          <div className="mt-2 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" name="image_id" {...register("image_id")} />
              <input type="hidden" name="user_id" {...register("user_id")} />
              <label className="mt-2 block text-sm font-medium text-gray-700">
                Title:
              </label>
              <input
                name="title"
                {...register("title")}
                maxLength="32"
                type="text"
                className={`w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600
                     ${errors.title ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback text-sm font-small text-red-500">
                {errors.title?.message}
              </div>

              <label className="mt-2 block text-sm font-medium text-gray-700">
                Category:
              </label>
              <select
                name="category_id"
                {...register("category_id")}
                className="px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={handleCategoryChange}
                value={selCategoryValue}
              >
                <option value=""></option>
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

              <div className="flex justify-center mt-2 p-4 rounded-lg border border-gray-200">
                <Image
                  width={340}
                  height={340}
                  className="rounded-lg"
                  src={"/" + imageInfo.path_original}
                  alt={imageInfo.image_name}
                />
              </div>
              <div className="p-2 flex flex-col justify-start">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="description"
                  rows={3}
                  cols={5}
                  maxLength="48"
                  className={`w-full px-1 py-1 mt-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600`}
                  {...register("description")}
                />
              </div>
              <div className="px-4 py-1 text-right sm:px-6">
                <button
                  id="cancel"
                  onClick={handleCancel}
                  className="px-6 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  {" "}
                  Cancel{" "}
                </button>
                <span>&nbsp; </span>
                <button
                  disabled={formState.isSubmitting}
                  className="px-6 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
Edit.auth = true;
Edit.layout = "Admin";

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
