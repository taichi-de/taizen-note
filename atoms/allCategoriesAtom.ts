import { atom, useRecoilState } from "recoil";
import { Category } from "../types/blog";

const allCategoriesState = atom<Category[]>({
  key: "allCategoriesState",
  default: [],
});

export const useAllCategoriesState = () => {
  const [allCategories, setAllCategories] =
    useRecoilState<Category[]>(allCategoriesState);

  return { allCategories, setAllCategories };
};
