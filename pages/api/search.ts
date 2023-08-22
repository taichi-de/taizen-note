import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../libs/client";
import { Blog } from "../../types/blog";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blog",
      queries: { q: req.body.q },
    });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
