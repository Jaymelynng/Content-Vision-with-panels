
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Brain } from "lucide-react";
import { DocumentUploadZone } from "@/components/DocumentUploadZone";
import { DocumentList } from "@/components/DocumentList";
import { ExtractedContentReview } from "@/components/ExtractedContentReview";

export default function DocumentProcessing() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Document Processing Center</h1>
        <p className="text-gray-600">
          Upload your brain dumps and let AI extract structured content ideas for your gym
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            My Documents
          </TabsTrigger>
          <TabsTrigger value="extracted" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Extracted Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Brain Dumps</CardTitle>
              <p className="text-gray-600">
                Upload massive documents, PDFs, Word docs, or simple text files. 
                The AI will read through everything and extract structured content ideas.
              </p>
            </CardHeader>
            <CardContent>
              <DocumentUploadZone />
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What can you upload?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• PDF documents (any size)</li>
                  <li>• Word documents (.docx, .doc)</li>
                  <li>• Text files (.txt, .md)</li>
                  <li>• HTML files</li>
                  <li>• RTF documents</li>
                  <li>• Up to 100MB per file</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <p className="text-gray-600">
                Manage your uploaded documents and track processing status
              </p>
            </CardHeader>
            <CardContent>
              <DocumentList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extracted">
          <Card>
            <CardHeader>
              <CardTitle>Extracted Content Ideas</CardTitle>
              <p className="text-gray-600">
                Review and approve content ideas extracted from your documents
              </p>
            </CardHeader>
            <CardContent>
              <ExtractedContentReview />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
