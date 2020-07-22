import React from "react";

import { MoreAction } from "../../constants/svgs";

import { Header } from "./styles";

const info = {
  display: "flex",
  alignItems: "center",
};

const avatar = {
  width: "10%",
  marginRight: "10px",
};

const span = {
  fontSize: "14px",
  color: "#262626",
  fontWeight: 600,
};

export default function () {
  return (
    <Header>
      <div className="info" style={info}>
        <div className="avatar" style={avatar}>
          <img
            style={{ borderRadius: "50%" }}
            src="https://instagram.fsgn5-7.fna.fbcdn.net/v/t51.2885-19/s150x150/41382128_887871431406733_4111745408491847680_n.jpg?_nc_ht=instagram.fsgn5-7.fna.fbcdn.net&_nc_ohc=pydfSsr-mf0AX_77gE7&oh=e12b7ccb574d12df0c57406f0775fe1a&oe=5F3E2877"
          />
        </div>
        <span style={span}>young.quotes</span>
      </div>
      <div className="more-actions">
        <img src={MoreAction} alt="More Actions" />
      </div>
    </Header>
  );
}
