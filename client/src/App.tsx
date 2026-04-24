import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import UnitPage from "./pages/UnitPage";
import ToolPage from "./pages/ToolPage";
import ToolWorksheet from "./pages/ToolWorksheet";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/unit/:unitId" component={UnitPage} />
      {/* Fillable worksheet — primary tool interaction */}
      <Route path="/tool/:toolId" component={ToolWorksheet} />
      {/* Legacy detail view */}
      <Route path="/unit/:unitId/tool/:toolId" component={ToolPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
