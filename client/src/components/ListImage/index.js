import React from "react";
import PropTypes from "prop-types";

import { ListImages } from "./styles";
import ImageItem from "../ImageItem";

function ListImage({ posts }) {
  return (
    <ListImages>
      {posts &&
        posts.length > 0 &&
        posts.map((post, index) => <ImageItem key={index} post={post} />)}
    </ListImages>
  );
}

ListImage.propTypes = {
  posts: PropTypes.array,
};

export default ListImage;
