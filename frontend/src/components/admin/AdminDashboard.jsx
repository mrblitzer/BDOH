import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../../context/AuthContext';
import QuestionManager from './QuestionManager';
import PanelistManager from './PanelistManager';
import AdminMemberManager from './AdminMemberManager';
import ClubInfoManager from './ClubInfoManager';
import { Settings, Users, BookOpen, Shield, Info } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('questions');

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Manage your platform content here.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg">
            <TabsTrigger value="questions" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Questions</span>
            </TabsTrigger>
            <TabsTrigger value="panelists" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Panelists</span>
            </TabsTrigger>
            <TabsTrigger value="administration" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Administration</span>
            </TabsTrigger>
            <TabsTrigger value="club-info" className="flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>Club Info</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="mt-8">
            <QuestionManager />
          </TabsContent>

          <TabsContent value="panelists" className="mt-8">
            <PanelistManager />
          </TabsContent>

          <TabsContent value="administration" className="mt-8">
            <AdminMemberManager />
          </TabsContent>

          <TabsContent value="club-info" className="mt-8">
            <ClubInfoManager />
          </TabsContent>

          <TabsContent value="settings" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">WhatsApp Integration</h3>
                      <p className="text-sm text-green-700">Manage WhatsApp community links and settings</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Competition Settings</h3>
                      <p className="text-sm text-blue-700">Configure competition parameters and security</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-gray-900 mb-4">Platform Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">6,753</div>
                        <div className="text-sm text-gray-600">Total Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">2,847</div>
                        <div className="text-sm text-gray-600">Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">45</div>
                        <div className="text-sm text-gray-600">Competitions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">78%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;