import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Container, ImageContainer, H1, Button } from "./styles";
import { Igtv, Saved, Tagged } from "../../constants/svgs";
import ListImage from "../../components/ListImage/index";

const styleP = { margin: "0 0 15px" };

function ChildProfilePage(props) {
  const [data, setData] = useState({});
  const { match, posts } = props;
  const name = match.path.split("/")[2];

  useEffect(() => {
    switch (name) {
      case "channel":
        setData({
          src: Igtv,
          h1: "Upload a Video",
          p: "Videos must be between 1 and 60 minutes long.",
        });
        break;
      case "saved":
        setData({
          src: Saved,
          h1: "Save",
          p:
            "Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.",
          style: { width: "55%" },
        });
        break;
      case "tagged":
        setData({
          src: Tagged,
          h1: "Photos of you",
          p: "When people tag you in photos, they'll appear here.",
        });
        break;
      default:
        setData({});
        break;
    }
  }, []);

  return !data.h1 ? (
    <>
      <ListImage posts={posts} />
    </>
  ) : (
    <Container>
      <ImageContainer>
        <img src={data.src} alt={data.h1} />
      </ImageContainer>
      <H1>{data.h1}</H1>
      <p style={styleP}>{data.p}</p>
      {name === "channel" && <Button>Upload</Button>}
    </Container>
  );
}

ChildProfilePage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  posts: PropTypes.array,
};

export default ChildProfilePage;
