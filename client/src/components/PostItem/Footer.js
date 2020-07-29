import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Footer, TextArea, ColorActiveButton } from "./styles";
import * as commentAction from "../../actions/comment";
import * as postAction from "../../actions/post";

function PostItemFooter(props) {
  const { inputElm, id, commentActionCreators, postActionCreators } = props;
  const [input, setInput] = useState("");
  const { addComment } = commentActionCreators;
  const { fetchPostsFollowing } = postActionCreators;

  const handleSubmit = () => {
    addComment(id, input, fetchPostsFollowing());
    setInput("");
  };

  return (
    <Footer>
      <TextArea
        autoComplete="off"
        autoCorrect="off"
        placeholder="Add a comment..."
        ref={inputElm}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ColorActiveButton
        type="button"
        className="submit-comment"
        disabled={!input}
        onClick={handleSubmit}
      >
        Post
      </ColorActiveButton>
    </Footer>
  );
}

PostItemFooter.propTypes = {
  inputElm: PropTypes.object,
  id: PropTypes.string,
  commentActionCreators: PropTypes.shape({
    addComment: PropTypes.func,
  }),
  postActionCreators: PropTypes.shape({
    fetchPostsFollowing: PropTypes.func,
  }),
};

const mapDispatchToProp = (dispatch) => {
  return {
    commentActionCreators: bindActionCreators(commentAction, dispatch),
    postActionCreators: bindActionCreators(postAction, dispatch),
  };
};

export default connect(null, mapDispatchToProp)(PostItemFooter);
