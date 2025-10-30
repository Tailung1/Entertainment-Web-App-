import FloatingInput from "../../shared/FloatingInput";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ResetPassword() {
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
    </motion.div>
  );
}
