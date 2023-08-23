import { ReactNode } from "react";
import { Navbar } from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs text-main/80 bg-forth">
      <Navbar />
      <main className="flex flex-col items-center justify-center mt-4 px-[5%]">
        {children}
      </main>
      <footer className="flex items-center justify-center w-full h-16 bg-forth mt-5">
        <p className="text-xs text-center text-main/70">
          Copyright © 2023 TAIZEN | All rights reserved
        </p>
      </footer>
    </div>
  );
}
