import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ImageItemContainer } from "./styles";

const image = {
  minHeight: "280px",
};

function ImageItem({ post }) {
  const [hover, setHover] = useState();
  return (
    <ImageItemContainer
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/p/${post._id}`}>
        <div>
          <img alt="post name" style={image} src={post.media} />
        </div>
        {hover && (
          <div className="overlay">
            <span className="heart">{post.totalLikes}</span>
            <span className="comment">{post.totalComments}</span>
          </div>
        )}
      </Link>
    </ImageItemContainer>
  );
}

ImageItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    media: PropTypes.string,
    totalLikes: PropTypes.number,
    totalComments: PropTypes.number,
  }),
};

export default ImageItem;
