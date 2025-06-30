
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, FileText, Users, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ContentIdeasManager } from './admin/ContentIdeasManager';
import { AppSettingsManager } from './admin/AppSettingsManager';
import { ContentCategoriesManager } from './admin/ContentCategoriesManager';

export function AdminPanel() {
  const { gym } = useAuth();
  
  // Check if current gym has admin privileges
  const ADMIN_GYMS = ['1426', '2222'];
  const isAdmin = gym && ADMIN_GYMS.includes(gym.pin_code);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Access denied. Admin privileges required.
              {gym && (
                <span className="block mt-2 text-sm">
                  Current gym: {gym.gym_name} (PIN: {gym.pin_code})
                </span>
              )}
            </p>
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
        <p className="text-sm text-green-600 mt-1">
          Logged in as: {gym.gym_name} (Admin)
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
