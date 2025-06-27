
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";

interface ContentTabsProps {
  selectedFormat: 'photo' | 'video';
  guideData: {
    postVisual: {
      photo: string[];
      video: string[];
    };
    contentNotes: {
      photo: string[];
      video: string[];
    };
    filmingTips: {
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
      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visual">Post Visual</TabsTrigger>
          <TabsTrigger value="notes">Content Notes</TabsTrigger>
          <TabsTrigger value="filming">Filming Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Visual Composition
                <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                  {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderListItems(guideData.postVisual[selectedFormat])}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Content & Messaging
                <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                  {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderListItems(guideData.contentNotes[selectedFormat])}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Production Guidelines
                <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                  {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderListItems(guideData.filmingTips[selectedFormat])}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
