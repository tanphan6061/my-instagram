import React from "react";

import { Content, Text } from "./styles";
import { Heart, HeartLike, Comment, Inbox, Saved } from "../../constants/svgs";

const comment = {
  color: "#8e8e8e",
  padding: "5px 0 0",
};

const created_at = {
  color: "#8e8e8e",
  padding: "5px 0 0",
  fontSize: "11px",
};

export default function () {
  return (
    <Content>
      <div className="controls">
        <div style={{ display: "flex" }}>
          <img src={Heart} alt="Like" />
          <img src={Comment} alt="Comment" />
          <img src={Inbox} alt="Share" />
        </div>
        <div>
          <img src={Saved} alt="Saved" />
        </div>
      </div>

      <Text>2,042 likes</Text>

      <div className="description">
        <Text>young.quotes</Text>
        <span>Bên ngoài thì giả nai, bên trong thì giả tạo....</span>
      </div>

      <p style={comment}>View all 4 comments</p>

      <div className="showComments">
        <div className="comment-item">
          <Text>_vidal.hvinh.q_</Text>
          <span>@buivietthao cái ava huỳn thoại á</span>
        </div>
      </div>
      <p style={created_at}>4 HOURS AGO</p>
    </Content>
  );
}
