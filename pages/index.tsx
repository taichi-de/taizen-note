import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";
import BlogLayout from "../components/BlogLayout";
import RightSidebar from "../components/RightSidebar";
import { ComponentProps, useState } from "react";
import { Card, Image, Text, Badge, Button } from "@mantine/core";
import type { Blog } from "../types/blog";
import CategoryTabs from "@/components/CategoryTabs";

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  const [search, setSearch] = useState<Props>();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value;
    const data = await fetch("/api/search", {
      body: JSON.stringify({ q }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const json = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = async (e) => {
    setSearch(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  // const [showBlogs, setShowBlogs] = useState(props);
  // const tagList = props.tags.map((tag) => tag.tag);
  // const selectTag = (tag: string) => {
  //   if (tag === "all") {
  //     setShowBlogs(props);
  //   } else {
  //     const selectedBlogs = props.filter((prop: Props) => {
  //       const haveTags = prop.tags.map((tag: Tag) => tag.tag);
  //       return haveTags.includes(tag);
  //     });
  //     setShowBlogs(selectedBlogs);
  //   }

  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-4 py-4 px-0 md:p-8 lg:w-4/5 w-full h-[90%] text-left">
        <div className="lg:col-span-8 col-span-12 bg-main pt-4 px-2 rounded-sm">
          <div className="md:flex block justify-between items-center px-4">
            <p className="text-sub">{`${
              search ? "Search result" : "Total"
            }: ${totalCount} Posts`}</p>
            <form className="flex gap-x-2" onSubmit={handleSubmit}>
              <input
                type="text"
                name="query"
                className="border rounded-md border-third p-1 focus:border-secondary"
              />
              <Button className="rounded-md px-1 text-main bg-third hover:opacity-80">
                Search
              </Button>
              <Button
                type="reset"
                className="rounded-md px-1 text-main bg-third hover:opacity-80"
                onClick={handleClick}
              >
                Reset
              </Button>
            </form>
          </div>
          <CategoryTabs />
          <div className="grid md:grid-cols-2 gap-4 m-4">
            {contents.map((content) => {
              const dateObj = new Date(content.createdAt);
              const formattedDate = `${dateObj.getFullYear()}-${
                dateObj.getMonth() + 1
              }-${dateObj.getDate()}`;

              return (
                <Link
                  className="hover:pointer"
                  href={`/blog/${content.id}`}
                  key={content.id}
                >
                  <Card shadow="sm" padding="md" radius="sm" withBorder>
                    <Card.Section>
                      <div className="mx-auto bg-gray/70">
                        <Image
                          height={"180px"}
                          src={content?.thumbnail?.url}
                          alt="thumbnail"
                          className="relative"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-forth text-main/90 rounded-full mr-2 p-2">
                            {/* TODO:
                              {content?.category?.id}
                            */}
                            Tutorial
                          </Badge>
                        </div>
                      </div>
                    </Card.Section>
                    <Text weight={600} className="mt-2 mb-1 text-title">
                      {content.title}
                    </Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.body.slice(0, 78) + " ...",
                      }}
                      className="text-content"
                    />
                    <Text className="mt-2 text-right text-sub">
                      {formattedDate}
                    </Text>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:block h-full">
          <RightSidebar />
          {/* <div className="text-left">
            <div onClick={() => selectTag("all")}>
              <p>All</p>
            </div>

            {tagList.map((tag: Tag) => (
              <div key={tag.id} onClick={() => selectTag(tag.tag)}>
                <p>{tag.tag}</p>
              </div>
            ))}
          </div>*/}
        </div>
      </div>
    </BlogLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  return {
    props: data,
  };
};

export default Home;
