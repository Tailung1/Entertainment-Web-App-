import { SetStateAction, useState } from "react";
import FloatingInput from "../../shared/FloatingInput";
import { useMyContext } from "../../useContext";
import { Spin } from "antd";
import OtpInput from "./OtpInput";
import ResetPassword from "./ResetPassword";

export default function OtpComponent({
  setErrors,
  setEmailInput,
  setPasswordInput,
}: {
  setErrors: any;
  setEmailInput: React.Dispatch<SetStateAction<string>>;
  setPasswordInput: React.Dispatch<SetStateAction<string>>;
}) {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const {
    loading,
    setLoading,
    enablePassChange,
    setEnablePassChange,
    setResetPassword,
  } = useMyContext();

  const [timer, setTimer] = useState(10);
  const [enableOtpEnter, setEnableOtpEnter] =
    useState<boolean>(false);
  const [otpEmailInput, setOtpEmailInput] = useState<string>("");
  const [backError, setBackError] = useState<string>("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [errors, setErrorss] = useState<{
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
        setErrorss((prev) => ({
          ...prev,
          emailRegexError: false,
        }));
      }
      setOtpEmailInput(val);
    }
    setErrorss((prev) => ({ ...prev, [field]: false }));
  };

  const handleEmailCheck = async () => {
    const newErrors = {
      email: otpEmailInput.trim() === "",
      emailRegexError: !emailRegex.test(otpEmailInput),
    };
    setErrorss(newErrors);
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
      setTimer(60);
      if (!data.ok) {
        setBackError(response.message);
      }
    } catch (err: any) {
      if (
        err instanceof TypeError &&
        err.message === "Failed to fetch"
      ) {
        setBackError("No internet. Please check your connection");
      } else {
        setBackError("check internett");
      }
      setLoading(false);
    }
  };

  const handleOtpCheck = async () => {
    if (otp.some((item) => item === "")) return;
    setLoading(true);

    try {
      const otpString = Number(otp.join(""));
      const request = await fetch(
        "http://localhost:3000/api/users/check-OTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otpString, otpEmailInput }),
        }
      );
      if (!request.ok) {
        const response = await request.json();
        setBackError(response.message);
        throw new Error(response.message);
      }
      setEnablePassChange(true);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };
  return (
    <div className='flex flex-col '>
      {!enablePassChange && (
        <div
          className={`${
            enableOtpEnter && "opacity-40 pointer-events-none"
          } `}
        >
          <FloatingInput
            label='Enter email'
            type='text'
            value={otpEmailInput}
            PropsedOnChange={(val) => handleChange("email", val)}
            isError={`${
              errors.email
                ? "emailEmptyError"
                : errors.emailRegexError
                ? "emailRegexError"
                : ""
            }`}
            backError={backError}
          />
        </div>
      )}
      <div className='relative'>
        {enablePassChange ? (
          <ResetPassword otpEmailInput={otpEmailInput} />
        ) : enableOtpEnter ? (
          <OtpInput
            otp={otp}
            setOtp={setOtp}
            backError={backError}
            setBackError={setBackError}
            handleEmailCheck={handleEmailCheck}
            timer={timer}
            setTimer={setTimer}
          />
        ) : (
          <p className='absolute text-red-600 top-1'>{backError} </p>
        )}
      </div>
      <div className='flex flex-col'>
        {!enablePassChange && (
          <button
            disabled={loading}
            onClick={
              enableOtpEnter ? handleOtpCheck : handleEmailCheck
            }
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
        )}

        <div
          onClick={() => {
            setResetPassword(false),
              setEnablePassChange(false),
              setErrors({
                email: false,
                password: false,
                emailRegexError: false,
                passwordLengthError: false,
              });
          }}
          className='h-[10px] flex items-center justify-start gap-2  max-w-[160px]  cursor-pointer '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='yellow'
            className='transition-all duration-100 size-5 hover:size-7 '
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
            />
          </svg>

          <button
            onClick={() => {
              setEmailInput(""), setPasswordInput("");
            }}
            className='text-violet-500 text-lg font-semibold hover:text-violet-700 transition duration-300'
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  );
}
