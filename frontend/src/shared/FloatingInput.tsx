import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMyContext } from "../useContext";

interface FloatingInputProps {
  label: string;
  type: string;
  value: string;
  PropsedOnChange: (val: string) => void;
  isError: string;
  backError: string;
}

export default function FloatingInput({
  label,
  type,
  value,
  PropsedOnChange,
  isError,
  backError,
}: FloatingInputProps) {
  const { setResetPassword, enablePassChange, setSignInBackError } =
    useMyContext();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = focused || value;
  useEffect(() => {
    if (backError) {
      setTimeout(() => {
        setSignInBackError("");
      }, 5000);
    }
  }, [backError]);

  return (
    <div className='relative w-full'>
      {/* Floating label */}
      <motion.label
        className={`absolute text-[12px] md:text-[16px] left-0 pointer-events-none ${
          isActive ? "text-indigo-500" : "text-gray-500"
        }`}
        animate={{
          y: isActive ? -25 : 0,
          x: isActive ? 0 : 16,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {label}
      </motion.label>

      {/* Input field */}
      <input
        type={type === "password" && showPassword ? "text" : type}
        className={`w-full border-b text-white text-[16px] pb-[6px] pl-[16px] outline-none bg-transparent ${
          isError ? "border-red-600" : "border-white/20"
        }`}
        value={value}
        onChange={(e) => PropsedOnChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete='off'
      />
      <p
        className={`text-red-500 text-[12px] md:text-[16px] absolute transition-all duration-300 ease-in-out  ${
          value.length > 16 ? " top-[-23px]" : "top-1 md:top-0"
        } right-2 md:right-4 lg:right-7`}
      >
        {isError === "emailEmptyError"
          ? "Can't be empty"
          : isError === "emailRegexError"
          ? "Invalid email format"
          : isError === "passwordEmptyError"
          ? "Can't be empty"
          : isError === "passwordLengthError"
          ? "Min. 5 characters"
          : ""}
      </p>

      {/* Password toggle */}
      {type === "password" && value && (
        <button
          type='button'
          className='absolute right-0 top-1'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='red'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='green'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>
          )}
        </button>
      )}
      {backError &&
      type === "password" &&
      location.pathname === "/" ? (
        <p className='text-red-600 h-[24px]  cursor-pointer mt-[10px]'>
          {backError || "Incorect credentials"}
        </p>
      ) : (
        type === "password" &&
        location.pathname === "/" &&
        !enablePassChange && (
          <button
            onClick={() => setResetPassword(true)}
            className='cursor-pointer mt-[10px] h-[18px]  hover:text-orange-300 text-orange-500'
          >
            Forgot password?
          </button>
        )
      )}
    </div>
  );
}
