
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Settings, Shield, Bell, Calendar, Layout, 
  Mail, Users, Server, HelpCircle
} from 'lucide-react';

const SettingsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    systemUpdates: true,
    newComplaints: true
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    instituteName: 'NRI Institute of Technology',
    instituteTagline: 'Excellence in Education',
    academicYear: '2024-2025',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: '24hr'
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: '90',
    sessionTimeout: '30',
    ipRestriction: false
  });
  
  const { toast } = useToast();
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleSaveGeneral = () => {
    toast({
      title: "General settings updated",
      description: "Your institution settings have been saved successfully.",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security settings updated",
      description: "Your security configurations have been saved.",
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Admin Settings</h1>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Layout size={20} />
                  <span>General Settings</span>
                </div>
              </CardTitle>
              <CardDescription>
                Configure your institution and system preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="instituteName">Institution Name</Label>
                  <Input 
                    id="instituteName" 
                    value={generalSettings.instituteName} 
                    onChange={(e) => setGeneralSettings({...generalSettings, instituteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="instituteTagline">Institution Tagline</Label>
                  <Input 
                    id="instituteTagline" 
                    value={generalSettings.instituteTagline} 
                    onChange={(e) => setGeneralSettings({...generalSettings, instituteTagline: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="academicYear">Current Academic Year</Label>
                  <Input 
                    id="academicYear" 
                    value={generalSettings.academicYear} 
                    onChange={(e) => setGeneralSettings({...generalSettings, academicYear: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select 
                    value={generalSettings.dateFormat}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, dateFormat: value})}
                  >
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                      <SelectItem value="MM-DD-YYYY">MM-DD-YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select 
                    value={generalSettings.timeFormat}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timeFormat: value})}
                  >
                    <SelectTrigger id="timeFormat">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12hr">12 Hour</SelectItem>
                      <SelectItem value="24hr">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Bell size={20} />
                  <span>Notification Settings</span>
                </div>
              </CardTitle>
              <CardDescription>
                Configure how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications" className="text-base font-medium">SMS Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via text message</p>
                  </div>
                  <Switch 
                    id="smsNotifications" 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="loginAlerts" className="text-base font-medium">Login Alerts</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified of new account logins</p>
                  </div>
                  <Switch 
                    id="loginAlerts" 
                    checked={notificationSettings.loginAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, loginAlerts: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates" className="text-base font-medium">System Updates</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notifications about system changes and updates</p>
                  </div>
                  <Switch 
                    id="systemUpdates" 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newComplaints" className="text-base font-medium">New Complaints</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notifications when students submit new complaints</p>
                  </div>
                  <Switch 
                    id="newComplaints" 
                    checked={notificationSettings.newComplaints}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newComplaints: checked})}
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  <span>Security Settings</span>
                </div>
              </CardTitle>
              <CardDescription>
                Configure security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth" className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Require a second form of verification when logging in</p>
                  </div>
                  <Switch 
                    id="twoFactorAuth" 
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label htmlFor="passwordExpiry">Password Expiry (Days)</Label>
                  <Select 
                    value={securitySettings.passwordExpiry}
                    onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiry: value})}
                  >
                    <SelectTrigger id="passwordExpiry">
                      <SelectValue placeholder="Select expiry period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Users will be prompted to change their password after this period</p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="sessionTimeout">Session Timeout (Minutes)</Label>
                  <Select 
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}
                  >
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue placeholder="Select timeout period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="60">60 Minutes</SelectItem>
                      <SelectItem value="120">2 Hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Users will be logged out after this period of inactivity</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ipRestriction" className="text-base font-medium">IP Restriction</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch 
                    id="ipRestriction" 
                    checked={securitySettings.ipRestriction}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestriction: checked})}
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSecurity}>
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
