import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Link from "next/link";
import Logo from "../assets/lubak-logo.png";
import Image from "next/image";

export default function Register() {
  const [userName, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
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

  const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
  };

  return (
    <div className="bg-white h-[100vh] w-[100%] flex items-center justify-center  px-4">
      <div className=" h-[100vh] bg-container absolute"></div>
      <div className="bg-white shadow-xl max-w-[600px] w-[100%] py-10 flex justify-center flex-col items-center rounded-md z-40 ">
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
          <h2 className="font-semibold text-3xl mt-5">REGISTER</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4 w-[100%] px-6 lg:px-10"
        >
          <div className="flex flex-col w-full">
            <input
              className="w-[100%] p-4 rounded-md border-2"
              placeholder="Username"
              type="text"
              {...register("Username", {
                required: true,
                minLength: 4,
                maxLength: 20,
                pattern: /^.{5,}$/,
              })}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {userName?.length < 4 && userName?.length !== 0 && (
              <p className="text-xs pl-4 mt-1 py-1 text-[red] bg-red-200">
                Username must be at least 4 characters.
              </p>
            )}
            {userName?.length === 0 && (
              <p className="text-xs pl-4 mt-1 py-1 text-[red] bg-red-200">
                This field is required.
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <input
              className="w-[100%] p-4 rounded-md border-2"
              type="email"
              placeholder="Email"
              {...register("Email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {email && email.length !== 0 && !validateEmail(email) && (
              <p className="text-xs pl-4 mt-1 py-1 text-[red] bg-red-200">
                Please enter a valid email address.
              </p>
            )}
            {email?.length === 0 && (
              <p className="text-xs pl-4 mt-1 py-1 text-[red] bg-red-200">
                This field is required.
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <input
              className="w-[100%] p-4 rounded-md border-2"
              type="password"
              min="6"
              placeholder="Password"
              {...register("Password", {
                required: true,
                minLength: 4,
                maxLength: 20,
                pattern: /^.{5,}$/,
              })}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {password?.length < 6 && password?.length !== 0 && (
              <p className="text-xs pl-4 mt-1 py-1 text-[red] bg-red-200">
                Username must be at least 4 characters.
              </p>
            )}
            {password?.length === 0 && (
              <p className="text-xs pl-4 mt-1 py-1 text-[red] bg-red-200">
                This field is required.
              </p>
            )}
          </div>

          <button
            className="bg-[#930c41] w-full p-4 rounded-md text-white"
            type="submit"
          >
            Register
          </button>
          {success && (
            <span className="success text-[green]">
              Successful. Redirecting to Login Page...
            </span>
          )}
          {error && (
            <span className="failure text-center text-[red]">
              Something went wrong! <br></br>Please try another username or
              email.
            </span>
          )}
        </form>
        <p className="mt-8">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="font-semibold">Log in.</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
