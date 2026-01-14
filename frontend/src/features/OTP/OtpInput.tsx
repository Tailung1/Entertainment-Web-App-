import { motion } from "framer-motion";
import { useEffect } from "react";

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
      setOtp(["", "", "", "", "", ""]);
      setBackError(false);
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

      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`Otp-input-${index + 1}`)?.focus();
      }

      if (value === "") {
        document.getElementById(`Otp-input-${index}`)?.focus();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
    }`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex flex-col items-center gap-[20px] mt-[30px]'
    >
      <div
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
      </div>

      {timer !== 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='otp-container md:gap-4 lg:gap-5'
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`Otp-input-${index}`}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              className='otp-input md:w-[40px]'
            />
          ))}
          {timer !== 0 && (
            <div className='absolute w-[30px] top-[-35px] right-10 text-violet-700'>
              {formatTime(timer)}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
