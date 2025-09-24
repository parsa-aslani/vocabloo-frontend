import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./error/ErrorPage";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// react router
import { BrowserRouter } from "react-router-dom";
// react error boundary
import { ErrorBoundary } from "react-error-boundary";
// set error boundary
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
