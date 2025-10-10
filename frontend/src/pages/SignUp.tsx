import { Link } from "react-router-dom";
import FloatingInput from "../shared/FloatingInput";
import { motion } from "framer-motion";
import { useState } from "react";
export default function SignUp() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputCheck, setInputCheck] = useState({
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    emailRegexError: false,
    passwordLengthError: false,
    confirmPasswordMatchError: false,
  });

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (
    field: "email" | "password" | "confirmPassword",
    val: string
  ) => {
    setInputValues((prev) => ({ ...prev, [field]: val }));
    setInputCheck((prev) => ({ ...prev, [`${field}Error`]: false }));

    if (field === "email") {
      if (emailRegex.test(val)) {
        setInputCheck((prev) => ({
          ...prev,
          emailRegexError: false,
        }));
      }
    }

    if (field === "password") {
      if (val.length >= 5) {
        setInputCheck((prev) => ({
          ...prev,
          passwordLengthError: false,
        }));
      }
    }

    if (field === "confirmPassword") {
      if (val === inputValues.password) {
        setInputCheck((prev) => ({
          ...prev,
          confirmPasswordMatchError: false,
        }));
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      emailError: inputValues.email.trim() === "",
      passwordError: inputValues.password.trim() === "",
      confirmPasswordError: inputValues.confirmPassword.trim() === "",
      emailRegexError: !emailRegex.test(inputValues.email),
      passwordLengthError: inputValues.password.length < 5,
      confirmPasswordMatchError:
        inputValues.password !== inputValues.confirmPassword,
    };

    setInputCheck(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: inputValues.email,
              password: inputValues.password,
            }),
          }
        );

        if (response.ok) {


          const data = await response.json();
          console.log(data);
        } else {
          const errorData = await response.json();
          console.error(errorData,"errrrr");
        }
      } catch (error) {
        console.error("Network error:");
      }
    }
  };

  return (
    <div className='bg-[#10141E] flex flex-col gap-16 items-center justify-center h-screen pt-[48px] px-[24px] pb-[170px]'>
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
        <h2 className='text-[32px] mb-[40px] text-white'>Sign Up</h2>

        <div className='flex flex-col gap-[30px]'>
          <FloatingInput
            onChange={(val) => handleChange("email", val)}
            value={inputValues.email}
            label='Email address'
            type='text'
            isError={
              inputCheck.emailError
                ? "emailEmptyError"
                : inputCheck.emailRegexError
                ? "emailRegexError"
                : ""
            }
          />
          <FloatingInput
            onChange={(val) => handleChange("password", val)}
            value={inputValues.password}
            label='Password'
            type='password'
            isError={
              inputCheck.passwordError
                ? "passwordEmptyError"
                : inputCheck.passwordLengthError
                ? "passwordLengthError"
                : ""
            }
          />
          <FloatingInput
            onChange={(val) => handleChange("confirmPassword", val)}
            value={inputValues.confirmPassword}
            label='Confirm password'
            type='password'
            isError={
              inputCheck.confirmPasswordError
                ? "confirmPasswordEmptyError"
                : inputCheck.confirmPasswordMatchError
                ? "confirmPasswordMatchError"
                : ""
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          className='w-full cursor-pointer text-white py-3 mt-10 mb-6 bg-[#FC4747] rounded-md'
        >
          Sign up
        </button>

        <p className='text-white text-[15px] text-center'>
          Already have an account?{" "}
          <Link
            to={"/"}
            className='text-[#FC4747] ml-[6px] cursor-pointer'
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
