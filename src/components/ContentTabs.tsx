
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Settings, Video } from "lucide-react";

interface ContentTabsProps {
  selectedFormat: 'photo' | 'video';
  guideData: {
    setupPlanning: {
      photo: string[];
      video: string[];
    };
    productionTips: {
      photo: string[];
      video: string[];
    };
    uploadTrack: {
      photo: string[];
      video: string[];
    };
  };
}

export function ContentTabs({ selectedFormat, guideData }: ContentTabsProps) {
  const renderListItems = (items: string[]) => (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
            {index + 1}
          </div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Setup & Planning</TabsTrigger>
          <TabsTrigger value="production">Production Tips</TabsTrigger>
          <TabsTrigger value="upload">Upload & Track</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Content Planning & Strategy
                <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                  {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderListItems(guideData.setupPlanning[selectedFormat])}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Production Guidelines
                <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                  {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderListItems(guideData.productionTips[selectedFormat])}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Upload & Tracking
                <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                  {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderListItems(guideData.uploadTrack[selectedFormat])}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
