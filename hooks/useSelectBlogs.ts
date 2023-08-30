import { useAllBlogsState } from "@/atoms/allBlogsAtom";
import { useShowBlogsState } from "@/atoms/showBlogsAtom";

export const useSelectBlogs = () => {
  const { allBlogs } = useAllBlogsState();
  const { setShowBlogs } = useShowBlogsState();

  const selectTag = (tag: string) => {
    if (tag === "all" || "") {
      setShowBlogs(allBlogs);
    } else {
      const selectedBlogs = allBlogs.filter((blog) => {
        const haveTags = blog.tags.map((tag) => tag.tag);
        return haveTags.includes(tag);
      });
      setShowBlogs(selectedBlogs);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectCategory = (category: string) => {
    if (category === "all" || "") {
      setShowBlogs(allBlogs);
    } else {
      const selectedBlogs = allBlogs.filter((blog) => {
        const haveCategories = blog.category.map(
          (category) => category.category
        );
        return haveCategories.includes(category);
      });
      setShowBlogs(selectedBlogs);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return { selectTag, selectCategory };
};
