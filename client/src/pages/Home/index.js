import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { PageHome, ListPosts } from "./styles";
import PostItem from "../../components/PostItem/index";
import Suggestion from "../../components/Suggestion/index";
import * as postAction from "../../actions/post";
import * as userAction from "../../actions/user";

function Home(props) {
  const { posts, postActionCreators, userActionCreators } = props;
  const { fetchPostsFollowing } = postActionCreators;
  const { getProfile } = userActionCreators;

  useEffect(() => {
    fetchPostsFollowing();
    getProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <PageHome>
      <ListPosts>
        {posts.length > 0 &&
          posts.map((post, index) => <PostItem key={index} post={post} />)}
      </ListPosts>
      <Suggestion />
    </PageHome>
  );
}

Home.propTypes = {
  userActionCreators: PropTypes.shape({
    getProfile: PropTypes.func,
  }),
  postActionCreators: PropTypes.shape({
    fetchPostsFollowing: PropTypes.func,
  }),
  posts: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.postFollowings,
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActionCreators: bindActionCreators(userAction, dispatch),
    postActionCreators: bindActionCreators(postAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
