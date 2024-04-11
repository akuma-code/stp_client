import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./Theme";
import "./index.css";
import { QueryClient } from '@tanstack/react-query';
import { SuspenseLoad } from './Components/UI/SuspenseLoad';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 10000,
      gcTime: 1000 * 60
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
