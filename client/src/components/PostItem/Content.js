import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Content, Text, CreatedAt } from "./styles";
import { Heart, HeartLike, Comment, Inbox, Saved } from "../../constants/svgs";
import * as postAction from "../../actions/post";

const comment = {
  color: "#8e8e8e",
  padding: "5px 0 0",
};

function PostItemContent(props) {
  const {
    id,
    totalLikes,
    totalComments,
    caption,
    author,
    comments,
    inputElm,
    createdAt,
    postActionCreators,
  } = props;
  const { likePost, fetchPostsFollowing } = postActionCreators;

  const handleLikePost = () => {
    likePost(id, fetchPostsFollowing());
  };

  return (
    <Content>
      <div className="controls">
        <div style={{ display: "flex" }}>
          <img src={Heart} alt="Like" onClick={handleLikePost} />
          <img
            src={Comment}
            alt="Comment"
            onClick={() => inputElm.current.focus()}
          />
          <img src={Inbox} alt="Share" />
        </div>
        <div>
          <img src={Saved} alt="Saved" />
        </div>
      </div>

      <Text>{totalLikes} likes</Text>

      <div className="description">
        <span>
          <Text style={{ padding: 0 }}>{author[0].username}</Text>
          {caption}
        </span>
      </div>

      <p style={comment}>View all {totalComments} comments</p>

      {comments && comments.length > 0 && (
        <div className="showComments">
          {comments.map((item, index) => (
            <div className="comment-item" key={index}>
              <Text style={{ padding: 0 }}>{item.author}</Text>
              <span>{item.content}</span>
            </div>
          ))}
        </div>
      )}
      <CreatedAt>{new Date(createdAt).toDateString()}</CreatedAt>
    </Content>
  );
}

PostItemContent.propTypes = {
  postActionCreators: PropTypes.shape({
    likePost: PropTypes.func,
    fetchPostsFollowing: PropTypes.func,
  }),
  id: PropTypes.string,
  totalLikes: PropTypes.number,
  totalComments: PropTypes.number,
  caption: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.array,
  comments: PropTypes.array,
  inputElm: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActionCreators: bindActionCreators(postAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(PostItemContent);
