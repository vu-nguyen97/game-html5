import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./css/style.css";
import AppRoutes from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Don't use queryClient directly
// https://stackoverflow.com/questions/68577988/invalidate-queries-doesnt-work-react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Hiện ko hoạt động? => Check ChatGPT => custom hook
      retry: false,
    },
  },
});

function App() {
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    // @ts-ignore
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
