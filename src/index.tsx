import { CssBaseline, ThemeProvider } from '@mui/material';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./Theme";
import "./index.css";
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>

    <ThemeProvider theme={ theme }>

      <CssBaseline enableColorScheme />
      <App />

    </ThemeProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
