import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import { Container, ImageContainer, H1, Button } from "./styles";
import { Igtv, Saved, Tagged } from "../../constants/svgs";

export default function () {
  const match = useRouteMatch();
  const [data, setData] = useState({});
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
  }, [name]);

  const styleP = { margin: "0 0 15px", ...data.style } || {
    margin: "0 0 15px",
  };

  return (
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
