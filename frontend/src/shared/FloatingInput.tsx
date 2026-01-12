import { motion, number } from "framer-motion";
import { useEffect, useState } from "react";
import { useMyContext } from "../useContext";
import { ShowPasswordIcon } from "./Icon";
import { HidePasswordIcon } from "./Icon";

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
 const inputId = label.toLowerCase().replace(" ", "-"); 


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
        htmlFor={inputId}
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
        id={inputId}
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
          className={`absolute ${
            isError ? "right-[-20px]" : "right-0"
          } lg:right-0  top-0 duration-300 transition-all`}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
      )}
      {backError &&
      type === "password" &&
      location.pathname === "/" ? (
        <p className='text-red-600 h-[24px]   cursor-pointer mt-[10px]'>
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
