import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const checkAuth = localStorage.getItem("auth-token");
  if (!checkAuth) {
    navigate("/");
  }

  return <div></div>;
}
