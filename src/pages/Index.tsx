
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Video, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { gym } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Amazing Content with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your ideas into engaging content with our AI-powered creation tools. 
            Perfect for content creators, marketers, and businesses.
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
                    Get Started
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
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>AI-Powered Creation</CardTitle>
              <CardDescription>
                Let AI guide your content creation process with intelligent suggestions and templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get personalized content ideas based on your niche and audience preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Professional Templates</CardTitle>
              <CardDescription>
                Access a library of proven content templates for different platforms and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From TikTok reels to Instagram posts, we have templates that convert.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Quick & Easy</CardTitle>
              <CardDescription>
                Create professional content in minutes, not hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Upload your raw footage and let our AI handle the editing and optimization.
              </p>
            </CardContent>
          </Card>
        </div>

        {!gym && (
          <div className="text-center bg-white rounded-2xl p-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Creating?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join thousands of creators who are already using our platform to create amazing content.
            </p>
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Sign Up Now
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
