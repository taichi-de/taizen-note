import { ReactNode } from "react";
import { Navbar } from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen text-sm text-gray-600 bg-slate-800">
      <Navbar />
      <main className="px-[5%]">{children}</main>
      <footer className="flex items-center justify-center w-full h-16 bg-slate-800 mt-5">
        <p className="text-xs text-center text-gray-500">
          Copyright © 2023 TAIZEN | All rights reserved
        </p>
      </footer>
    </div>
  );
}
