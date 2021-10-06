import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
