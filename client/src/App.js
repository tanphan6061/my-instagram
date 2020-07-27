import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { configStore, history } from "./redux/configStore";
import { checkAuth } from "./actions/auth";
import Layout from "./pages/Layout";

function App() {
  const store = configStore();
  store.dispatch(checkAuth());
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
