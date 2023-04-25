import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "@/libs/client";
import { Blog } from "../index";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import dayjs from "dayjs";
import BlogLayout from "@/components/BlogLayout";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-4 p-0 md:p-8 md:w-4/5 w-full h-[90%]">
        <div className="lg:col-span-8 col-span-12 py-8 px-4 md:p-8 bg-gray-200">
          <Image
            className="rounded-md"
            src={props.thumbnail.url}
            alt="thumbnail"
            width={props.thumbnail.width}
            height={300}
            loading="lazy"
          />
          <h1 className="text-2xl font-bold my-4 md:my-8">{props.title}</h1>
          <div className="flex align-center justify-between pb-4 md:pb-8">
            <time dateTime={props.updatedAt}>
              {dayjs(props.updatedAt).format("YYYY.MM.DD")}
            </time>
            {/* TODO: add categories
            {props.category && (
              <p className="text-gray-400">/{props?.category}</p>
            )} */}
          </div>
          {/* TODO: ad tags */}
          <div className="flex">
            {/* {props.tags ? (
              <p className="bg-gray-300 rounded-md mr-2 p-2">{props?.tags}</p>
            ) : ( */}
            <p className="bg-gray-300 rounded-md mr-2 p-2"># react</p>
            {/* )} */}
          </div>
          {/* TODO: add codeblock + color & copyable*/}
          <div
            className="prose prose-slate text-left text-gray-700 py-4"
            dangerouslySetInnerHTML={{ __html: props.body }}
          />
        </div>
        <div className="lg:col-span-4 col-span-12 lg:block h-full bg-sky-300 lg:bg-transparent">
          <RightSidebar />
        </div>
      </div>
    </BlogLayout>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.get({ endpoint: "blog" });
  const ids = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  );
  return {
    fallback: false,
    paths: ids,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) return { notFound: true };
  const data = await client.getListDetail<Blog>({
    contentId: ctx.params.id,
    endpoint: "blog",
  });

  return { props: data };
};

export default BlogId;
