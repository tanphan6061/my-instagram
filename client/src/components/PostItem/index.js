import React, { useRef } from "react";
import PropTypes from "prop-types";

import { Article } from "./styles";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function PostItem({ post }) {
  const inputElm = useRef(null);
  return (
    <Article className="post-item">
      <Header author={post.author} />
      <div className="media">
        <img style={{ width: "100%" }} src={post.media} alt="media" />
      </div>
      <Content
        id={post._id}
        caption={post.caption}
        totalLikes={post.totalLikes}
        totalComments={post.totalComments}
        author={post.author}
        comments={post.limitComments}
        createdAt={post.createdAt}
        inputElm={inputElm}
      />
      <Footer inputElm={inputElm} />
    </Article>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.array,
    media: PropTypes.string,
    caption: PropTypes.string,
    totalLikes: PropTypes.number,
    totalComments: PropTypes.number,
    limitComments: PropTypes.array,
    createdAt: PropTypes.string,
  }),
};

export default PostItem;
