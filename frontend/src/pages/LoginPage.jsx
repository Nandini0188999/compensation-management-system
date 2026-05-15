import { useState, useContext }
from "react";

import api from "../api/axios";

import { AuthContext }
from "../context/AuthContext";

import {
  Link
} from "react-router-dom";

const LoginPage = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const { login } =
    useContext(AuthContext);

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "auth/login/",
          {
            email,
            password
          }
        );

      login(
  response.data.access
);

const userResponse =
  await api.get(
    "auth/me/",
    {
      headers: {
        Authorization:
          `Bearer ${response.data.access}`
      }
    }
  );

if (
  userResponse.data.role
  === "ADMIN"
) {

  window.location.href =
    "/dashboard";
}

else {

  window.location.href =
    "/employee-dashboard";
}

    } catch {

      setError(
        "Invalid credentials"
      );
    }
  };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    ">

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-8
          rounded-xl
          shadow-md
          w-96
        "
      >

        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
        ">
          Login
        </h1>

        {error && (
          <p className="
            text-red-500
            mb-4
          ">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            hover:bg-blue-700
          "
        >
          Login
        </button>
        <p className="
  mt-4
  text-center
">

  Don't have an account?

  <Link
    to="/register"
    className="
      text-blue-600
      ml-1
    "
  >
    Register
  </Link>

</p>
      </form>

    </div>
  );
};

export default LoginPage;