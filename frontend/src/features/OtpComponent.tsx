import { useState } from "react";
import FloatingInput from "../shared/FloatingInput";
import { useMyContext } from "../useContext";
import { Spin } from "antd";

import OtpInput from "./OtpInput";
import e from "express";

export default function OtpComponent() {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { loading, setLoading } = useMyContext();
  const [enablePassChange, setEnablePassChange] =
    useState<boolean>(false);
  const [enableOtpEnter, setEnableOtpEnter] =
    useState<boolean>(false);
  const [otpEmailInput, setOtpEmailInput] = useState<string>("");
  const [backError, setBackError] = useState<string>("");
  const [isBackError, setIsBackError] = useState<boolean>(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [errors, setErrors] = useState<{
    email: boolean;
    emailRegexError: boolean;
  }>({
    email: false,
    emailRegexError: false,
  });

  const handleChange = (field: "email", val: string) => {
    setBackError("");
    if (field === "email") {
      if (emailRegex.test(val)) {
        setErrors((prev) => ({
          ...prev,
          emailRegexError: false,
        }));
      }
      setOtpEmailInput(val);
    }
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleEmailCheck = async () => {
    const newErrors = {
      email: otpEmailInput.trim() === "",
      emailRegexError: !emailRegex.test(otpEmailInput),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).includes(true)) return;
    setLoading(true);
    try {
      const data = await fetch(
        "http://localhost:3000/api/users/generate-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: otpEmailInput,
          }),
        }
      );
      setLoading(false);
      const response = await data.json();
      setEnableOtpEnter(data.ok);
      if (!data.ok) {
        setBackError(response.message);
      }
    } catch (err: any) {
      setBackError(err.message);
      setLoading(false);
    }
  };
  const handleOtpCheck = async () => {
    setLoading(true);
    try {
      const request = await fetch(
        "http://localhost:3000/api/users/check-OTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, otpEmailInput }),
        }
      );
       if (!request.ok) {
         const response = await request.json();
         throw new Error(response.message);
       }
      const response = await request.json();

      console.log(response);

     
      setIsBackError(false);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err, "catched error");
      setIsBackError(true);
      setBackError(err);
    }
  };
  return (
    <div className='flex flex-col'>
      <div
        className={`${
          enableOtpEnter && "opacity-40 pointer-events-none"
        }`}
      >
        <FloatingInput
          label='Enter email'
          type='text'
          value={otpEmailInput}
          onChange={(val) => handleChange("email", val)}
          isError={`${
            errors.email
              ? "emailEmptyError"
              : errors.emailRegexError
              ? "emailRegexError"
              : ""
          }`}
        />
      </div>
      <div>
        {enableOtpEnter ? (
          <OtpInput otp={otp} setOtp={setOtp} />
        ) : (
          <p className='absolute text-red-600 font-5'>{backError} </p>
        )}
      </div>
      <button
        disabled={loading}
        onClick={enableOtpEnter ? handleOtpCheck : handleEmailCheck}
        className={` bg-red-800 {${
          loading && "bg-violet-900 cursor-progress "
        }} w-full cursor-pointer   text-white py-3 mt-10  mb-6  rounded-lg ${
          !loading && "hover:bg-red-700"
        } `}
      >
        {loading ? (
          <div className='flex justify-center items-center gap-5'>
            {" "}
            <p>Processing</p> <Spin />{" "}
          </div>
        ) : (
          "Send request"
        )}
      </button>
    </div>
  );
}
