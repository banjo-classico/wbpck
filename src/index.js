import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import ReactGA from "react-ga";
import { debounce } from "lodash/fp";
import configureStore from "./store/configureStore";
import routes from "./routes";
import "./styles/global.css";

// INIT LUCKY ORANGE
const initLuckyOrange = () => {
  const wa = document.createElement("script");
  wa.type = "text/javascript";
  wa.async = true;
  wa.src = "https://d10lpsik1i8c69.cloudfront.net/w.js";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wa, s);
};

if (process.env.NODE_ENV !== "production") {
  // initialze google analytics
  ReactGA.initialize("UA-85777935-1");
} else {
  // initialze google analytics and lucky orange in production
  ReactGA.initialize("UA-85782755-1");
  // eslint-disable-next-line no-underscore-dangle
  window.__lo_site_id = 67397;
  initLuckyOrange();
}

const logPageView = debounce(1000, () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
});

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} onUpdate={logPageView} routes={routes(store)} />
    </Provider>,
    document.getElementById("react")
  );
};

if (process.env.NODE_ENV !== "production") {
  setTimeout(renderApp, 250);
} else {
  renderApp();
}
