import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import BusinessFitPage from "./pages/BusinessFitPage";
import BorrowingCapacityPage from "./pages/BorrowingCapacityPage";
import DealMetricsPage from "./pages/DealMetricsPage";
import ResourcesPage from "./pages/ResourcesPage";
import DashboardPage from "./pages/DashboardPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/business-fit" component={BusinessFitPage} />
      <Route path="/borrowing-capacity" component={BorrowingCapacityPage} />
      <Route path="/deal-metrics" component={DealMetricsPage} />
      <Route path="/resources" component={ResourcesPage} />
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
