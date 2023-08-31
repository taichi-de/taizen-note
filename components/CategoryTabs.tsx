import { useAllCategoriesState } from "@/atoms/allCategoriesAtom";
import { useSelectBlogs } from "@/hooks/useSelectBlogs";
import { useState } from "react";

export const CategoryTabs = () => {
  const { allCategories } = useAllCategoriesState();
  const { selectCategory } = useSelectBlogs();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <ul className="grid sm:justify-stretch grid-cols-3 gap-1 rounded-sm m-4 text-center">
      <li
        onClick={() => {
          selectCategory("all");
          setActiveCategory("all");
        }}
        className={`text-main ${
          activeCategory === "all" ? "bg-pink/80" : "bg-third"
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
          className={`text-main ${
            activeCategory === category.category ? "bg-pink/80" : "bg-third"
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
