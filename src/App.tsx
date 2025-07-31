import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";
import LorePage from "./pages/LorePage";
import AmyPage from "./pages/AmyPage";
import GoosePage from "./pages/GoosePage";
import DotPage from "./pages/DotPage";
import ClaudePage from "./pages/ClaudePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/post/:id" element={<BlogPostPage />} />
          <Route path="/lore" element={<LorePage />} />
          <Route path="/agents/amy" element={<AmyPage />} />
          <Route path="/agents/goose" element={<GoosePage />} />
          <Route path="/agents/dot" element={<DotPage />} />
          <Route path="/agents/claude" element={<ClaudePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
