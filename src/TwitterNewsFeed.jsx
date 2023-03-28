import React, { useEffect, useState } from "react";
import TwitterPost from "./TwitterPost";
import "./twitterPost.css";

const TwitterNewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const fetchedData = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await fetchedData.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="news-feed">
      {posts.map((post) => {
        return <TwitterPost key={post.id} postId={post.id} />;
      })}
    </div>
  );
};

export default TwitterNewsFeed;
