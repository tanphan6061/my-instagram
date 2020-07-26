import React from "react";

import { Footer, TextArea, ColorActiveButton } from "./styles";

export default function () {
  return (
    <Footer>
      <TextArea
        autoComplete="off"
        autoCorrect="off"
        placeholder="Add a comment..."
      />
      <ColorActiveButton type="button" disabled>
        Post
      </ColorActiveButton>
    </Footer>
  );
}
