import Link from "next/link";

export const navItems = [
  // TODO: add categories?
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Resume",
    path: "/resume",
  },
  {
    name: "Linktree",
    path: "/linktree",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export const Navbar = ({ toggle }: any) => {
  return (
    <div className="absolute top-0 h-14 z-20">
      <nav
        className="relative flex items-center justify-between w-screen p-4 font-mono text-gray-500 bg-black shadow-sm md:h-16 sm:h-10 md:px-8 sm:px-4"
        role="navigation"
      >
        <Link href="/" className="font-serif text-lg font-bold text-gray-300 ">
          TAIZEN
        </Link>
        <div className="cursor-pointer md:hidden" onClick={toggle}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
        <div className="hidden pr-8 md:block">
          {navItems.map((navItem) => {
            return (
              <Link
                href={navItem.path}
                className="px-3 py-2 text-gray-300 rounded hover:bg-gray-700"
                key={navItem.name}
              >
                {navItem.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
