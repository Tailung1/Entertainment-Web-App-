import { useState } from "react";

export default async function OtpInput({
  otpEmailInput,
}: {
  otpEmailInput: string;
}) {
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [backResponse, setBackResponse] = useState<string>("");
  const [isBackError, setIsBackError] = useState<boolean>(false);

  const handleOtpCheck = async () => {
    try {
      const request = await fetch("http://localhost:3000/checkOTP", {
        method: "POST",
        headers: {
          "Conent-Type": "application/json",
        },
        body: JSON.stringify({ enteredOtp, otpEmailInput }),
      });
      const response = await request.json();
      if (!request.ok) {
        throw new Error(response.message);
      }
      setIsBackError(false);
    } catch (err: any) {
      setIsBackError(true);
      setBackResponse(err);
    }
  };
  return <div>OtpInput</div>;
}
