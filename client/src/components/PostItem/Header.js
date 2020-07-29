import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { MoreAction } from "../../constants/svgs";
import { Header, Username } from "./styles";

const info = {
  display: "flex",
  alignItems: "center",
};

const avatar = {
  width: "10%",
  marginRight: "10px",
};

function PostItemHeader({ author }) {
  return (
    <Header>
      <Link to={`/${author[0].username}`}>
        <div className="info" style={info}>
          <div className="avatar" style={avatar}>
            <img
              style={{ borderRadius: "50%" }}
              src={author[0].avatar}
              alt={author[0].useranme}
            />
          </div>
          <Username>{author[0].username}</Username>
        </div>
      </Link>
      <div className="more-actions">
        <img src={MoreAction} alt="More Actions" />
      </div>
    </Header>
  );
}

PostItemHeader.propTypes = {
  author: PropTypes.array,
};

export default PostItemHeader;
