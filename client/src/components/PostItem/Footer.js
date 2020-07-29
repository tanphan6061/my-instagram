import React from "react";
import PropTypes from "prop-types";

import { Footer, TextArea, ColorActiveButton } from "./styles";

function PostItemFooter({ inputElm }) {
  return (
    <Footer>
      <TextArea
        autoComplete="off"
        autoCorrect="off"
        placeholder="Add a comment..."
        ref={inputElm}
      />
      <ColorActiveButton type="button">Post</ColorActiveButton>
    </Footer>
  );
}

PostItemFooter.propTypes = {
  inputElm: PropTypes.object,
};

export default PostItemFooter;
