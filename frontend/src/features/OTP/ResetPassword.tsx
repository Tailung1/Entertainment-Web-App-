import FloatingInput from "../../shared/FloatingInput";
import { useState } from "react";
import { motion } from "framer-motion";
import { Spin } from "antd";
import { useMyContext } from "../../useContext";

export default function ResetPassword() {
    const {loading}=useMyContext()
  const [inputValues, setInputValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inputCheck, setInputCheck] = useState({
    passwordError: false,
    confirmPasswordError: false,
    passwordLengthError: false,
    confirmPasswordMatchError: false,
  });

  const handleChange = (
    field: "newPassword" | "confirmNewPassword",
    val: string
  ) => {
    setInputValues((prev) => ({ ...prev, [field]: val }));
    setInputCheck((prev) => ({
      ...prev,
      [`${field}Error`]: false,
    }));

    if (field === "newPassword") {
      if (val.length >= 5) {
        setInputCheck((prev) => ({
          ...prev,
          passwordLengthError: false,
        }));
      }
    }

    if (field === "confirmNewPassword") {
      if (val === inputValues.password) {
        setInputCheck((prev) => ({
          ...prev,
          confirmPasswordMatchError: false,
        }));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex flex-col gap-7 mt-12'
    >
      <FloatingInput
        onChange={(val) => handleChange("newPassword", val)}
        value={inputValues.password}
        label='New password'
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
        onChange={(val) => handleChange("confirmNewPassword", val)}
        value={inputValues.confirmPassword}
        label='Confirm new password'
        type='password'
        isError={
          inputCheck.confirmPasswordError
            ? "confirmPasswordEmptyError"
            : inputCheck.confirmPasswordMatchError
            ? "confirmPasswordMatchError"
            : ""
        }
      />
      <button
        disabled={loading}
        className={` bg-red-800 {${
          loading && "bg-violet-900 cursor-progress "
        }} w-full cursor-pointer   text-white py-3 mt-10  mb-6  rounded-lg ${
          !loading && "hover:bg-red-700"
        } `}
      >
        {loading ? (
          <div className='absolute justify-center items-center gap-5'>
            {" "}
            <p>Processing</p> <Spin />{" "}
          </div>
        ) : (
          "Send request"
        )}
      </button>
    </motion.div>
  );
}
