import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser } = useAuth();

  const onSubmit = async (data) => {
    await loginUser(data.email, data.password);
  };
  return (
    <>
      <div className="flex-center h-dvh w-full flex-col gap-4">
        <div className="flex-center mx-auto mb-4 gap-2">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            className="size-8"
          />
          <span className="text-2xl font-semibold text-gray-50">iChat</span>
        </div>
        <div className="w-[90%] rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg md:w-450">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-gray-50">
            Login to your account
          </h1>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <label
                htmlFor="email-input"
                className="inline text-sm font-medium text-gray-50"
              >
                Email:
              </label>
              <input
                type="text"
                id="email-input"
                className={`input-field ${errors.email !== undefined && "ring-2 ring-red-600"}`}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="input-error">{errors.email.message}</p>
              )}
            </div>
            <div className="relative mt-3">
              <label
                htmlFor="password-input"
                className="inline text-sm font-medium text-gray-50"
              >
                Password:
              </label>
              <input
                type="password"
                id="password-input"
                className={`input-field ${errors.password !== undefined && "ring-2 ring-red-600"}`}
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 8,
                    message: "Password must contain 8 letters",
                  },
                })}
              />
              {errors.password && (
                <p className="input-error">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold"
            >
              Log in
            </button>

            <p className="mt-6 text-sm font-light text-gray-400">
              Not have an account yet?{" "}
              <Link
                to={"/register"}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
