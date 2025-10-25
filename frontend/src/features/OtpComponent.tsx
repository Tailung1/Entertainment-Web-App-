import { useState } from "react";
import FloatingInput from "../shared/FloatingInput";
import { useMyContext } from "../useContext";
import { Spin } from "antd";

export default function OtpComponent() {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { loading, setLoading } = useMyContext();
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [otpEmailInput, setOtpEmailInput] = useState<string>("");
  const [backError, setBackError] = useState<string>("");

  const [errors, setErrors] = useState<{
    email: boolean;
    emailRegexError: boolean;
    [key: string]: boolean;
  }>({
    email: false,
    emailRegexError: false,
  });

  const handleChange = (field: string, val: string) => {
    setBackError("");
    if (field === "email") {
      if (emailRegex.test(val)) {
        setErrors((prev) => ({
          ...prev,
          [field]: false,
          emailRegexError: false,
        }));
      }
      setOtpEmailInput(val);
    }
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
      setShowOtpInput(data.ok);
      if (!data.ok) {
        setBackError(response.message);
      }
    } catch (err: any) {
      setBackError(err.message);
      setLoading(false);
    }
  };
  return (
    <div>
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
      <p className='relative'>
        {showOtpInput ? (
          "enter otp"
        ) : (
          <p className='absolute text-red-600 font-5'>{backError} </p>
        )}
      </p>
      <button
        disabled={loading}
        onClick={handleEmailCheck}
        className={` bg-red-800 {${
          loading && "bg-violet-900 cursor-progress "
        }} w-full cursor-pointer   text-white py-3 mt-10 mb-6  rounded-lg ${
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
