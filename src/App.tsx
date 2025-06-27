
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AppLayout from "./layouts/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ContentLibrary from "./pages/ContentLibrary";
import Templates from "./pages/Templates";
import ContentUpload from "./pages/ContentUpload";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content-library" element={<ContentLibrary />} />
                <Route path="templates" element={<Templates />} />
                <Route path="upload" element={<ContentUpload />} />
                <Route path="editor" element={<Editor />} />
                <Route path="preview" element={<Preview />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
