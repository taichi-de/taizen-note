import Link from "next/link";
import Image from "next/image";
import { MdConstruction } from "react-icons/md";

export const Navbar = () => {
  return (
    <div className="max-w-screen">
      <div className="flex items-center justify-center bg-main/90 text-fourth text-center py-1">
        - <MdConstruction className="mr-2" />
        <p>Under construction now</p> -
      </div>
      <nav
        className="text-center w-full p-4 shadow-sm shadow-gray/50 md:h-16 sm:h-10"
        role="navigation"
      >
        <Link
          href="/"
          className="flex justify-center font-serif text-xl font-bold px-auto"
        >
          <Image
            src="/taizen-logo-gray.png"
            alt="logo"
            width={32}
            height={32}
            className="mr-3"
          />
          TAIZEN NOTE
        </Link>
      </nav>
    </div>
  );
};
