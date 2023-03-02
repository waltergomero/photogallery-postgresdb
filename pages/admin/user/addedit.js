import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { alertService } from "@/services/alert.service";
import { userService } from "@/services/user.service";

export default function AddEditUserPage(props) {
  const user = props?.user;
  const isAddMode = !user;
  const title = !user ? "Add User Information" : "Edit User Information";
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("First Name  is required"),
    email: Yup.string().required("Email  is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user.user_id, data);
  }

  function createUser(data) {
    return userService
      .register(data)
      .then(() => {
        alertService.success("User was added successful", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/user/");
      })
      .catch(alertService.error);
  }

  function updateUser(user_id, data) {
    return userService
      .update(user_id, data)
      .then(() => {
        alertService.success("User was updated successful", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/user");
      })
      .catch(alertService.error);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
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
                    name="user_id"
                    {...register("user_id")}
                  />
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name:
                    </label>
                    <input
                      name="first_name"
                      maxLength="32"
                      type="text"
                      {...register("first_name")}
                      className={`w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${
                                          errors.first_name ? "is-invalid" : ""
                                        }`}
                    />
                    <div className="invalid-feedback text-sm font-small">
                      {errors.first_name?.message}
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name:
                    </label>
                    <input
                      name="last_name"
                      maxLength="32"
                      type="text"
                      {...register("last_name")}
                      className={`w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${
                                          errors.last_name ? "is-invalid" : ""
                                        }`}
                    />
                    <div className="invalid-feedback text-sm font-small">
                      {errors.last_name?.message}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <input
                    name="email"
                    maxLength="32"
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${errors.email ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback text-sm font-small">
                    {errors.email?.message}
                  </div>
                </div>
                {isAddMode && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <input
                      name="password"
                      maxLength="32"
                      type="password"
                      {...register("password")}
                      className={`w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${errors.password ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback text-sm font-small">
                      {errors.password?.message}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right">
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

AddEditUserPage.layout = "Admin";
