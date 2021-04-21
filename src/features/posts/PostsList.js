import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";

import { selectAllPosts } from "./postsSlice";

export const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const reversedPosts = posts.map(
    (el, ind) => posts[Math.abs(ind - posts.length) - 1]
  );

  let PostPortion = ({ post }) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <PostAuthor userId={post.user} />
        <ReactionButtons post={post} />
      </article>
    );
  };

  PostPortion = React.memo(PostPortion);

  const renderedPosts = reversedPosts.map((post, ind) => (
    <PostPortion post={post} key={`postPortion ${ind}`} />
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
