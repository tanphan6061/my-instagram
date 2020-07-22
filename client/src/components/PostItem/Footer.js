import React from "react";

import { Footer, TextArea } from "./styles";

// const colorButton = {
//   opacity: "0.3",
//   color: "#0095f6",
//   outline: "none",
//   border: 0,
//   background: "#fff",
// };

const colorActiveButton = {
  color: "#0095f6",
  fontWeight: "bold",
  outline: "none",
  border: 0,
  background: "#fff",
};

export default function () {
  return (
    <Footer>
      <TextArea
        autoComplete="off"
        autoCorrect="off"
        placeholder="Add a comment..."
      />
      <button style={colorActiveButton} disabled>
        Post
      </button>
    </Footer>
  );
}
