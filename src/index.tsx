import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient } from '@tanstack/react-query';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./Theme";
import "./index.css";
import reportWebVitals from './reportWebVitals';

export const indexQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      staleTime: 10000,
      gcTime: 1000 * 60 * 5
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
reportWebVitals();
