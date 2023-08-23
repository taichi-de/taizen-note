import Image from "next/image";
import Link from "next/link";
import { Text } from "@mantine/core";
import Icons from "./Icons";

const RightSidebar = () => {
  const Tags = [
    "Next.js",
    "Python",
    "Tailwindcss",
    "MantineUI",
    "REST API",
    "microCMS",
  ];

  return (
    <div className="p-8 leading-loose text-center font-medium text-title bg-main w-full rounded-sm">
      <div className="pb-4 px-auto border border-third">
        <Text size="lg" className="bg-third text-main">
          Profile
        </Text>
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
            className="text-third hover:text-secondary"
          >
            Taichi
          </Link>
        </h2>
        <Icons />
        <div className="text-left px-8">
          <p>Based in: (Japan -&gt;) Germany</p>
          <p>Like: Next.js, TS / Python / Tailwindcss</p>
          <p>Speak: Japanese / English / German</p>
          <p>Love: Tennis & Travel & Gardening</p>
        </div>
      </div>
      <div className="my-4 pb-4 px-auto border border-third">
        <Text size="lg" className="bg-third text-main mb-2">
          Latest Posts
        </Text>
        <div className="text-left text-wrap px-4">
          {/* TODO: add recommendation from api -> map */}
          <div className="hover:pointer hover:text-third">
            <span className="mr-2">&gt;</span>
            <Link href="#">
              Next.js/Axios/Flask(Python)で作るフルスタックForm
            </Link>
          </div>
          <div className="hover:pointer hover:text-third">
            <span className="mr-2">&gt;</span>
            <Link href="#" className="my-2">
              How to implement a loading function in react
            </Link>
          </div>
          <div className="hover:pointer hover:text-third">
            <span className="mr-2">&gt;</span>
            <Link href="#">
              [Next.js + Tailwindcss + MantineUI + Vercel + microCMS]
              microCMSとNext.js でブログを作る
            </Link>
          </div>
        </div>
      </div>
      <div className="px-auto border border-third">
        <Text size="lg" className="bg-third text-main mb-2">
          Tags
        </Text>
        <div className="flex flex-wrap pl-2 text-left over">
          {Tags.map((tag) => {
            return (
              <Link
                href="#"
                key={tag}
                className="bg-secondary rounded-full mb-2 mr-2 p-2 hover:pointer"
              >
                # {tag}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
