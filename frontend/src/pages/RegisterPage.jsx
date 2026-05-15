import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

const RegisterPage = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",
      username: "",
      password: "",
      role: "EMPLOYEE"
    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "auth/register/",
          formData
        );

        alert(
          "Registration successful!"
        );

        navigate("/");

      } catch (error) {

        console.log(
          error.response.data
        );

        alert(
          JSON.stringify(
            error.response.data
          )
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
          Register
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          onChange={handleChange}
        />

        <select
          name="role"
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          onChange={handleChange}
        >

          <option value="EMPLOYEE">
            Employee
          </option>

          <option value="ADMIN">
            Admin
          </option>

        </select>

        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
          "
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default RegisterPage;