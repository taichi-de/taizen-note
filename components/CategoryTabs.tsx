import { useAllCategoriesState } from "@/atoms/allCategoriesAtom";
import { useSelectBlogs } from "@/hooks/useSelectBlogs";
import { useState } from "react";

export const CategoryTabs = () => {
  const { allCategories } = useAllCategoriesState();
  const { selectCategory } = useSelectBlogs();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <ul className="grid grid-flow-col justify-stretch m-4 text-center rounded-sm">
      <li
        onClick={() => {
          selectCategory("all");
          setActiveCategory("all");
        }}
        className={`text-main bg-third ${
          activeCategory === "all" && "bg-pink/80"
        }
        hover:cursor-pointer mr-1 p-2`}
      >
        All
      </li>
      {allCategories.map((category) => (
        <li
          onClick={() => {
            selectCategory(category.category);
            setActiveCategory(category.category);
          }}
          className={`text-main bg-third ${
            activeCategory === category.category && "bg-pink/80"
          }
       hover:cursor-pointer mr-1 p-2`}
          key={category?.id}
        >
          {category.category}
        </li>
      ))}
    </ul>
  );
};

export default CategoryTabs;
