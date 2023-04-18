import Link from 'next/link';

import { navItems } from './Navbar';

export const Dropdown = ({ isOpen }: any) => {
  return (
    <div
      className={
        isOpen
          ? 'fixed top-10 grid grid-rows-4 text-center items-center bg-black z-30 w-screen p-4 '
          : 'hidden'
      }
    >
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
  );
};
