import { 
  Typography, 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Button,
  Input,
  Label,
  Avatar,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@arfcodes/ui';
import { User, Bell, Shield, Store, Globe, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage store configuration and application settings.</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent p-0 border-b rounded-none mb-6">
          <TabsTrigger value="general" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <Store className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Update your store details and public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="ARF Codes Store" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="storeDescription">Description</Label>
                <Textarea id="storeDescription" defaultValue="Premium digital products and coding resources." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="idr">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idr">IDR - Indonesian Rupiah</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="wib">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wib">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="wita">Asia/Makassar (WITA)</SelectItem>
                      <SelectItem value="wit">Asia/Jayapura (WIT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your personal information and login details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-border" fallback="AD" />
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue="Admin" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue="User" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@arfcodes.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button>Save Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your admin dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Theme Preference</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                    <div className="bg-white h-20 rounded mb-2 border border-gray-200"></div>
                    <p className="text-sm font-medium text-center">Light</p>
                  </div>
                  <div className="border-2 border-primary rounded-md p-2 cursor-pointer bg-accent/10">
                    <div className="bg-slate-950 h-20 rounded mb-2 border border-slate-800"></div>
                    <p className="text-sm font-medium text-center">Dark</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                    <div className="bg-linear-to-r from-white to-slate-950 h-20 rounded mb-2 border border-gray-200"></div>
                    <p className="text-sm font-medium text-center">System</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button>Update Theme</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Order Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new orders.</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when inventory is low.</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive news and promotional materials.</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="toggle" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
