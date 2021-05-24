import Link from "next/link";

import Layout from "../components/Layout";
import { getAllPostsData } from "../lib/posts";
import Post from "../components/Post";

const BlogPage = ({ filteredPosts }) => {
  return (
    <Layout title="blog-page">
      {/** -- filteredPostsが存在する場合、mapで回しPostの各objを渡す -- */}
      <ul>
        {filteredPosts &&
          filteredPosts.map((post) => <Post key={post.id} post={post} />)}
      </ul>

      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default BlogPage;

// -- build時に呼び出され、サーバーサイドで実行 -- //
export async function getStaticProps() {
  const filteredPosts = await getAllPostsData();
  return {
    props: { filteredPosts },
    // --Incremental Static Regenerationの適用-- //
    revalidate: 3,
  };
}
