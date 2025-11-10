import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export default function OtpInput({
  otp,
  setOtp,
  backError,
  setBackError,
  handleEmailCheck,
  timer,
  setTimer,
}: {
  otp: string[];
  setOtp: any;
  backError: string;
  setBackError: any;
  handleEmailCheck: () => void;
  timer: number;
  setTimer: (val: any) => void;
}) {
  useEffect(() => {
    if (timer === 0) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prevTimer: number) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: any, index: number) => {
    setBackError("");
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        document.getElementById(`Otp-input-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex flex-col items-center gap-[20px] mt-[30px]'
    >
      <p
        className={`${
          backError ? "text-red-600" : "text-green-600 "
        } h-[55px]`}
      >
        {backError ? (
          backError
        ) : timer === 0 ? (
          <p
            onClick={() => {
              handleEmailCheck();
            }}
            className='cursor-pointer'
          >
            Request recover code again{" "}
          </p>
        ) : (
          "OTP Sent! Check your email and enter the code below."
        )}
      </p>

      {timer !== 0 && (
        <div className={"otp-container"}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`Otp-input-${index}`}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              className='otp-input'
            />
          ))}
          {timer !== 0 && (
            <div className='absolute top-[-35px] right-0  text-violet-700      '>
              {`Time Left: ${timer}`}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
