import React from "react";

import { PageHome, ListPosts } from "./styles";

import PostItem from "../../components/PostItem/index";
import Suggestion from "../../components/Suggestion/index";

export default function () {
  return (
    <PageHome>
      <ListPosts>
        <PostItem />
        <PostItem />
      </ListPosts>
      <Suggestion />
    </PageHome>
  );
}
