import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CountryToggle from '@/components/CountryToggle';
import DashboardCard from '@/components/DashboardCard';
import ApplicationCard from '@/components/ApplicationCard';
import QuickActions from '@/components/QuickActions';
import NotificationsFeed from '@/components/NotificationsFeed';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  GraduationCap,
  Globe,
  Settings,
  LogOut
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
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    priority: 'high' as const,
    applicationId: 'APP001',
  },
  {
    id: 'N002',
    type: 'document' as const,
    title: 'Document Verification Required',
    message: 'Please resubmit your transcript with official seal',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: false,
    priority: 'medium' as const,
    applicationId: 'APP003',
  },
];

const StudentDashboard: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<'germany' | 'uk'>('germany');

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
                  <p className="small text-muted-foreground">Student Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CountryToggle 
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
              />
              <div className="flex items-center gap-2">
                <Link to="/admin">
                  <Button variant="outline" size="sm">
                    Admin Portal
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
          <Link to="/student/applications">
            <DashboardCard
              title="Active Applications"
              value={dashboardStats.activeApplications}
              subtitle="Across all countries"
              icon={<FileText className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
            />
          </Link>
          <Link to="/student/documents">
            <DashboardCard
              title="Pending Documents"
              value={dashboardStats.pendingDocuments}
              subtitle="Need your attention"
              icon={<Clock className="h-5 w-5" />}
            />
          </Link>
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
              onAction={(action) => {
                if (action === 'create-application') {
                  window.location.href = '/student/applications/new';
                } else if (action === 'add-wishlist') {
                  window.location.href = '/student/wishlist';
                } else if (action === 'chat-admin') {
                  window.location.href = '/student/messages';
                } else if (action === 'upload-documents') {
                  window.location.href = '/student/documents';
                }
                console.log(`Quick action: ${action}`);
              }}
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
                      <Link to="/student/applications/new">
                        <Button variant="hero">
                          Create Application
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    filteredApplications.map((application) => (
                      <ApplicationCard
                        key={application.id}
                        {...application}
                        onViewDetails={() => window.location.href = `/student/applications/${application.id}`}
                        onMessage={() => window.location.href = `/student/messages?app=${application.id}`}
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
              onNotificationClick={(notification) => {
                window.location.href = `/student/notifications/${notification.id}`;
              }}
              onMarkAllRead={() => console.log('Mark all notifications as read')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;