import { ReactNode, useEffect, useState } from 'react';

import { Dropdown } from './nabvar/Dropdown';
import { Navbar } from './nabvar/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', hideMenu);
    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  return (
    // FIXME:
    <div className="flex flex-col items-center justify-center max-h-full font-mono text-sm text-gray-600 overflow-y-auto scroll-y">
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <main className="flex flex-col items-center justify-center flex-1 w-screen">
        {/* <div
          className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: 'url(/birdBg.jpg)',
          }}
        > */}
          {children}
        {/* </div> */}
      </main>
      <footer className="absolute bottom-0 z-20 flex items-center justify-center w-full h-10 bg-black">
        <p className="text-xs text-center text-gray-500">
          Copyright © 2023 TAIZEN | All rights reserved
        </p>
      </footer>
    </div>
  );
}
