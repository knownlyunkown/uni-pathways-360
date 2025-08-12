import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import DashboardCard from '@/components/DashboardCard';
import StatusBadge from '@/components/StatusBadge';
import AdminSidebar from '@/components/AdminSidebar';
import { 
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Shield,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
  Eye,
  User
} from 'lucide-react';

const mockQueueApplications = [
  {
    id: 'APP001',
    studentName: 'Alex Johnson',
    university: 'Technical University of Munich',
    course: 'Master of Computer Science',
    country: 'germany' as const,
    status: 'pending' as const,
    priority: 'high' as const,
    submittedDate: '2024-08-10',
    documentsCount: { uploaded: 8, required: 10 },
  },
  {
    id: 'APP002',
    studentName: 'Sarah Chen',
    university: 'University of Oxford',
    course: 'MSc Data Science',
    country: 'uk' as const,
    status: 'action-required' as const,
    priority: 'medium' as const,
    submittedDate: '2024-08-11',
    documentsCount: { uploaded: 12, required: 12 },
  },
  {
    id: 'APP003',
    studentName: 'Mohammed Ali',
    university: 'University of Edinburgh',
    course: 'MA International Relations',
    country: 'uk' as const,
    status: 'pending' as const,
    priority: 'low' as const,
    submittedDate: '2024-08-12',
    documentsCount: { uploaded: 6, required: 10 },
  },
];

const mockMyApplications = [
  {
    id: 'APP004',
    studentName: 'Emma Wilson',
    university: 'RWTH Aachen',
    course: 'MSc Mechanical Engineering',
    status: 'in-review' as const,
    claimedDate: '2024-08-09',
    dueDate: '2024-08-16',
  },
  {
    id: 'APP005',
    studentName: 'David Kumar',
    university: 'Imperial College London',
    course: 'PhD Computer Science',
    status: 'approved' as const,
    claimedDate: '2024-08-08',
    dueDate: '2024-08-15',
  },
];

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'queue' | 'assigned'>('queue');

  const handleClaimApplication = (applicationId: string) => {
    console.log(`Claiming application ${applicationId}`);
    // Here you would call the API to claim the application
  };

  const dashboardStats = {
    pendingApplications: mockQueueApplications.length,
    myAssignedApplications: mockMyApplications.length,
    completedToday: 5,
    averageProcessingTime: '2.5 days',
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-gunmetal-50/20">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="glass-nav border-b border-white/20 sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">
              <SidebarTrigger className="mr-2" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-accent" />
                <div>
                  <h1 className="heading-2 text-foreground">UNI 360°</h1>
                  <p className="small text-muted-foreground">Admin Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/student">
                <Button variant="outline" size="sm">
                  Student Portal
                </Button>
              </Link>
              <Link to="/master-admin">
                <Button variant="outline" size="sm">
                  Master Admin
                </Button>
              </Link>
              <div className="flex items-center gap-2">
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

          <main className="flex-1 p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="heading-2 text-foreground mb-2">
            Welcome back, Admin! 👋
          </h2>
          <p className="body text-muted-foreground">
            Manage university applications and help students achieve their goals
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Pending Applications"
            value={dashboardStats.pendingApplications}
            subtitle="Waiting for review"
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: 8, isPositive: false }}
          />
          <DashboardCard
            title="My Assigned"
            value={dashboardStats.myAssignedApplications}
            subtitle="Currently processing"
            icon={<Users className="h-5 w-5" />}
          />
          <DashboardCard
            title="Completed Today"
            value={dashboardStats.completedToday}
            subtitle="Applications processed"
            icon={<CheckCircle className="h-5 w-5" />}
            trend={{ value: 25, isPositive: true }}
          />
          <DashboardCard
            title="Avg Processing Time"
            value={dashboardStats.averageProcessingTime}
            subtitle="Your performance"
            icon={<Clock className="h-5 w-5" />}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={selectedTab === 'queue' ? 'accent' : 'ghost'}
            onClick={() => setSelectedTab('queue')}
          >
            Application Queue ({mockQueueApplications.length})
          </Button>
          <Button
            variant={selectedTab === 'assigned' ? 'accent' : 'ghost'}
            onClick={() => setSelectedTab('assigned')}
          >
            My Assigned ({mockMyApplications.length})
          </Button>
        </div>

        {/* Queue Tab */}
        {selectedTab === 'queue' && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="heading-3">Application Queue</CardTitle>
              <p className="small text-muted-foreground">
                New applications waiting for assignment
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockQueueApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border border-white/20 bg-white/5">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {app.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-foreground">{app.studentName}</h4>
                        <p className="small text-muted-foreground">
                          {app.university} • {app.course}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={app.country === 'germany' ? 'default' : 'secondary'}>
                            {app.country === 'germany' ? '🇩🇪 Germany' : '🇬🇧 UK'}
                          </Badge>
                          <Badge variant={app.priority === 'high' ? 'destructive' : app.priority === 'medium' ? 'default' : 'secondary'}>
                            {app.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <StatusBadge status={app.status} />
                        <p className="small text-muted-foreground mt-1">
                          Submitted {app.submittedDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/admin/applications/${app.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button 
                          variant="accent" 
                          size="sm"
                          onClick={() => handleClaimApplication(app.id)}
                        >
                          <User className="h-4 w-4 mr-1" />
                          Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* My Assigned Tab */}
        {selectedTab === 'assigned' && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="heading-3">My Assigned Applications</CardTitle>
              <p className="small text-muted-foreground">
                Applications you're currently processing
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMyApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border border-white/20 bg-white/5">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {app.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-foreground">{app.studentName}</h4>
                        <p className="small text-muted-foreground">
                          {app.university} • {app.course}
                        </p>
                        <p className="small text-muted-foreground">
                          Claimed {app.claimedDate} • Due {app.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={app.status} />
                      <div className="flex gap-2">
                        <Link to={`/admin/applications/${app.id}`}>
                          <Button variant="accent" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Process
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;