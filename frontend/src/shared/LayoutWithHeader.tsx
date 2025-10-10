import Header from "../Header";
import Input from "./Input";
import { Outlet } from "react-router-dom";

export default function LayoutWithHeader() {
  return (
    <div className='lg:flex bg-[#10141E]'>
      <header>
        <Header />
      </header>
      <main className="pt-7">
        <Input />
        <Outlet />
      </main>
    </div>
  );
}
