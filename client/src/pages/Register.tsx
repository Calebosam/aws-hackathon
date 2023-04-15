import { Fragment, useState } from "react";
import register_bg from "../assets/register-bg.jpg";

//Function imports
import { onRegister } from "../api/auth";

function Register() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
      try {
        console.log(values)
        const result = await onRegister(values);
        console.log(result);
    } catch (error: any) {
      console.error(error.response);
    }
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className="w-screen h-screen bg-white flex">
        <div className="left w-[50vw] bg-register-bg bg-cover  bg-left bg-no-repeat"></div>
        <div className="right w-[50vw] p-48 bg-[#fbfaff] flex items-center justify-center">
          <div className="content w-full text-slate-950">
            <h1 className="font-bold text-7xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-pink-700">
              Sign up
            </h1>
            <p className="max-w-xl mt-6">
              <span className="font-bold text-2xl leading-10">Welcome to Lizo File Server!</span> <br />
              To get started, fill this form and verify your account via a confirmation code to your email. Once you're
              verified, you can browse and download important documents, search our file server, and share files
              directly to any email.
            </p>

            <form onSubmit={(e) => onSubmit(e)}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={(e) => onChange(e)}
                value={values.first_name}
                required
                className="bg-transparent mt-8 border-2 border-transparent w-full px-4 border-b-gray-400 font-[600]"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={(e) => onChange(e)}
                value={values.last_name}
                required
                className="bg-transparent mt-8 border-2 border-transparent w-full px-4 border-b-gray-400 font-[600]"
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => onChange(e)}
                value={values.email}
                required
                className="bg-transparent mt-8 border-2 border-transparent w-full px-4 border-b-gray-400 font-[600]"
              />
              <input
                type="text"
                name="password"
                placeholder="Password"
                onChange={(e) => onChange(e)}
                value={values.password}
                required
                className="bg-transparent mt-8 border-2 border-transparent w-full px-4 border-b-gray-400 font-[600]"
              />
              <br />
              <button
                type="submit"
                className="text-white mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-700 py-4 w-full"
              >
                Sign up
              </button>
              <p className="max-w-lg mt-5">
                Already have an account?{" "}
                <a href="/" className="text-emerald-700 underline">
                  Log in here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
