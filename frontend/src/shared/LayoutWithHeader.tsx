import Header from "./Header";
import Input from "./Input";
import { Outlet } from "react-router-dom";

export default function LayoutWithHeader() {
  return (
    <div className='lg:flex min-h-screen  bg-[#10141E] '>
      <header className='lg:fixed'>
        <Header />
      </header>
      <main className='flex flex-col overflow-hidden   ml-3 md:ml-5 lg:ml-[120px] pt-3 lg:pt-8    bg-[#10141E] '>
        <Input />
        <Outlet />
      </main>
    </div>
  );
}
