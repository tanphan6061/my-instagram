import React from "react";

import { ListImages, ImageItem } from "./styles";

const image = {
  minHeight: "280px",
};

export default function () {
  return (
    <ListImages>
      <ImageItem>
        <div>
          <img
            alt="post name"
            style={image}
            src="https://instagram.fsgn5-4.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/109309904_353487419145206_3310002649588987784_n.jpg?_nc_ht=instagram.fsgn5-4.fna.fbcdn.net&_nc_cat=102&_nc_ohc=JJIglriIRscAX83taAs&oh=12ccbd5f61fe5cd3321f2e7771d64856&oe=5F3B66E4"
          />
        </div>
        <div className="overlay">
          <span className="heart">123,12</span>
          <span className="comment">123</span>
        </div>
      </ImageItem>
    </ListImages>
  );
}
