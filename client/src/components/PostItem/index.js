import React from "react";

import { Article } from "./styles";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

export default function () {
  return (
    <Article className="post-item">
      <Header />
      <div className="media">
        <img
          style={{ width: "100%" }}
          src="https://instagram.fsgn5-4.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/109309904_353487419145206_3310002649588987784_n.jpg?_nc_ht=instagram.fsgn5-4.fna.fbcdn.net&_nc_cat=102&_nc_ohc=JJIglriIRscAX83taAs&oh=12ccbd5f61fe5cd3321f2e7771d64856&oe=5F3B66E4"
        />
      </div>
      <Content />
      <Footer />
    </Article>
  );
}
