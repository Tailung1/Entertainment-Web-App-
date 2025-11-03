import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export default function OtpInput({
  otp,
  setOtp,
  backError,
  setBackError,
  handleEmailCheck,
}: {
  otp: string[];
  setOtp: any;
  backError: string;
  setBackError: any;
  handleEmailCheck: () => void;
}) {
  const [timer, setTimer] = useState(10);
  const [otpEnterTimeExpired, setOtpEnterTimeExpired] =
    useState(false);

  useEffect(() => {
    if (timer === 0) {
      setOtpEnterTimeExpired(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
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
        ) : otpEnterTimeExpired ? (
          <p
            onClick={() => {
              handleEmailCheck(), setTimer(10),setOtpEnterTimeExpired(false);
            }}
            className='cursor-pointer'
          >
            Request recover code again{" "}
          </p>
        ) : (
          "OTP Sent! Check your email and enter the code below."
        )}
      </p>

      <div
        className={`otp-container ${
          otpEnterTimeExpired && "opacity-40 pointer-events-none"
        }`}
      >
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
        {!otpEnterTimeExpired && (
          <div className='absolute top-[-35px] right-0  text-violet-700      '>
            {`Time Left: ${timer}`}
          </div>
        )}
      </div>
    </motion.div>
  );
}
