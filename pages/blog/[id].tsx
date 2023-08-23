import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "@/libs/client";
import { Blog } from "../../types/blog";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import dayjs from "dayjs";
import BlogLayout from "@/components/BlogLayout";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import { Badge } from "@mantine/core";
import { CiCalendarDate } from "react-icons/ci";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-4 p-0 md:p-8 md:w-4/5 w-full h-[90%]">
        <div className="lg:col-span-8 col-span-12 py-8 px-4 md:p-8 bg-main">
          <Image
            src={props.thumbnail.url}
            alt="thumbnail"
            width={props.thumbnail.width}
            height={200}
            className="relative rounded-md"
          />
          <h1 className="text-2xl text-title font-bold my-4 md:my-6">
            {props.title}
          </h1>
          <div className="flex align-center justify-between text-sub pb-4">
            <div className="flex items-center justify-end mt-2 text-sub">
              <CiCalendarDate className="mr-2" />
              <time dateTime={props.updatedAt}>
                {dayjs(props.updatedAt).format("YYYY-MM-DD")}
              </time>
            </div>
            <div className="flex justify-start">
              {/* TODO: add tags */}
              {props.tags &&
                props.tags.map((tag) => {
                  return (
                    <Badge
                      className="bg-secondary text-third rounded-full mr-2 p-2"
                      key={tag.id}
                    >
                      #{tag.tag}
                    </Badge>
                  );
                })}
            </div>
          </div>
          {/* TODO: add codeblock + color & copyable*/}
          <div
            className="prose prose-slate text-left text-content py-4"
            dangerouslySetInnerHTML={{ __html: props.body }}
          />
        </div>
        <div className="lg:col-span-4 col-span-12 lg:block h-full bg-secondary lg:bg-transparent">
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
  // const $ = cheerio.load(data.body);
  // $("pre code").each((_, elm) => {
  //   const result = hljs.highlightAuto($(elm).text());
  //   $(elm).html(result.value);
  //   $(elm).addClass("hljs");
  // });

  return {
    props: data,
    // highlightedBody: $.html()
  };
};

export default BlogId;
