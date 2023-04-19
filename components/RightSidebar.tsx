import Image from "next/image";
import Link from "next/link";

const RightSidebar = () => {
  return (
    <div className="p-8 leading-loose text-center text-sky-500 bg-gray-200 w-full">
      <div className="p-4 text-gray-700 px-auto border border-cyan-600">
        <Image
          className="my-4 mx-auto rounded-full"
          src="/profile1.jpeg"
          width={120}
          height={120}
          alt="profile"
        />
        <h2 className="text-base font-medium my-2">
          Hi! I&apos;m{" "}
          <Link
            href="https://taizen-dev.com"
            className="text-cyan-600 hover:text-cyan-400"
          >
            Taichi
          </Link>
        </h2>
        <div className="text-left">
          <p>Japan -&gt; Germany</p>
          <p>Like: TS, Next.js / Flask / Tailwindcss</p>
          <p>Speak: Japanese / English(B2) / German(C1)</p>
          <p>Love: Tech & Travel & Nature</p>
        </div>
      </div>
      <div className="my-4 p-4 text-gray-700 px-auto border border-cyan-600">
        <h2 className="text-base font-medium text-bold mb-2">
          Recommendation Area
        </h2>
        <div className="text-left text-wrap hover:text-blue-500">
          {/* TODO: add recommendation from api -> map */}
          <div>
            <span className="mr-2">&gt;</span>
            <Link href="#">
              Next.js/Axios/Flask(Python)で作るフルスタックForm
            </Link>
          </div>
          <div>
            <span className="mr-2">&gt;</span>
            <Link href="#" className="my-2">
              How to implement a loading function in react
            </Link>
          </div>
          <div>
            <span className="mr-2">&gt;</span>
            <Link href="#">
              [Next.js + Tailwindcss + MantineUI + Vercel + microCMS]
              microCMSとNext.js でブログを作る
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 text-gray-700 px-auto border border-cyan-600">
        <h2 className="text-base font-medium text-bold mb-2">Archives Area</h2>
        <div className="text-left">
          <p>fugit impedit doloremque, </p>
          <p>laboriosam sequi! </p>
          <p>Similique atque </p>
          <p>enim explicabo!</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
