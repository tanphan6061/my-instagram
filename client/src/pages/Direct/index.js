import React from "react";

import { PageDirect } from "./styles";

import ListAccount from "../../components/ListAccount/index";

export default function Direct() {
  return (
    <PageDirect>
      <ListAccount />
      <div className="message-container" />
    </PageDirect>
  );
}
