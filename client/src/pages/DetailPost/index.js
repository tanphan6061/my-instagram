import React, { useEffect, useRef } from "react";
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

const info = {
  display: "flex",
  alignItems: "center",
};

const avatar = {
  width: "10%",
  marginRight: "10px",
};

function DetailPostPage(props) {
  const inputElm = useRef();
  const { match, postActionCreators, post } = props;
  const { id } = match.params;
  const { getDetailPost, likePost } = postActionCreators;

  useEffect(() => {
    getDetailPost(id);
  }, [id]);

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
                <div className="description" style={{ marginBottom: "20px" }}>
                  <Text>{post.author && post.author[0].username}</Text>
                  <span>{post.caption}</span>
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
                        <Text>{item.author}</Text>
                        <span>{item.content}</span>
                      </div>
                    ))}
                </div>
              </ShowAllComments>
              <div className="controls">
                <div style={{ display: "flex" }}>
                  <img
                    src={Heart}
                    alt="Like"
                    onClick={() => likePost(post._id)}
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
            />
            <ColorActiveButton type="button">Post</ColorActiveButton>
          </Footer>
        </Article>
      </div>
    )
  );
}

DetailPostPage.propTypes = {
  match: PropTypes.object,
  postActionCreators: PropTypes.shape({
    getDetailPost: PropTypes.func,
    likePost: PropTypes.func,
  }),
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
};

const mapStateToProps = (state) => {
  return {
    post: state.posts.detailPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActionCreators: bindActionCreators(postAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPostPage);
