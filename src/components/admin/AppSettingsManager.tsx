
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSettings } from '@/hooks/useAppSettings';

export function AppSettingsManager() {
  const { data: appSettings, isLoading } = useAppSettings();

  if (isLoading) {
    return <div>Loading app settings...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">App Settings</h2>
      
      <div className="grid gap-4">
        {Object.entries(appSettings || {}).map(([key, value]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-lg">{key.replace(/_/g, ' ').toUpperCase()}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(value, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
