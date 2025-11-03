import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export default function OtpInput({
  otp,
  setOtp,
  backError,
  setBackError,
}: {
  otp: string[];
  setOtp: any;
  backError: string;
  setBackError: any;
}) {
  const [timer, setTimer] = useState(60);
  const [otpEnterTimeExpired, setOtpEnterTimeExpired] =
    useState(false);

  useEffect(() => {
    if (timer === 0) {
      setOtpEnterTimeExpired(true);
      return;
    }
   const interval= setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    },1000);

    return ()=>clearInterval(interval)
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
      className=' flex flex-col items-center gap-[20px] mt-[30px]'
    >
      <p
        className={`${
          backError ? "text-red-600" : "text-green-600 "
        } h-[55px]`}
      >
        {backError
          ? backError
          : "OTP Sent! Check your email and enter the code below."}
      </p>

      <div className='otp-container'>
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
        <p className="absolute top-11 right-0">{`Time Left:${timer}`}</p>
      </div>
    </motion.div>
  );
}
