import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export default function Custom404() {
  return (
    <BlogLayout>
      <div className="mt-20 items-start text-center font-serif w-full h-screen">
        <h1 className="mb-8 text-3xl font-black text-main/70 mx-auto">
          404 | Page not found.
        </h1>
        <Link
          href="/"
          className="font-serif font-bold text-secondary text-md mx-auto"
        >
          - Back to Home -
        </Link>
      </div>
    </BlogLayout>
  );
}
