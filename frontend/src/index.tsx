import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./hooks/store";
const { library } = require("@fortawesome/fontawesome-svg-core");
const { fab } = require("@fortawesome/free-brands-svg-icons");
const { fas } = require("@fortawesome/free-solid-svg-icons");
const { far } = require("@fortawesome/free-regular-svg-icons");

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}> {/* HERE */}
      <App /> {/* Now, App is wrapped in Provider and hence can read from store */}
    </Provider>
    </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

library.add(fab, fas, far);
