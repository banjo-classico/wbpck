import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(browserHistory);
  const store = createStore(rootReducer, compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./rootReducer", () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  rootSaga.map(_ => sagaMiddleware.run(_));

  return store;
}
