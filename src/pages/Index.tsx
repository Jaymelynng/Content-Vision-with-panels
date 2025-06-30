
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Dumbbell, Library, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { gym } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gym Content Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your gym's content strategy with our comprehensive management platform. 
            Perfect for fitness centers, personal trainers, and gym administrators.
          </p>
          <div className="flex gap-4 justify-center">
            {gym ? (
              <Link to="/content-library">
                <Button size="lg" className="gap-2">
                  Go to Content Library
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button size="lg" className="gap-2">
                    Access Your Content
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/content-library">
                  <Button variant="outline" size="lg">
                    Browse Content
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Library className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>
                Access a comprehensive library of fitness content ideas and templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Browse workout ideas, nutrition tips, and engagement strategies tailored for your gym.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Fitness Templates</CardTitle>
              <CardDescription>
                Professional templates designed specifically for gyms and fitness businesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From social media posts to workout guides, get templates that drive member engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Member Engagement</CardTitle>
              <CardDescription>
                Tools and strategies to keep your gym members motivated and engaged
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create content that builds community and keeps members coming back to your gym.
              </p>
            </CardContent>
          </Card>
        </div>

        {!gym && (
          <div className="text-center bg-white rounded-2xl p-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-4">Ready to Manage Your Gym Content?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join gym owners and fitness professionals who are streamlining their content strategy with our platform.
            </p>
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
