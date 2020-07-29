import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { PageHome, ListPosts } from "./styles";
import PostItem from "../../components/PostItem/index";
import Suggestion from "../../components/Suggestion/index";

function Home(props) {
  const { posts } = props;

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
  posts: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.postFollowings,
    profile: state.user.mainProfile,
  };
};

export default connect(mapStateToProps, null)(Home);
