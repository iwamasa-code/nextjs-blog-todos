// サーバーサイドでnodeのfetchを使用し、deploy時にエンドポイントにアクセスする処理

import fetch from "node-fetch";

// -- node-fetchを使用し、エンドポイントでデータにアクセスする関数(build時に実行される) -- //
export async function getAllPostsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();

  {
    /** 新しい順にソーティングする 大きい順 */
  }
  const filteredPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filteredPosts;
}

// -- idの一覧を取得する -- //
export async function getAllPostIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

// -- 指定したidに基づいて特定のblog記事を取得 -- //
export async function getPostData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`)
  );
  const post = await res.json();
  // return {
  //   post,
  // };
  return post;
}
