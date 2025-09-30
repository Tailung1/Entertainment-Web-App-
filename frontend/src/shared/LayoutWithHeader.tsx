import Header from "../Header";
import Input from "./Input";
import { Outlet } from "react-router-dom";

export default function LayoutWithHeader() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Input />
        <Outlet />
      </main>
    </div>
  );
}
