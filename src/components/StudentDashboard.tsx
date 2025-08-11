import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountryToggle from './CountryToggle';
import DashboardCard from './DashboardCard';
import ApplicationCard from './ApplicationCard';
import QuickActions from './QuickActions';
import NotificationsFeed from './NotificationsFeed';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  GraduationCap,
  Globe
} from 'lucide-react';

// Mock data
const mockApplications = [
  {
    id: 'APP001',
    university: 'Technical University of Munich',
    course: 'Master of Computer Science',
    country: 'germany' as const,
    status: 'in-review' as const,
    progress: 75,
    currentStage: 'Document Verification',
    nextStep: 'Upload missing transcript copy',
    assignedAdmin: 'Sarah Mueller',
    dueDate: '2024-08-20',
    documentsCount: { uploaded: 8, required: 10 },
  },
  {
    id: 'APP002',
    university: 'University of Oxford',
    course: 'MSc Data Science',
    country: 'uk' as const,
    status: 'approved' as const,
    progress: 100,
    currentStage: 'Offer Received',
    nextStep: 'Accept offer and pay deposit',
    assignedAdmin: 'James Smith',
    dueDate: '2024-09-01',
    documentsCount: { uploaded: 12, required: 12 },
  },
  {
    id: 'APP003',
    university: 'University of Edinburgh',
    course: 'MA International Relations',
    country: 'uk' as const,
    status: 'action-required' as const,
    progress: 60,
    currentStage: 'Documentation',
    nextStep: 'Resubmit personal statement',
    assignedAdmin: 'Emma Wilson',
    dueDate: '2024-08-15',
    documentsCount: { uploaded: 6, required: 10 },
  },
];

const mockNotifications = [
  {
    id: 'N001',
    type: 'status' as const,
    title: 'Application Status Update',
    message: 'Your TUM application has been approved! Congratulations!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    priority: 'high' as const,
    applicationId: 'APP001',
  },
  {
    id: 'N002',
    type: 'document' as const,
    title: 'Document Verification Required',
    message: 'Please resubmit your transcript with official seal',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    priority: 'medium' as const,
    applicationId: 'APP003',
  },
  {
    id: 'N003',
    type: 'message' as const,
    title: 'Message from Admin',
    message: 'Hi! I\'ve reviewed your application. Everything looks great so far.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    priority: 'low' as const,
    applicationId: 'APP001',
  },
];

const StudentDashboard: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<'germany' | 'uk'>('germany');

  const handleApplicationAction = (applicationId: string, action: string) => {
    console.log(`${action} for application ${applicationId}`);
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
  };

  const handleNotificationClick = (notification: any) => {
    console.log('Notification clicked:', notification);
  };

  const handleMarkAllRead = () => {
    console.log('Mark all notifications as read');
  };

  // Filter applications by selected country or show all
  const filteredApplications = mockApplications.filter(
    app => selectedCountry === 'germany' ? app.country === 'germany' : app.country === 'uk'
  );

  const dashboardStats = {
    activeApplications: mockApplications.length,
    pendingDocuments: mockApplications.reduce((acc, app) => 
      acc + (app.documentsCount.required - app.documentsCount.uploaded), 0),
    offersReceived: mockApplications.filter(app => app.status === 'approved').length,
    avgProgress: Math.round(mockApplications.reduce((acc, app) => acc + app.progress, 0) / mockApplications.length),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gunmetal-50/20">
      {/* Header */}
      <header className="glass-nav border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-accent" />
                <div>
                  <h1 className="heading-2 text-foreground">UNI 360°</h1>
                  <p className="small text-muted-foreground">Student Dashboard</p>
                </div>
              </div>
            </div>
            <CountryToggle 
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="heading-2 text-foreground mb-2">
            Welcome back! 👋
          </h2>
          <p className="body text-muted-foreground">
            Here's what's happening with your university applications
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Active Applications"
            value={dashboardStats.activeApplications}
            subtitle="Across all countries"
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Pending Documents"
            value={dashboardStats.pendingDocuments}
            subtitle="Need your attention"
            icon={<Clock className="h-5 w-5" />}
          />
          <DashboardCard
            title="Offers Received"
            value={dashboardStats.offersReceived}
            subtitle="Congratulations!"
            icon={<CheckCircle className="h-5 w-5" />}
            trend={{ value: 25, isPositive: true }}
          />
          <DashboardCard
            title="Average Progress"
            value={`${dashboardStats.avgProgress}%`}
            subtitle="Across all applications"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <QuickActions 
              country={selectedCountry}
              onAction={handleQuickAction}
            />

            {/* Applications List */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    <CardTitle className="heading-3">
                      Applications {selectedCountry === 'germany' ? '🇩🇪' : '🇬🇧'}
                    </CardTitle>
                  </div>
                  <span className="small text-muted-foreground">
                    {filteredApplications.length} active
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {filteredApplications.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="heading-3 text-foreground mb-2">
                        No applications for {selectedCountry === 'germany' ? 'Germany' : 'UK'}
                      </h3>
                      <p className="body text-muted-foreground mb-6">
                        Start your journey by creating your first application
                      </p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleQuickAction('create-application')}
                      >
                        Create Application
                      </button>
                    </div>
                  ) : (
                    filteredApplications.map((application) => (
                      <ApplicationCard
                        key={application.id}
                        {...application}
                        onViewDetails={() => handleApplicationAction(application.id, 'view')}
                        onMessage={() => handleApplicationAction(application.id, 'message')}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NotificationsFeed
              notifications={mockNotifications}
              onNotificationClick={handleNotificationClick}
              onMarkAllRead={handleMarkAllRead}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;