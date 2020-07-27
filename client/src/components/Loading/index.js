import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LoadingPage, ContainerImage } from "./styles";
import GifLoading from "../../assets/loading.gif";

function Loading(props) {
  const { showLoading } = props;
  return showLoading ? (
    <LoadingPage>
      <ContainerImage>
        <img src={GifLoading} alt="loading" />
      </ContainerImage>
    </LoadingPage>
  ) : null;
}

Loading.propTypes = {
  showLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    showLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps, null)(Loading);
