import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/DashboardCard';
import { 
  Crown,
  Users,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
  Settings,
  LogOut,
  BarChart3,
  UserCog,
  Activity
} from 'lucide-react';

const mockAdminPerformance = [
  {
    id: 'ADMIN001',
    name: 'Sarah Mueller',
    email: 'sarah.mueller@uni360.com',
    assignedApplications: 12,
    completedThisWeek: 8,
    averageProcessingTime: '2.1 days',
    performance: 92,
    status: 'active' as const,
  },
  {
    id: 'ADMIN002',
    name: 'James Smith',
    email: 'james.smith@uni360.com',
    assignedApplications: 15,
    completedThisWeek: 10,
    averageProcessingTime: '2.8 days',
    performance: 88,
    status: 'active' as const,
  },
  {
    id: 'ADMIN003',
    name: 'Emma Wilson',
    email: 'emma.wilson@uni360.com',
    assignedApplications: 8,
    completedThisWeek: 6,
    averageProcessingTime: '1.9 days',
    performance: 95,
    status: 'active' as const,
  },
];

const mockSystemStats = [
  { metric: 'Total Applications', value: '1,247', change: '+12%', period: 'this month' },
  { metric: 'Approval Rate', value: '78%', change: '+3%', period: 'this month' },
  { metric: 'Average Processing Time', value: '2.4 days', change: '-0.3 days', period: 'this month' },
  { metric: 'External API Success Rate', value: '99.2%', change: '+0.5%', period: 'this month' },
];

const MasterAdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'admins' | 'analytics'>('overview');

  const handleRedistributeApplications = () => {
    console.log('Redistributing applications...');
    // Here you would call the API to redistribute applications
  };

  const dashboardStats = {
    totalApplications: 1247,
    activeAdmins: mockAdminPerformance.length,
    pendingApplications: 89,
    systemUptime: '99.9%',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gunmetal-50/20">
      {/* Header */}
      <header className="glass-nav border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="h-8 w-8 text-accent" />
                <div>
                  <h1 className="heading-2 text-foreground">UNI 360°</h1>
                  <p className="small text-muted-foreground">Master Admin Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/student">
                <Button variant="outline" size="sm">
                  Student Portal
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Admin Portal
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

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="heading-2 text-foreground mb-2">
            Master Admin Dashboard 👑
          </h2>
          <p className="body text-muted-foreground">
            Monitor system performance and manage admin operations
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Applications"
            value={dashboardStats.totalApplications.toLocaleString()}
            subtitle="All time"
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Active Admins"
            value={dashboardStats.activeAdmins}
            subtitle="Currently online"
            icon={<Users className="h-5 w-5" />}
          />
          <DashboardCard
            title="Pending Applications"
            value={dashboardStats.pendingApplications}
            subtitle="Awaiting assignment"
            icon={<Clock className="h-5 w-5" />}
            trend={{ value: 8, isPositive: false }}
          />
          <DashboardCard
            title="System Uptime"
            value={dashboardStats.systemUptime}
            subtitle="Last 30 days"
            icon={<Activity className="h-5 w-5" />}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={selectedTab === 'overview' ? 'accent' : 'ghost'}
            onClick={() => setSelectedTab('overview')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            System Overview
          </Button>
          <Button
            variant={selectedTab === 'admins' ? 'accent' : 'ghost'}
            onClick={() => setSelectedTab('admins')}
          >
            <UserCog className="h-4 w-4 mr-2" />
            Admin Performance
          </Button>
          <Button
            variant={selectedTab === 'analytics' ? 'accent' : 'ghost'}
            onClick={() => setSelectedTab('analytics')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* System Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="heading-3">System Metrics</CardTitle>
                <p className="small text-muted-foreground">
                  Key performance indicators
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSystemStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="font-medium text-foreground">{stat.metric}</p>
                        <p className="small text-muted-foreground">{stat.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">{stat.value}</p>
                        <p className={`small ${stat.change.startsWith('+') ? 'text-green-400' : 'text-yellow-400'}`}>
                          {stat.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="heading-3">Quick Actions</CardTitle>
                <p className="small text-muted-foreground">
                  Administrative tools
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="accent" 
                    className="w-full justify-start"
                    onClick={handleRedistributeApplications}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Redistribute Applications
                  </Button>
                  <Link to="/master-admin/admins/new" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <UserCog className="h-4 w-4 mr-2" />
                      Add New Admin
                    </Button>
                  </Link>
                  <Link to="/master-admin/analytics" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Detailed Analytics
                    </Button>
                  </Link>
                  <Link to="/master-admin/settings" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin Performance Tab */}
        {selectedTab === 'admins' && (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="heading-3">Admin Performance</CardTitle>
                  <p className="small text-muted-foreground">
                    Current workload and performance metrics
                  </p>
                </div>
                <Button variant="accent" onClick={handleRedistributeApplications}>
                  <Users className="h-4 w-4 mr-2" />
                  Redistribute Workload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminPerformance.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 rounded-lg border border-white/20 bg-white/5">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-foreground">{admin.name}</h4>
                        <p className="small text-muted-foreground">{admin.email}</p>
                        <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                          {admin.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">{admin.assignedApplications}</p>
                        <p className="small text-muted-foreground">Assigned</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">{admin.completedThisWeek}</p>
                        <p className="small text-muted-foreground">Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-foreground">{admin.averageProcessingTime}</p>
                        <p className="small text-muted-foreground">Avg Time</p>
                      </div>
                      <div className="text-center min-w-[80px]">
                        <div className="flex items-center gap-2">
                          <Progress value={admin.performance} className="w-16" />
                          <span className="text-sm font-medium">{admin.performance}%</span>
                        </div>
                        <p className="small text-muted-foreground">Performance</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="heading-3">Processing Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  [Chart Component - Processing trends over time]
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="heading-3">Country Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  [Chart Component - Germany vs UK applications]
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default MasterAdminDashboard;