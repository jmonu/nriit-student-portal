
import React, { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertTriangle, RefreshCw, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import dbService from '@/lib/database/db-service';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  
  // Example settings
  const [settings, setSettings] = useState({
    enableNotifications: true,
    enableEmails: false,
    darkModeDefault: true,
    autoLogout: false,
    logRetention: 30, // days
  });
  
  const handleSettingChange = (setting: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save settings to database
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully."
    });
  };
  
  const handleDatabaseReset = () => {
    try {
      // Reset the database to initial state
      dbService.resetDatabase();
      
      toast({
        title: "Database Reset",
        description: "The database has been reset to its initial state."
      });
      
      // Close dialog
      setResetDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset database.",
        variant: "destructive"
      });
    }
  };
  
  if (!user || (user.type !== 'admin' && user.type !== 'teacher')) {
    return <div className="p-4">Unauthorized access.</div>;
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure system-wide settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="font-medium">Enable Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow system to send notifications
              </p>
            </div>
            <Switch
              id="notifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emails" className="font-medium">Enable Email Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Send notifications via email
              </p>
            </div>
            <Switch
              id="emails"
              checked={settings.enableEmails}
              onCheckedChange={(checked) => handleSettingChange("enableEmails", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="font-medium">Dark Mode by Default</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use dark mode as default theme
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkModeDefault}
              onCheckedChange={(checked) => handleSettingChange("darkModeDefault", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-logout" className="font-medium">Auto Logout After Inactivity</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically log out users after period of inactivity
              </p>
            </div>
            <Switch
              id="auto-logout"
              checked={settings.autoLogout}
              onCheckedChange={(checked) => handleSettingChange("autoLogout", checked)}
            />
          </div>
          
          <div className="mt-6">
            <Button onClick={handleSaveSettings} className="flex items-center gap-2">
              <Save size={16} />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Database Management */}
      {user.type === 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle>Database Management</CardTitle>
            <CardDescription>Advanced database operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-900 rounded-md">
                <h3 className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium mb-2">
                  <AlertTriangle size={16} className="mr-2" />
                  Danger Zone
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  These actions are irreversible. Please be careful.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={() => setResetDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Reset Database to Initial State
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Reset Database Confirmation Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Database?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all data to initial state. All users, classes, schedules, and other data will be reset to default values. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDatabaseReset} className="bg-red-600 hover:bg-red-700">
              Yes, Reset Database
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingsPage;
