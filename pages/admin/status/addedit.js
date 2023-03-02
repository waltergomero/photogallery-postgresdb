import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { alertService } from "@/services/alert.service";
import { statusService } from "@/services/status.service";
import styles from "@/styles/FormInput.module.css";

export default function AddEdit(props) {
  const status = props?.status;
  const isAddMode = !status;
  const title = !status ? "Add Status" : "Edit Status";
  const router = useRouter();

  const [ddTypelist, setTypeDDList] = useState(null);
  const [selTypeValue, setSelTypeValue] = useState(
    status ? status.status_typeid : ""
  );

  useEffect(() => {
    const buildOptions = () => {
      var arr = [];
      for (let i = 0; i <= 10; i++) {
        arr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      setTypeDDList(arr);
    };
    buildOptions();
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    status_name: Yup.string().required("Status Name is required"),
    status_typeid: Yup.string().required("Status type selection is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.status;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode
      ? createStatus(data)
      : updateStatus(status.status_id, data);
  }

  function createStatus(data) {
    return statusService
      .add(data)
      .then(() => {
        alertService.success("Status was added successful", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/status/");
      })
      .catch(alertService.error);
  }

  function updateStatus(status_id, data) {
    return statusService
      .update(status_id, data)
      .then(() => {
        alertService.success("Status updated", { keepAfterRouteChange: true });
        router.push("/admin/status");
      })
      .catch(alertService.error);
  }

  const handleSelectStatusTypeChange = (e) => {
    setSelTypeValue(e.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.push("/admin/status");
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
                    name="status_id"
                    {...register("status_id")}
                  />
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-dark text-sm">
                      Status Name:
                    </label>
                    <input
                      name="status_name"
                      maxLength="32"
                      type="text"
                      {...register("status_name")}
                      className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600
                                        ${
                                          errors.status_name ? "is-invalid" : ""
                                        }`}
                    />
                    <div className="invalid-feedback text-sm font-small  text-red-500">
                      {errors.status_name?.message}
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-dark text-sm">
                      Status Type:
                    </label>
                    <select
                      name="status_typeid"
                      {...register("status_typeid")}
                      className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={handleSelectStatusTypeChange}
                      value={selTypeValue}
                    >
                      <option value=""></option>
                      {ddTypelist}
                    </select>
                    <div className="invalid-feedback text-sm font-small  text-red-500">
                      {errors.status_typeid?.message}
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
AddEdit.auth = true;
AddEdit.layout = "Admin";
