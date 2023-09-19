import { Card, Image, Text, Badge } from "@mantine/core";
import { CiCalendarDate } from "react-icons/ci";
import type { Blog, Category } from "../types/blog";

type Props = {
  blog: Blog;
  formattedDate: string;
};

export const BlogCard = ({ blog, formattedDate }: Props) => {
  return (
    <Card shadow="sm" padding="md" radius="sm" withBorder>
      {blog && (
        <Card.Section>
          <div className="relative mx-auto bg-gray/70">
            <Image height={180} src={blog?.thumbnail?.url} alt="thumbnail" />
            <div className="absolute top-0 left-0 w-full h-full bg-fourth/40 p-4">
              {blog?.category.map((category: Category) => (
                <Badge
                  key={category.id}
                  className="bg-fourth text-main/90 rounded-full mt-1 p-2"
                >
                  <Text>{category.category}</Text>
                </Badge>
              ))}
              <Text
                weight={600}
                className="w-[80%] my-3 text-main/90 text-base"
              >
                {blog.title.slice(0, 80) + " ..."}
              </Text>
              <Image
                width={60}
                height={60}
                src="/taizen-logo-gray.png"
                alt="logo"
                className="absolute bottom-4 right-4 opacity-70"
              />
            </div>
          </div>
          <div className="p-3">
            <div
              dangerouslySetInnerHTML={{
                __html: blog.body.slice(0, 78) + " ...",
              }}
              className="text-content mb-4"
            />
            <div className="flex items-center justify-end text-sub">
              <CiCalendarDate className="mr-2" />
              <p>{formattedDate}</p>
            </div>
          </div>
        </Card.Section>
      )}
    </Card>
  );
};

export default BlogCard;
