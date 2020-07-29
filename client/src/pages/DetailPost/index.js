import React, { useState, useEffect, useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Content,
  Text,
  CreatedAt,
  Username,
  Header,
  Article,
  TextArea,
  Footer,
  ColorActiveButton,
  Media,
  ShowAllComments,
} from "./styles";
import {
  Heart,
  HeartLike,
  Comment,
  Inbox,
  Saved,
  MoreAction,
} from "../../constants/svgs";
import * as postAction from "../../actions/post";
import * as commentAction from "../../actions/comment";

const info = {
  display: "flex",
  alignItems: "center",
};

const avatar = {
  width: "10%",
  marginRight: "10px",
};

function DetailPostPage(props) {
  const [input, setInput] = useState("");
  const [liked, setLiked] = useState(false);
  const inputElm = useRef();
  const {
    match,
    postActionCreators,
    post,
    postLikes,
    commentActionCreators,
  } = props;
  const { id } = match.params;
  const { getDetailPost, likePost } = postActionCreators;
  const { addComment } = commentActionCreators;

  useEffect(() => {
    getDetailPost(id);
    setLiked(postLikes && postLikes.length > 0 && postLikes.indexOf(id) > -1);
  }, [id, postLikes, getDetailPost]);

  const handleLikePost = () => {
    likePost(id, getDetailPost(id));
    setLiked(!liked);
  };

  const handleSubmitComment = () => {
    addComment(id, input, getDetailPost(id));
    setInput("");
  };

  return (
    post && (
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: "50%" }}
      >
        <Media>
          <img src={post.media} alt="media" />
        </Media>
        <Article className="post-item">
          <div>
            <Header>
              <div className="info" style={info}>
                <div className="avatar" style={avatar}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={post.author && post.author[0].avatar}
                    alt="avatar"
                  />
                </div>
                <Username>{post.author && post.author[0].username}</Username>
              </div>
              <div className="more-actions">
                <img src={MoreAction} alt="More Actions" />
              </div>
            </Header>
            <Content>
              <ShowAllComments>
                <div className="d-flex" style={{ marginBottom: "20px" }}>
                  <span>
                    <Text>{post.author && post.author[0].username}</Text>
                    {post.caption}
                  </span>
                </div>
                <div className="showComments">
                  {post.limitComments &&
                    post.limitComments.length > 0 &&
                    post.limitComments.map((item, index) => (
                      <div
                        key={index}
                        className="comment-item"
                        style={{ marginBottom: "20px" }}
                      >
                        <span>
                          <Text>{item.author}</Text>
                          {item.content}
                        </span>
                      </div>
                    ))}
                </div>
              </ShowAllComments>
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

              <Text>{post.totalLikes} likes</Text>

              <CreatedAt>{new Date(post.createdAt).toDateString()}</CreatedAt>
            </Content>
          </div>
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
              onClick={handleSubmitComment}
            >
              Post
            </ColorActiveButton>
          </Footer>
        </Article>
      </div>
    )
  );
}

DetailPostPage.propTypes = {
  match: PropTypes.object,
  postLikes: PropTypes.array,
  post: PropTypes.shape({
    _id: PropTypes.string,
    media: PropTypes.string,
    author: PropTypes.array,
    likes: PropTypes.number,
    limitComments: PropTypes.array,
    caption: PropTypes.string,
    totalLikes: PropTypes.number,
    createdAt: PropTypes.string,
  }),
  postActionCreators: PropTypes.shape({
    getDetailPost: PropTypes.func,
    likePost: PropTypes.func,
  }),
  commentActionCreators: PropTypes.shape({
    addComment: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    postLikes: state.user.mainProfile.postLikes,
    post: state.posts.detailPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActionCreators: bindActionCreators(postAction, dispatch),
    commentActionCreators: bindActionCreators(commentAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPostPage);
