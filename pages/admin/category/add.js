import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";
import { statusService } from "@/services/status.service";

export default function Add(props) {
  const category = props?.category;
  const isAddMode = !category;
  const title = !category ? "Add Category" : "Edit Category";
  const router = useRouter();

  const [ddlist, setDDList] = useState(null);
  const [selStatusValue, setSelStatusValue] = useState(
    category ? category.status_id : ""
  );

  useEffect(() => {
    statusService.getDDList().then((x) => setDDList(x));
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    category_name: Yup.string().required("Category Name is required"),
    status_id: Yup.string().required("Status selection is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.category;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode
      ? createCategory(data)
      : updateCategory(category.category_id, data);
  }

  function createCategory(data) {
    return categoryService
      .add(data)
      .then(() => {
        alertService.success("Category was added successful", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/category");
      })
      .catch(alertService.error);
  }

  function updateCategory(category_id, data) {
    return categoryService
      .update(category_id, data)
      .then(() => {
        alertService.success("Category updated", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/category");
      })
      .catch(alertService.error);
  }

  const handleSelectStatusChange = (e) => {
    setSelStatusValue(e.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.push("/admin/category");
  };

  return (
    <>
      <div className="flex h-full flex-col items-center ">
        <div className="columns-sm px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md border border-indigo-200">
          <h5 className="text-gray-900 text-lg leading-tight font-medium ml-6 mt-2">
            {title}
          </h5>
          <div className="mt-4 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <input
                    type="hidden"
                    name="category_id"
                    {...register("category_id")}
                  />
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-dark text-sm">
                      Category Name:
                    </label>
                    <input
                      name="category_name"
                      maxLength="32"
                      type="text"
                      {...register("category_name")}
                      className={`w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600
                                        ${
                                          errors.category_name
                                            ? "is-invalid"
                                            : ""
                                        }`}
                    />
                    <div className="invalid-feedback text-sm font-small  text-red-500">
                      {errors.category_name?.message}
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-dark text-sm">Status:</label>
                    <select
                      name="status_id"
                      {...register("status_id")}
                      className="w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={handleSelectStatusChange}
                      value={selStatusValue}
                    >
                      <option value=""></option>
                      {ddlist &&
                        ddlist.map((d) => (
                          <option key={d.status_id} value={d.status_id}>
                            {d.status_name}
                          </option>
                        ))}
                    </select>
                    <div className="invalid-feedback text-sm font-small  text-red-500">
                      {errors.status_id?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  onClick={handleCancel}
                  className="px-6 py-1 mt-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <span>&nbsp; </span>
                <button
                  disabled={formState.isSubmitting}
                  className="px-6 py-1 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
Add.auth = true;
Add.layout = "Admin";
