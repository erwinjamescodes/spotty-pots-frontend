import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useUsernameStore from "../store/userNameStore";
import Router from "next/router";
import Logo from "../assets/lubak-logo.png";
import Image from "next/image";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { currentUsername, setCurrentUsername, userType, setUserType } =
    useUsernameStore();

  const onSubmit = async (data) => {
    const user = {
      username: data.Username,
      password: data.Password,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/login`,
        user
      );
      await setUserType(res.data.userType);
      setCurrentUsername(data.Username);
      Router.push({ pathname: "/" });
      setSuccess(true);
      setError(false);
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentUsername) {
        window.localStorage.setItem("lubakUser", currentUsername);
        window.localStorage.setItem("lubakUserType", userType);
      }
    }
  }, [currentUsername]);

  return (
    <div className="bg-white h-[100vh] w-[100%] flex items-center justify-center px-4 ">
      <div className=" h-[100vh] bg-container absolute"></div>
      <div className="bg-white shadow-xl max-w-[600px] w-[100%] flex justify-center flex-col items-center rounded-md z-40 py-10">
        <div className="flex flex-col items-center mb-8 ">
          <Image
            src={Logo}
            alt="Lubak Tracker Logo"
            className="cursor-pointer"
            height={50}
            onClick={() => {
              Router.push({ pathname: "/" });
            }}
          ></Image>
          <h1
            className="text-2xl uppercase font-semibold cursor-pointer"
            onClick={() => {
              Router.push({ pathname: "/" });
            }}
          >
            Lubak Tracker
          </h1>
          <h2 className="font-semibold text-3xl mt-5">LOG IN</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4 w-[100%] px-6 lg:px-10"
        >
          <input
            className="w-[100%] p-4 rounded-md border-2"
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
            className="w-[100%] p-4 rounded-md border-2"
            type="password"
            min="6"
            placeholder="Password"
            {...register("Password", {
              required: true,
              max: 4,
              min: 20,
              maxLength: 20,
            })}
          />
          <button
            className="bg-[green] w-full p-4 rounded-md text-white"
            type="submit"
          >
            Login
          </button>
          {success && (
            <span className="success">Successful. Logging in...</span>
          )}
          {error && (
            <span className="failure text-[red]">
              Wrong username or password!
            </span>
          )}
        </form>
        <p className="mt-8">
          Don't have an account?{" "}
          <Link href={"/register"}>
            <span className="font-semibold">Register.</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
