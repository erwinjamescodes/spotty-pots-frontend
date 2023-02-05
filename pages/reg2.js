import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Link from "next/link";
import Logo from "../assets/lubak-logo.png";
import Image from "next/image";

export default function Register() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);

  // const onSubmit = async (data) => {
  //   const newUser = {
  //     username: data.Username,
  //     email: data.Email,
  //     password: data.Password,
  //     userType: "user",
  //   };

  //   try {
  //     await axios.post(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/register`,
  //       newUser
  //     );
  //     setError(false);
  //     setSuccess(true);
  //     setTimeout(() => {
  //       Router.push({ pathname: "/login" });
  //     }, "1000");
  //   } catch (err) {
  //     setError(true);
  //   }
  // };

  // // const Username = register("username");
  // // const lastName = register("lastName");

  // return (
  //   <div className="bg-white h-[100vh] w-[100%] flex items-center justify-center  px-4">
  //     <div className=" h-[100vh] bg-container absolute"></div>
  //     <div className="bg-white shadow-xl max-w-[600px] w-[100%] py-10 flex justify-center flex-col items-center rounded-md z-40 ">
  //       <div className="flex flex-col items-center mb-8 ">
  //         <Image
  //           src={Logo}
  //           alt="Lubak Tracker Logo"
  //           className="cursor-pointer"
  //           height={50}
  //           onClick={() => {
  //             Router.push({ pathname: "/" });
  //           }}
  //         ></Image>
  //         <h1
  //           className="text-2xl uppercase font-semibold cursor-pointer"
  //           onClick={() => {
  //             Router.push({ pathname: "/" });
  //           }}
  //         >
  //           Lubak Tracker
  //         </h1>
  //         <h2 className="font-semibold text-3xl mt-5">REGISTER</h2>
  //       </div>
  //       <form
  //         onSubmit={handleSubmit(onSubmit)}
  //         className="flex flex-col justify-center items-center gap-4 w-[100%] px-6 lg:px-10"
  //       >
  //         <input
  //           className="w-[100%] p-4 rounded-md border-2"
  //           placeholder="Username"
  //           type="text"
  //           {...register("Username", {
  //             required: true,
  //             minLength: 4,
  //             maxLength: 20,
  //             pattern: /^.{5,}$/,
  //           })}
  //         />
  //         {errors.username && <p>TEST</p>}
  //         <input
  //           className="w-[100%] p-4 rounded-md border-2"
  //           type="email"
  //           placeholder="Email"
  //           {...register("Email", {
  //             required: true,
  //             pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  //           })}
  //         />
  //         <input
  //           className="w-[100%] p-4 rounded-md border-2"
  //           type="password"
  //           min="6"
  //           placeholder="Password"
  //           {...register("Password", {
  //             required: true,
  //             minLength: 4,
  //             maxLength: 20,
  //             pattern: /^.{5,}$/,
  //           })}
  //         />
  //         <button
  //           type="button"
  //           onClick={() => {
  //             [
  //               {
  //                 type: "manual",
  //                 name: "Username",
  //                 message: "Double Check This",
  //               },
  //             ].forEach(({ name, type, message }) =>
  //               setError(name, { type, message })
  //             );
  //           }}
  //         >
  //           Trigger Name Errors
  //         </button>
  //         <button
  //           className="bg-[#930c41] w-full p-4 rounded-md text-white"
  //           type="submit"
  //         >
  //           Register
  //         </button>
  //         {success && (
  //           <span className="success">
  //             Successful. Redirecting to Login Page...
  //           </span>
  //         )}
  //         {error && <span className="failure">Something went wrong!</span>}
  //       </form>
  //       <p className="mt-8">
  //         Already have an account?{" "}
  //         <Link href={"/login"}>
  //           <span className="font-semibold">Log in.</span>
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const username = register("username");
  const lastName = register("lastName");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <input
        name="username"
        type="text"
        onChange={(e) => {
          username.onChange(e);
          setError("username", {
            type: "manual",
            message: "Error message",
          });
        }}
      />
      {errors.username && <p>{errors.username.message}</p>}
      <label>First Name</label>
      <input {...register("firstName", { required: true })} type="text" />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <label>Last Name</label>
      <input
        type="text"
        onChange={(e) => {
          lastName.onChange(e);
          setError("lastName", {
            types: {
              required: "This is required",
              minLength: "This is minLength",
            },
          });
        }}
      />
      {errors.lastName && errors.lastName.types && (
        <p>{errors.lastName.types.required}</p>
      )}
      {errors.lastName && errors.lastName.types && (
        <p>{errors.lastName.types.minLength}</p>
      )}
      <button
        type="button"
        onClick={() => {
          [
            {
              type: "manual",
              name: "username",
              message: "Double Check This",
            },
            {
              type: "manual",
              name: "firstName",
              message: "Triple Check This",
            },
          ].forEach(({ name, type, message }) =>
            setError(name, { type, message })
          );
        }}
      >
        Trigger Name Errors
      </button>
      <input type="submit" />
    </form>
  );
}
