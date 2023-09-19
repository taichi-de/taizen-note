import { InferGetStaticPropsType, NextPage } from "next";
import { client } from "../libs/client";
import Link from "next/link";
import BlogLayout from "../components/BlogLayout";
import RightSidebar from "../components/RightSidebar";
import { useEffect, useState } from "react";
import type { Blog, Category, Tag } from "../types/blog";
import CategoryTabs from "@/components/CategoryTabs";
import Pagination from "@/components/Pagination";
import { useAllBlogsState } from "@/atoms/allBlogsAtom";
import { useAllCategoriesState } from "@/atoms/allCategoriesAtom";
import { useAllTagsState } from "@/atoms/allTagsAtom";
import { useShowBlogsState } from "@/atoms/showBlogsAtom";
import BlogCard from "@/components/BlogCard";

type Props = {
  blogs: Blog[];
  categories: Category[];
  tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  categories,
  tags,
}: Props) => {
  const { setAllBlogs } = useAllBlogsState();
  const { setAllCategories } = useAllCategoriesState();
  const { setAllTags } = useAllTagsState();
  const { showBlogs, setShowBlogs } = useShowBlogsState();
  const tagList = tags.map((tag) => tag.tag);
  const [offset, setOffset] = useState(0);
  const perPage = 6;

  useEffect(() => {
    setAllBlogs(blogs);
    setAllCategories(categories);
    setAllTags(tagList);
    setShowBlogs(blogs);
  }, []);

  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-4 py-4 px-0 md:p-8 lg:w-4/5 w-full h-[90%] text-left">
        <div className="lg:col-span-8 col-span-12 bg-main pt-4 px-2 rounded-sm">
          <CategoryTabs />
          <div className="grid md:grid-cols-2 gap-4 m-4">
            {showBlogs.slice(offset, offset + perPage).map((blog: Blog) => {
              const dateObj = new Date(blog.createdAt);
              const formattedDate = `${dateObj.getFullYear()}-${
                dateObj.getMonth() + 1
              }-${dateObj.getDate()}`;
              return (
                <Link
                  className="hover:cursor-pointer"
                  href={`/blog/${blog.id}`}
                  key={blog.id}
                >
                  <BlogCard blog={blog} formattedDate={formattedDate} />
                </Link>
              );
            })}
          </div>
          <Pagination
            totalBlogs={blogs.length}
            setOffset={setOffset}
            perPage={perPage}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:block h-full">
          <RightSidebar />
        </div>
      </div>
    </BlogLayout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const blog = await client.getList<Blog>({ endpoint: "blog" });
  const category = await client.getList<Category>({ endpoint: "categories" });
  const tag = await client.getList<Tag>({ endpoint: "tags" });

  return {
    props: {
      blogs: blog.contents,
      categories: category.contents,
      tags: tag.contents,
    },
  };
};
