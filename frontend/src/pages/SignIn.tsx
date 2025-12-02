import FloatingInput from "../shared/FloatingInput";
import { useMyContext } from "../useContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Spin } from "antd";
import OtpComponent from "../features/OTP/OtpComponent";

export default function SignIn() {
  const {
    loading,
    setLoading,
    resetPassword,
    setSignInBackError,
    signInBackError,
  } = useMyContext();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    emailRegexError: false,
    passwordLengthError: false,
  });

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (
    field: "email" | "password" | "otpEmail",
    value: string
  ) => {
    if (field === "email") {
      if (emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,

          emailRegexError: false,
        }));
      }
      setEmailInput(value);
    }
    if (field === "password") {
      if (value.length > 4) {
        setErrors((prev) => ({
          ...prev,
          passwordLengthError: false,
        }));
      }

      setPasswordInput(value);
    }
    setErrors((prev) => ({ ...prev, [field]: false }));
  };
  // Remove error as soon as user starts typing
  const handleSubmit = async () => {
    const newErrors = {
      email: emailInput.trim() === "",
      password: passwordInput.trim() === "",
      emailRegexError: !emailRegex.test(emailInput),
      passwordLengthError: passwordInput.length < 5,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      setLoading(true);
      try {
        const validateReuqest = await fetch(
          "http://localhost:3000/api/users/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailInput,
              password: passwordInput,
            }),
          }
        );
        const response = await validateReuqest.json();
        setLoading(false);
        if (!validateReuqest.ok) {
          throw new Error(response.message);
        } else {
          localStorage.setItem("auth-token", response.token);
          navigate("/home");
        }
      } catch (e: any) {
      
        setSignInBackError(e.message);
        setLoading(false);
        // toast.error("Unexpected error");
      }
    }
  };

  return (
    <div className='bg-[#10141E] flex flex-col gap-16 items-center  h-screen pt-[48px] px-[24px] '>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='26'
        viewBox='0 0 32 26'
        fill='none'
      >
        <path
          d='M25.6 0L28.8 6.4H24L20.8 0H17.6L20.8 6.4H16L12.8 0H9.6L12.8 6.4H8L4.8 0H3.2C1.432 0 0.016 1.432 0.016 3.2L0 22.4C0 24.168 1.432 25.6 3.2 25.6H28.8C30.568 25.6 32 24.168 32 22.4V0H25.6Z'
          fill='#FC4747'
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className='bg-[#161D2F] w-full max-w-sm flex flex-col rounded-xl pt-6 px-6 pb-8'
      >
        <h2 className='text-[32px] mb-[40px] text-white'>
          {resetPassword ? "Reset password" : "Login"}
        </h2>

        {resetPassword ? (
          <OtpComponent setErrors={setErrors} />
        ) : (
          <div>
            <div className='flex flex-col gap-[30px]'>
              <FloatingInput
                label='Email address'
                type='text'
                value={emailInput}
                PropsedOnChange={(val) => handleChange("email", val)}
                isError={`${
                  errors.email
                    ? "emailEmptyError"
                    : errors.emailRegexError
                    ? "emailRegexError"
                    : ""
                }`}
                backError={signInBackError}
              />
              <FloatingInput
                label='Password'
                type='password'
                value={passwordInput}
                PropsedOnChange={(val) =>
                  handleChange("password", val)
                }
                isError={`${
                  errors.password
                    ? "passwordEmptyError"
                    : errors.passwordLengthError
                    ? "passwordLengthError"
                    : ""
                }`}
                backError={signInBackError}
              />
            </div>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className={` bg-red-800 {${
                loading && "bg-violet-900 cursor-progress "
              }} w-full cursor-pointer   text-white py-3 mt-10 mb-6  rounded-lg ${
                !loading && "hover:bg-red-700"
              } `}
            >
              {loading ? (
                <div className='flex justify-center items-center gap-5'>
                  <p className=' tracking-widest text-[16px]'>
                    Processing
                  </p>
                  <Spin />
                </div>
              ) : (
                "Login to your account"
              )}
            </button>

            <p className='text-white text-[15px] text-center'>
              Don’t have an account?{" "}
              <Link
                to={"/signup"}
                className='text-[#FC4747] ml-[6px] cursor-pointer '
              >
                Sign Up
              </Link>
            </p>
          </div>
        )}
      </motion.div>
      {/* <ToastContainer
        theme='dark'
        position='top-left'
        autoClose={2000}
        limit={2}
        className='my-toast-container'
      /> */}
    </div>
  );
}
