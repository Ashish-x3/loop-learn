
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LearnMode from "./pages/LearnMode";
import Achievements from "./pages/Achievements";
import Goals from "./pages/Goals";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import SavedFlashcards from "./pages/SavedFlashcards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<LearnMode />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<SavedFlashcards />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
