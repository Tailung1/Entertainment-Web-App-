import Header from "./Header";
import Input from "./Input";
import { Outlet } from "react-router-dom";

export default function LayoutWithHeader() {
  return (
    <div className='lg:flex  bg-[#10141E] '>
      <header>
        <Header />
      </header>
      <main className='pt-3 lg:pt-16   min-h-screen  bg-[#10141E] '>
        <Input />
        <Outlet />
      </main>
    </div>
  );
}
