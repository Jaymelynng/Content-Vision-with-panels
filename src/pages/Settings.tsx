
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and customize your experience.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="gym">Gym Settings</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal information and profile details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Jayme" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jayme@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="Content Manager" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(123) 456-7890" />
              </div>

              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
              <CardDescription>
                Update your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Enable two-factor authentication</Label>
              </div>

              <Button onClick={handleSave}>
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gym" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gym Information</CardTitle>
              <CardDescription>
                Update your gym's details and location information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gym-name">Gym Name</Label>
                <Input id="gym-name" placeholder="CRR Gymnastics" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gym-location">Location</Label>
                <Input id="gym-location" placeholder="123 Main St, Anytown, CA 12345" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gym-code">Location Code</Label>
                <Input id="gym-code" placeholder="CRR" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gym-website">Website</Label>
                <Input id="gym-website" placeholder="https://www.example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gym-phone">Contact Phone</Label>
                <Input id="gym-phone" placeholder="(123) 456-7890" />
              </div>

              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>
                Configure team member permissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Manager Access Level</Label>
                <RadioGroup defaultValue="content" className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="limited" id="r1" />
                    <Label htmlFor="r1">Limited (Upload Only)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="content" id="r2" />
                    <Label htmlFor="r2">Content Creator (Upload & Edit)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="r3" />
                    <Label htmlFor="r3">Full Access (Upload, Edit & Publish)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Content Approval Requirements</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="require-approval" defaultChecked />
                  <Label htmlFor="require-approval">Require approval before publishing</Label>
                </div>
              </div>

              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>
                Configure your gym's branding elements for content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex">
                    <Input 
                      id="primary-color" 
                      type="color" 
                      defaultValue="#e83e8c" 
                      className="w-16 h-10 p-1 mr-2" 
                    />
                    <Input
                      id="primary-color-hex"
                      defaultValue="#e83e8c"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex">
                    <Input 
                      id="secondary-color" 
                      type="color" 
                      defaultValue="#6c757d" 
                      className="w-16 h-10 p-1 mr-2" 
                    />
                    <Input
                      id="secondary-color-hex"
                      defaultValue="#6c757d"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo Upload</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="mb-4 w-32 h-32 mx-auto bg-slate-100 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Gym Logo</span>
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Brand Fonts</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heading-font" className="text-sm text-muted-foreground mb-1 block">Heading Font</Label>
                    <select id="heading-font" className="w-full border rounded-md h-10 px-3">
                      <option>Montserrat</option>
                      <option>Poppins</option>
                      <option>Roboto</option>
                      <option>Open Sans</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="body-font" className="text-sm text-muted-foreground mb-1 block">Body Font</Label>
                    <select id="body-font" className="w-full border rounded-md h-10 px-3">
                      <option>Open Sans</option>
                      <option>Roboto</option>
                      <option>Lato</option>
                      <option>Nunito</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>
                Save Branding
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Watermarks</CardTitle>
              <CardDescription>
                Configure watermarking for your videos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="enable-watermark" defaultChecked />
                  <Label htmlFor="enable-watermark">Enable logo watermark on videos</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="watermark-position">Watermark Position</Label>
                  <select id="watermark-position" className="w-full border rounded-md h-10 px-3">
                    <option>Bottom Right</option>
                    <option>Bottom Left</option>
                    <option>Top Right</option>
                    <option>Top Left</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="watermark-opacity">Watermark Opacity</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Low</span>
                    <Input id="watermark-opacity" type="range" min="10" max="100" defaultValue="15" className="w-full" />
                    <span className="text-sm text-muted-foreground">High</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>
                Save Watermark Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Content Approvals</Label>
                    <p className="text-sm text-muted-foreground">Notify when content needs your approval</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Upcoming Tasks</Label>
                    <p className="text-sm text-muted-foreground">Remind me of upcoming content tasks</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Content Performance</Label>
                    <p className="text-sm text-muted-foreground">Weekly reports on content performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Team Activity</Label>
                    <p className="text-sm text-muted-foreground">Notify when team members complete tasks</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notification Delivery Method</Label>
                <RadioGroup defaultValue="both" className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="n1" />
                    <Label htmlFor="n1">Email Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="n2" />
                    <Label htmlFor="n2">In-App Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="n3" />
                    <Label htmlFor="n3">Both Email and In-App</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={handleSave}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
