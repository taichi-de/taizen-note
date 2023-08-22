import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";
import BlogLayout from "../components/BlogLayout";
import RightSidebar from "../components/RightSidebar";
import { ComponentProps, useState } from "react";
import { Card, Image, Text, Badge, Button, Tabs } from "@mantine/core";
import type { Blog, Tag } from "../types/blog";

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

  const tabs = ["All", "Tutorial", "Life Hack", "Travel", "Others"];

  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-4 py-4 px-0 md:p-8 lg:w-4/5 w-full h-[90%] text-left">
        <div className="lg:col-span-8 col-span-12 bg-gray-200 pt-4 px-2 rounded-sm">
          <div className="md:flex block justify-between items-center px-4">
            <p className="text-gray-400">{`${
              search ? "Search result" : "Total"
            }: ${totalCount} Posts`}</p>
            <form className="flex gap-x-2" onSubmit={handleSubmit}>
              <input
                type="text"
                name="query"
                className="border rounded-md border-gray-300 p-1 focus:border-cyan-600/50"
              />
              <Button className="rounded-md px-1 text-gray-50 bg-cyan-600 hover:bg-cyan-600/70">
                Search
              </Button>
              <Button
                type="reset"
                className="rounded-md px-1 text-gray-50 bg-cyan-600 hover:bg-cyan-600/70"
                onClick={handleClick}
              >
                Reset
              </Button>
            </form>
          </div>
          <Tabs
            defaultValue="all"
            className="flex-col m-4 border-b border-cyan-600"
            unstyled
          >
            <Tabs.List grow position="apart">
              {tabs.map((tab, i) => (
                <Tabs.Tab
                  value="all"
                  className={`${
                    i === 0 && "text-gray-100 bg-cyan-600"
                  } text-cyan-600 hover:bg-cyan-600 hover:text-gray-100 mr-1 p-2 rounded-t-sm`}
                  key={tab}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
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
                      <div className="mx-auto bg-gray-300">
                        <Image
                          height={"180px"}
                          src={content?.thumbnail?.url}
                          alt="thumbnail"
                          className="relative"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-sky-700 text-gray-200 rounded-full mr-2 p-2">
                            {/* TODO:
                              {content?.category?.id}
                            */}
                            Tutorial
                          </Badge>
                        </div>
                      </div>
                    </Card.Section>
                    <Text weight={600} className="mt-2 mb-1 text-gray-700">
                      {content.title}
                    </Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.body.slice(0, 78) + " ...",
                      }}
                      className="text-gray-600"
                    />
                    <Text className="mt-2 text-right text-gray-700/70">
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
