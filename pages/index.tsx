import { GetStaticProps, NextPage } from "next";
import { client } from "../libs/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";
import BlogLayout from "../components/BlogLayout";
import RightSidebar from "../components/RightSidebar";
import { ComponentProps, useState } from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
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

  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-4 py-4 px-0 md:p-8 lg:w-4/5 w-full h-[90%] text-left">
        <div className="lg:col-span-8 col-span-12 bg-gray-200 px-2">
          <h1 className="text-center text-xl text-bold italic md:my-8 my-4">
            Archives
          </h1>
          <div className="md:flex block justify-between items-center px-4">
            <p className="text-gray-400">{`${
              search ? "検索結果" : "記事の総数"
            }: ${totalCount}件`}</p>
            <form className="flex gap-x-2" onSubmit={handleSubmit}>
              <input
                type="text"
                name="query"
                className="border rounded-md border-gray-300 p-1"
              />
              <Button className="rounded-md px-1 text-gray-100 bg-cyan-500">
                Search
              </Button>
              <Button
                type="reset"
                className="rounded-md px-1 text-gray-100 bg-cyan-500"
                onClick={handleClick}
              >
                Reset
              </Button>
            </form>
          </div>
          <div className="grid md:grid-cols-2 gap-4 m-4">
            {contents.map((content) => {
              return (
                <Link
                  className="hover: hover:pointer"
                  href={`/blog/${content.id}`}
                  key={content.id}
                >
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className=""
                  >
                    <Card.Section>
                      <div className="mx-auto bg-gray-300">
                        <Image
                          height={"220px"}
                          src={content?.thumbnail?.url}
                          alt="thumbnail"
                        />
                      </div>
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                      <Text weight={500}>{content.title}</Text>
                    </Group>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.body.slice(0, 80) + " ...",
                      }}
                    />
                    <Badge color="green" variant="light" className="flex mt-2">
                      {/* TODO: add tags */}
                      {content.tags ? (
                        content.tags.map((tag) => {
                          return (
                            <p
                              className="bg-gray-300 rounded-md mr-2 p-2"
                              key={tag.id}
                            >
                              #{tag.tag}
                            </p>
                          );
                        })
                      ) : (
                        <p className="bg-gray-300 rounded-md mr-2 p-2"># any</p>
                      )}
                    </Badge>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:block h-full bg-sky-300 lg:bg-transparent">
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
