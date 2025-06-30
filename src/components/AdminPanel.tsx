
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, FileText, Users, Plus } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useUserRole';
import { ContentIdeasManager } from './admin/ContentIdeasManager';
import { AppSettingsManager } from './admin/AppSettingsManager';
import { ContentCategoriesManager } from './admin/ContentCategoriesManager';

export function AdminPanel() {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage content ideas, categories, and app settings.
        </p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Content Ideas
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <ContentIdeasManager />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <ContentCategoriesManager />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <AppSettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
