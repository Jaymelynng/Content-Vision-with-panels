import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RecentAssignments from "@/components/RecentAssignments";
import TaskList from "@/components/TaskList";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Jayme! Here's what's happening with your content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/upload">Upload New Content</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Created</CardTitle>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
            <div className="mt-3">
              <Progress value={65} className="h-1" />
              <p className="text-xs text-muted-foreground mt-1">
                65% of monthly goal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              -1 from last week
            </p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              <div className="h-1.5 rounded-sm bg-amber-400"></div>
              <div className="h-1.5 rounded-sm bg-amber-400"></div>
              <div className="h-1.5 rounded-sm bg-amber-400"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Performance</CardTitle>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">
              Up from B+ last month
            </p>
            <div className="mt-3">
              <div className="flex space-x-1 mt-2">
                <div className="h-2 w-full rounded-sm bg-green-500"></div>
                <div className="h-2 w-full rounded-sm bg-green-500"></div>
                <div className="h-2 w-full rounded-sm bg-green-500"></div>
                <div className="h-2 w-full rounded-sm bg-amber-400"></div>
                <div className="h-2 w-full rounded-sm bg-slate-200"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Location Rank</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 18a2 2 0 0 1 2 2" />
              <path d="M18 16a2 2 0 0 1 2-2" />
              <path d="M20 12a2 2 0 0 1-2-2" />
              <path d="M16 6a2 2 0 0 1-2-2" />
              <path d="M12 4a2 2 0 0 1-2 2" />
              <path d="M6 8a2 2 0 0 1-2 2" />
              <path d="M4 16a2 2 0 0 1 2 2" />
              <path d="M10 20a2 2 0 0 1 2-2" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3rd</div>
            <p className="text-xs text-muted-foreground">
              of 10 locations
            </p>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-xs font-medium">75%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>
              Your most recent content tasks and their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentAssignments />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>This Week's Tasks</CardTitle>
            <CardDescription>
              Tasks that need your attention.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
