
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheck, Copy, PlayCircle, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Preview = () => {
  const handleApprove = () => {
    toast.success("Video approved and scheduled for publishing!");
  };

  const handleReject = () => {
    toast.info("Video sent back for revisions.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">PrePost Critic</h1>
          <p className="text-muted-foreground">
            Performance prediction and quality analysis.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleReject}>
            <X className="mr-2 h-4 w-4" />
            Request Changes
          </Button>
          <Button onClick={handleApprove}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Approve & Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="bg-slate-900 aspect-video relative flex items-center justify-center">
            <Button variant="outline" size="lg" className="bg-black/50 text-white border-white/20 hover:bg-black/70">
              <PlayCircle className="mr-2 h-5 w-5" />
              Play Video
            </Button>
          </div>
          
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-2xl font-bold">Summer Camp Promo</h2>
                  <p className="text-muted-foreground">Seasonal Event Template</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    0:42 Duration
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    May 2025
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <Button variant="outline" size="sm" className="h-8">
                  <Copy className="mr-2 h-3.5 w-3.5" />
                  Copy Link
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <ThumbsUp className="mr-2 h-3.5 w-3.5" />
                  Good Job!
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <ThumbsDown className="mr-2 h-3.5 w-3.5" />
                  Needs Work
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Predicted Retention</h4>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">A-</Badge>
                  </div>
                  <span className="text-sm font-medium">85% completion rate</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300" style={{ width: '85%' }}></div>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-xs text-muted-foreground">0:00</span>
                  <div className="flex-1 px-2 relative">
                    <div className="absolute left-[70%] -translate-x-1/2 top-0 h-3 border-l border-amber-400"></div>
                    <div className="absolute left-[70%] -translate-x-1/2 bottom-0 text-xs text-amber-600">Potential drop-off</div>
                  </div>
                  <span className="text-xs text-muted-foreground">0:42</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Engagement Quality</h4>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">B+</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  <div>
                    <div className="h-8 bg-green-500 rounded-sm"></div>
                    <p className="text-xs mt-1 text-center">Clarity</p>
                  </div>
                  <div>
                    <div className="h-6 bg-green-400 rounded-sm"></div>
                    <p className="text-xs mt-1 text-center">Relevance</p>
                  </div>
                  <div>
                    <div className="h-4 bg-amber-400 rounded-sm"></div>
                    <p className="text-xs mt-1 text-center">Emotion</p>
                  </div>
                  <div>
                    <div className="h-7 bg-green-500 rounded-sm"></div>
                    <p className="text-xs mt-1 text-center">Action</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Technical Quality</h4>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">B</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Video</span>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-slate-200"></div>
                      </div>
                      <span className="text-sm ml-2">4/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audio</span>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-slate-200"></div>
                        <div className="h-2 w-4 rounded-sm bg-slate-200"></div>
                      </div>
                      <span className="text-sm ml-2">3/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lighting</span>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-green-500"></div>
                        <div className="h-2 w-4 rounded-sm bg-slate-200"></div>
                      </div>
                      <span className="text-sm ml-2">4/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
              <CardDescription>AI-generated recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="font-medium text-amber-800 mb-1">Audio Clarity</p>
                <p className="text-sm text-amber-700">
                  Background noise detected at 0:15-0:20. Consider adding subtle background music to mask it.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="font-medium text-amber-800 mb-1">Pacing</p>
                <p className="text-sm text-amber-700">
                  The segment at 0:25-0:32 could be trimmed by ~3 seconds to maintain viewer engagement.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="font-medium text-green-800 mb-1">Strong Opening</p>
                <p className="text-sm text-green-700">
                  The opening 5 seconds are highly effective and should be kept as is.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="font-medium text-amber-800 mb-1">Call to Action</p>
                <p className="text-sm text-amber-700">
                  The call to action could be clearer. Consider adding text overlay with registration details.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall Grade: B+</CardTitle>
              <CardDescription>This video is predicted to perform above average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>F</span>
                <span>A+</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative">
                <div className="absolute top-0 bottom-0 left-0 right-0 flex">
                  <div className="w-1/6 border-r border-white/20"></div>
                  <div className="w-1/6 border-r border-white/20"></div>
                  <div className="w-1/6 border-r border-white/20"></div>
                  <div className="w-1/6 border-r border-white/20"></div>
                  <div className="w-1/6 border-r border-white/20"></div>
                  <div className="w-1/6"></div>
                </div>
                <div className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"></div>
                <div className="absolute top-0 h-full w-3 bg-black/50 border-2 border-white rounded-full" style={{ left: 'calc(80% - 6px)' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>

              <div className="mt-4 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span>Compared to your videos</span>
                  <span className="font-medium text-green-600">+12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Compared to gym average</span>
                  <span className="font-medium text-green-600">+8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Compared to all locations</span>
                  <span className="font-medium text-green-600">+15%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Preview;
