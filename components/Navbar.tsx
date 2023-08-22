import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="">
      <nav
        className="text-center w-screen p-4 shadow-sm shadow-gray-500 md:h-16 sm:h-10"
        role="navigation"
      >
        <Link
          href="/"
          className="flex justify-center font-serif text-xl font-bold text-gray-400 px-auto"
        >
          <Image
            src="/taizen-logo.png"
            alt="logo"
            width={32}
            height={32}
            className="mr-3"
          />
          TAIZEN
        </Link>
      </nav>
    </div>
  );
};
