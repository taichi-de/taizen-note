import Link from "next/link";
import { FaInstagramSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";

export default function Icons() {
  return (
    <div className="flex items-center justify-center w-full my-2 text-center">
      <Link
        href="https://www.instagram.com/taichi_tomi/"
        target="_blank"
        className="mr-3 bg-transparent text-third/70 hover:text-pink/50"
      >
        <FaInstagramSquare className="w-7 h-7" />
      </Link>
      <Link
        href="https://github.com/taichi-de"
        target="_blank"
        className="mr-3 bg-transparent text-third/70 hover:text-yellow/50"
      >
        <FaGithubSquare className="w-7 h-7" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/taichi-tomioka-746241191/"
        target="_blank"
        className="bg-transparent text-third/70 hover:text-blue/50"
      >
        <FaLinkedin className="w-7 h-7" />
      </Link>
    </div>
  );
}
