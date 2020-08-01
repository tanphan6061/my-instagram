import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import { AppWebPage, H1, H3, Content, ListSwitch, Span } from "./styles";

function AppWebSetting(props) {
  const { location } = props;
  const name = location.search.split("=")[1];

  return (
    <AppWebPage className="app-web-setting-page">
      <H1>Apps and Websites</H1>
      <ListSwitch>
        <Link to="/accounts/web?name=active">
          <H3 className={classNames({ active: name === "active" })}>ACTIVE</H3>
        </Link>
        <Link to="/accounts/web?name=expired">
          <H3 className={classNames({ active: name === "expired" })}>
            EXPIRED
          </H3>
        </Link>
        <Link to="/accounts/web?name=removed">
          <H3 className={classNames({ active: name === "removed" })}>
            REMOVED
          </H3>
        </Link>
      </ListSwitch>
      <Content>
        {name === "active" && (
          <>
            <p>
              These are apps and websites you&apos;ve used Instagram to log into
              and have recently used. They can request info you chose to share
              with them.
            </p>
            <Span>
              You have not authorized any applications to access your Instagram
              account.
            </Span>
          </>
        )}

        {name === "expired" && (
          <>
            <p>
              These are apps and websites you&apos;ve used Instagram to log into
              and may not have used in a while. They may still have access to
              info you previously shared, but their ability to make additional
              requests for private info has expired.
            </p>
            <Span>
              You have no expired applications that had access to your Instagram
              account.
            </Span>
          </>
        )}

        {name === "removed" && (
          <>
            <p>
              These are apps and websites you removed from your account. This
              means they may still have access to info you previously shared,
              but can&apos;t make additional requests for private info.
            </p>
            <Span>
              You have no removed applications that had access to your Instagram
              account.
            </Span>
          </>
        )}
      </Content>
    </AppWebPage>
  );
}

AppWebSetting.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.func,
  }),
};

export default AppWebSetting;
