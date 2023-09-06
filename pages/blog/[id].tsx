import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "@/libs/client";
import { Blog, Category, Tag } from "../../types/blog";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import dayjs from "dayjs";
import BlogLayout from "@/components/BlogLayout";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
import * as cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { Badge, Text } from "@mantine/core";
import { CiCalendarDate } from "react-icons/ci";

type Props = Blog &
  MicroCMSContentId &
  MicroCMSDate & { highlightedBody: string };

const BlogId: NextPage<Props> = (props) => {
  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-4 p-0 md:p-8 md:w-4/5 w-full h-[90%]">
        <div className="lg:col-span-8 col-span-12 py-8 px-4 md:p-8 bg-main">
          <div className="relative mx-auto bg-gray/70">
            <Image
              width={props.thumbnail?.width}
              height={180}
              src={props?.thumbnail?.url}
              alt="thumbnail"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-forth/40 p-4 md:p-8">
              {props?.category.map((category: Category) => (
                <Badge
                  key={category.id}
                  className="bg-forth text-main/90 text-xs md:text-sm rounded-full mt-1 p-3"
                >
                  <Text>{category.category}</Text>
                </Badge>
              ))}
              <Text
                weight={600}
                className="w-[80%] my-3 md:my-6 text-main/90 text-base md:text-4xl"
              >
                {props.title}
              </Text>
              <div className="flex items-center mt-2 text-main/80 text-sm">
                <CiCalendarDate className="mr-2" />
                <time dateTime={props.updatedAt}>
                  {dayjs(props.updatedAt).format("YYYY-MM-DD")}
                </time>
              </div>
              <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6">
                <Image
                  width={60}
                  height={60}
                  src="/taizen-logo-gray.png"
                  alt="logo"
                  className="opacity-70"
                />
              </div>
            </div>
          </div>
          <div
            className="prose-base prose-slate text-left text-content mt-5 py-4"
            dangerouslySetInnerHTML={{ __html: `${props.highlightedBody}` }}
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
  const $ = cheerio.load(data.body || "");
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      ...data,
      highlightedBody: $.html(),
    },
  };
};

export default BlogId;
