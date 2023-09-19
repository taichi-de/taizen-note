/* eslint-disable react/display-name */
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Text, Button } from "@mantine/core";
import Icons from "./Icons";
import { useSelectBlogs } from "@/hooks/useSelectBlogs";
import { useAllTagsState } from "@/atoms/allTagsAtom";
import { useAllBlogsState } from "@/atoms/allBlogsAtom";

const RightSidebar = memo(() => {
  const { allTags } = useAllTagsState();
  const { allBlogs } = useAllBlogsState();
  const { selectTag } = useSelectBlogs();

  return (
    <div className="p-8 leading-loose text-center font-medium text-content bg-main w-full rounded-sm">
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
        <h2 className="text-base my-2">
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
          {allBlogs.slice(0, 5).map((blog) => (
            <div
              key={blog.id}
              className="hover:cursor-pointer hover:text-third"
            >
              <span className="mr-2">&gt;</span>
              <Link href={`/blog/${blog.id}`}>
                {blog.title.slice(0, 60)} ...
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="px-auto border border-third">
        <Text size="lg" className="bg-third text-main mb-2">
          Tags
        </Text>
        <div className="flex flex-wrap pl-2 text-left over">
          <Button
            onClick={() => selectTag("all")}
            className="bg-secondary rounded-full mb-2 mr-2 p-2 hover:bg-blue"
          >
            <Text>All</Text>
          </Button>
          {!allTags.length && (
            <p className="bg-secondary rounded-full mb-2 mr-2 p-2">No Tag</p>
          )}
          {allTags.map((tag) => (
            <Button
              key={tag}
              onClick={() => selectTag(tag)}
              className="bg-secondary rounded-full mb-2 mr-2 p-2 hover:bg-blue"
            >
              <Text>{tag}</Text>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default RightSidebar;
