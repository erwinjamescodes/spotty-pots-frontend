import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Link from "next/link";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    const newUser = {
      username: data.Username,
      email: data.Email,
      password: data.Password,
      userType: "user",
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/register`,
        newUser
      );
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        Router.push({ pathname: "/login" });
      }, "1000");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="bg-[gray] h-[100vh] w-[100%] flex items-center justify-center  px-4">
      <div className="bg-[lightgrey] max-w-[600px] w-[100%] h-[500px] flex justify-center flex-col items-center rounded-md">
        <div className="flex flex-col items-center mb-8">
          <p
            className="font-semibold text-xl cursor-pointer"
            onClick={() => {
              Router.push({ pathname: "/" });
            }}
          >
            LUBAK TRACKER
          </p>
          <h2 className="font-semibold text-3xl">REGISTER</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4 w-[100%] px-6 lg:px-10"
        >
          <input
            className="w-[100%] p-4 rounded-md"
            placeholder="Username"
            type="text"
            {...register("Username", {
              required: true,
              max: 20,
              min: 4,
              maxLength: 20,
            })}
          />
          <input
            className="w-[100%] p-4 rounded-md"
            type="email"
            placeholder="Email"
            {...register("Email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          <input
            className="w-[100%] p-4 rounded-md"
            type="password"
            min="6"
            placeholder="Password"
            {...register("Password", {
              required: true,
              // max: 4,
              // min: 20,
              // maxLength: 20,
            })}
          />
          <button
            className="bg-[#930c41] w-full p-4 rounded-md text-white"
            type="submit"
          >
            Register
          </button>
          {success && (
            <span className="success">
              Successful. Redirecting to Login Page...
            </span>
          )}
          {error && <span className="failure">Something went wrong!</span>}
        </form>
        <p className="mt-8">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span>Log in.</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
