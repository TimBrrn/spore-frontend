import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { Home } from "./pages/Dashboard";
import { SampleDetails } from "./pages/Sample";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sample/:id" element={<SampleDetails />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#2D2D2D",
            color: "#FFFFFF",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
