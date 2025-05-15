
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-7xl font-bold mb-6 text-primary">404</h1>
        <p className="text-xl font-medium mb-4">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/">Return to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/templates">Browse Templates</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
