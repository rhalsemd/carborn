import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules/root/rootReducer";
import rootSaga from "./modules/root/rootSaga";

declare global {
  interface Window {
    naver: any;
  }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
