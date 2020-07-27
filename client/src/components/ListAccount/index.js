import React from "react";

import { ListAccountContainer, EditImage, Direct, DirectText } from "./styles";
import { Edit } from "../../constants/svgs";

export default function () {
  return (
    <ListAccountContainer>
      <Direct>
        <DirectText>Direct</DirectText>
        <EditImage src={Edit} alt="edit" />
      </Direct>
      <div className="list-accounts" style={{ padding: "20px" }}>
        <div className="account-item d-flex">
          <div
            className="avatar d-flex align-items-center"
            style={{ width: "20%" }}
          >
            <img
              style={{ borderRadius: "50%" }}
              src="https://scontent-sin6-2.cdninstagram.com/v/t51.2885-19/s150x150/107048713_2674307806161533_629512969060939357_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com&_nc_ohc=4M0n-NbKPuUAX-nk2Nn&oh=48969f67ef5b07e8064e2a86413d7b8d&oe=5F3C8396"
              alt="avatar"
            />
            <p className="ml-2" style={{ fontSize: "14px" }}>
              anthng.it
            </p>
          </div>
        </div>
      </div>
    </ListAccountContainer>
  );
}
