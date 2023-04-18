import Link from 'next/link';
import { FaInstagramSquare, FaGithubSquare, FaLinkedin } from 'react-icons/fa';

export default function Icons() {
  return (
    <div className="flex items-center justify-center w-full mt-5 text-center">
      <Link
        href="https://www.instagram.com/taichi_tomi/"
        target="_blank"
        className="mr-3 text-gray-300 hover:text-pink-500"
      >
        <FaInstagramSquare className="w-7 h-7" />
      </Link>
      <Link
        href="https://github.com/taichi-de"
        target="_blank"
        className="mr-3 text-gray-300 hover:text-gray-600"
      >
        <FaGithubSquare className="w-7 h-7" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/taichi-tomioka-746241191/"
        target="_blank"
        className="text-gray-300 hover:text-blue-700"
      >
        <FaLinkedin className="w-7 h-7" />
      </Link>
    </div>
  );
}
