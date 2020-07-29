import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Content, Text, CreatedAt } from "./styles";
import { Heart, HeartLike, Comment, Inbox, Saved } from "../../constants/svgs";
import * as postAction from "../../actions/post";

const comment = {
  color: "#8e8e8e",
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
    postLikes,
    postActionCreators,
  } = props;
  const { likePost, fetchPostsFollowing } = postActionCreators;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(postLikes && postLikes.length > 0 && postLikes.indexOf(id) > -1);
  }, [postLikes, id]);

  const handleLikePost = () => {
    likePost(id, fetchPostsFollowing());
    setLiked(!liked);
  };

  return (
    <Content>
      <div className="controls">
        <div style={{ display: "flex" }}>
          <img
            src={liked ? HeartLike : Heart}
            alt="Like"
            onClick={handleLikePost}
          />
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

      <Link to={`p/${id}`} style={comment}>
        View all {totalComments} comments
      </Link>

      {comments && comments.length > 0 && (
        <div className="showComments">
          {comments.map((item, index) => (
            <div className="comment-item" key={index}>
              <span>
                <Text style={{ padding: 0 }}>{item.author}</Text>
                {item.content}
              </span>
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
  postLikes: PropTypes.array,
  id: PropTypes.string,
  totalLikes: PropTypes.number,
  totalComments: PropTypes.number,
  caption: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.array,
  comments: PropTypes.array,
  inputElm: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    postLikes: state.user.mainProfile.postLikes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActionCreators: bindActionCreators(postAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItemContent);
