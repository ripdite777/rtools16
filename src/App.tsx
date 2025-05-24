
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BuyScript from "./pages/BuyScript";
import ConfigBuilder from "./pages/ConfigBuilder";
import RateCalculator from "./pages/RateCalculator";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buy-script" element={<BuyScript />} />
          <Route path="/config-builder" element={<ConfigBuilder />} />
          <Route path="/rate-calculator" element={<RateCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          /*<Route path="*" element={<NotFound />} /> */
          <Route path="*" element={<Maintenance />} /> 
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
