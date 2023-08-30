export type Blog = {
  id: string;
  body: string;
  title: string;
  tags: Tag[];
  image: string;
  category: Category[];
  createdAt: string;
  updatedAt: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
};

export type Category = {
  id: string;
  category: string;
};

export type Tag = {
  id: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
};
