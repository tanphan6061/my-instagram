import React from "react";

import { LoadingPage, ContainerImage } from "./styles";
import GifLoading from "../../assets/loading.gif";

function Loading() {
  return (
    <LoadingPage>
      <ContainerImage>
        <img src={GifLoading} alt="loading" />
      </ContainerImage>
    </LoadingPage>
  );
}

export default Loading;
