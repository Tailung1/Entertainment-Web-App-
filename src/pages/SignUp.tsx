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
  });
  const handleChange = (
    field: "email" | "password" | "confirmPassword",
    val: string
  ) => {
    setInputValues(() => ({ ...inputValues, [field]: val }));
    // setInputCheck((prev) => ({ ...prev, [field]: true }));
    setInputCheck((prev) => ({ ...prev, [`${field}Error`]: false }));
  };
  const handleSubmit = () => {
    const newErrors = {
      emailError: inputValues.email.trim() === "",
      passwordError: inputValues.password.trim() === "",
      confirmPasswordError: inputValues.confirmPassword.trim() === "",
    };
    setInputCheck(newErrors);
  };

  return (
    <div className='bg-[#10141E] flex flex-col gap-16 items-center h-screen pt-[48px] px-[24px] pb-[170px]'>
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
            isError={inputCheck.emailError}
          />
          <FloatingInput
            onChange={(val) => handleChange("password", val)}
            value={inputValues.password}
            label='Password'
            type='password'
            isError={inputCheck.passwordError}
          />
          <FloatingInput
            onChange={(val) => handleChange("confirmPassword", val)}
            value={inputValues.confirmPassword}
            label='Confirm password'
            type='password'
            isError={inputCheck.confirmPasswordError}
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
