import React, { useEffect, useState } from "react";
import "./twitterPost.css";

const TwitterPost = (props) => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const { postId } = props;

  const [isComment, setIsComment] = useState(false);

  const getPost = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    return data;
  };

  const getComment = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    const data = await res.json();
    return data;
  };

  const getPhoto = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.json();
    return data;
  };

  const getUser = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?id=${id}`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const fetchFullPost = async (id) => {
      const newPost = await getPost(id);
      const newPhoto = await getPhoto(newPost.id);
      const newUser = await getUser(newPost.userId);
      const newComment = await getComment(newPost.id);
      setPost(newPost);
      setUser(newUser);
      setComment(newComment);
      setPhoto(newPhoto);
    };

    fetchFullPost(postId);
  }, []);

  const userInfo = user && user[0];

  return (
    post &&
    user &&
    comment &&
    photo && (
      <div className="twitt-post">
        <div className="profile-wrapper">
          <div className="profile-pic">
            {userInfo.name && userInfo.name.charAt(0).toUpperCase()}
          </div>

          <div className="userinfo-wrapper">
            <div className="user-info">
              <h3 className="username">{userInfo.name && userInfo.name}</h3>
              <h3 className="userlogin">
                @{userInfo.username && userInfo.username}
              </h3>
            </div>

            <p className="user-text">{post.title}</p>
          </div>
        </div>

        <div className="post-content">
          <p className="post-text">{post.body}</p>
          <img src={photo[0].url} alt="" className="post-img" />
        </div>
      </div>
    )
  );
};

export default TwitterPost;
