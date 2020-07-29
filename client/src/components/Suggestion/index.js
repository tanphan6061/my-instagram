import React, { useState } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Button } from "reactstrap";
import PropTypes from "prop-types";

import { FormGroup, Label, FileCustom, FileInput } from "./styles";
import SuggestionItem from "../SuggestionItem";
import * as postAction from "../../actions/post";

const pointer = {
  cusor: "pointer",
};

function Suggestion({ profile, postActionCreators }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const { createPost } = postActionCreators;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("media", selectedFile, selectedFile.name);
    formData.append("caption", caption);
    createPost(formData);
    setCaption("");
    setSelectedFile("");
  };

  return (
    <div className="sidebar-homepage">
      <Link to={`/${profile.username}`}>
        <div className="info d-flex align-items-center" style={pointer}>
          <div className="avatar" style={{ width: "20%" }}>
            <img alt="avatar" src={profile.avatar} />
          </div>
          <div className="name" style={{ marginLeft: "15px" }}>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {profile.username}
            </p>
            <p style={{ fontSize: "12px", color: "#8e8e8e" }}>
              {profile.fullname}
            </p>
          </div>
        </div>
      </Link>
      <FormGroup>
        <Input
          type="text"
          name="caption"
          placeholder="Caption"
          onChange={(e) => setCaption(e.target.value)}
        />
        <Label htmlFor="file">
          <FileInput
            type="file"
            id="file"
            aria-label="File browser example"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <FileCustom className="file-custom" />
        </Label>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </FormGroup>
      <div className="suggestions mt-4">
        <div className="d-flex justify-content-between">
          <p style={{ color: "#8e8e8e" }}>Suggestions For You</p>
          <p style={{ fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
            See all
          </p>
        </div>

        <SuggestionItem />
        <SuggestionItem />
        <SuggestionItem />
      </div>
    </div>
  );
}

Suggestion.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
    fullname: PropTypes.string,
  }),
  postActionCreators: PropTypes.shape({
    createPost: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActionCreators: bindActionCreators(postAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
