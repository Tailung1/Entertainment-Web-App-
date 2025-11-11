import FloatingInput from "../../shared/FloatingInput";
import { useState } from "react";
import { motion } from "framer-motion";
import { Spin } from "antd";
import { useMyContext } from "../../useContext";

export default function ResetPassword({
  otpEmailInput,
}: {
  otpEmailInput: string;
}) {
  const { loading, setEnablePassChange } = useMyContext();
  const [inputValues, setInputValues] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [inputCheck, setInputCheck] = useState({
    newPasswordError: false,
    passwordLengthError: false,
    confirmNewPasswordError: false,
    confirmPasswordMatchError: false,
  });

  const handleChange = (
    field: "newPassword" | "confirmNewPassword",
    val: string
  ) => {
    setInputValues((prev) => ({ ...prev, [field]: val }));

    if (field === "newPassword") {
      if (val.length >= 5) {
        setInputCheck((prev) => ({
          ...prev,
          passwordLengthError: false,
        }));
      }
    }

    if (field === "confirmNewPassword") {
      if (val === inputValues.newPassword) {
        setInputCheck((prev) => ({
          ...prev,
          confirmPasswordMatchError: false,
        }));
      }
    }
    setInputCheck((prev) => ({
      ...prev,
      [`${field}Error`]: false,
    }));
  };

  const hanldeSubmit = () => {
    const pass = inputValues.newPassword.trim();
    const confirmPass = inputValues.confirmNewPassword.trim();
    const newError = {
      newPasswordError: pass.length < 1,
      passwordLengthError: pass.length < 5,
      confirmNewPasswordError: confirmPass.length < 1,
      confirmPasswordMatchError: confirmPass !== pass,
    };
    setInputCheck(newError);

    if (Object.values(newError).includes(true)) return;

    let sendRequest = async () => {
      try {
        const sendData = await fetch(
          "http://localhost:3000/api/users/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: inputValues.newPassword,
              otpEmailInput,
            }),
          }
        );
        if (!sendData.ok) {
          const errorResponse = await sendData.json();
          throw new Error(
            errorResponse.message || "Failed to change password"
          );
        }
        const response = await sendData.json();
        console.log(response.message);
      } catch (err: any) {
        console.log(err.message || "An error occurred", "catched");
      }
    };
    sendRequest();
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
        value={inputValues.newPassword}
        label='New password'
        type='password'
        isError={
          inputCheck.newPasswordError
            ? "passwordEmptyError"
            : inputCheck.passwordLengthError
            ? "passwordLengthError"
            : ""
        }
      />
      <FloatingInput
        onChange={(val) => handleChange("confirmNewPassword", val)}
        value={inputValues.confirmNewPassword}
        label='Confirm new password'
        type='password'
        isError={
          inputCheck.confirmNewPasswordError
            ? "passwordEmptyError"
            : inputCheck.confirmPasswordMatchError
            ? "bla"
            : ""
        }
      />
      <button
        onClick={hanldeSubmit}
        disabled={loading}
        className={` bg-red-800 {${
          loading && "bg-violet-900 cursor-progress "
        }} w-full cursor-pointer   text-white py-3 mt-5  mb-6  rounded-lg ${
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
