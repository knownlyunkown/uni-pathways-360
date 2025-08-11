import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ApplicationCard from '@/components/ApplicationCard';
import StatusBadge from '@/components/StatusBadge';
import { 
  ArrowLeft,
  Search,
  Filter,
  Plus,
  FileText,
  GraduationCap
} from 'lucide-react';

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

const ApplicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || app.country === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gunmetal-50/20">
      {/* Header */}
      <header className="glass-nav border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/student">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-accent" />
                <div>
                  <h1 className="heading-2 text-foreground">My Applications</h1>
                  <p className="small text-muted-foreground">Manage your university applications</p>
                </div>
              </div>
            </div>
            <Link to="/student/applications/new">
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="heading-3">Filter Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search university or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="action-required">Action Required</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="germany">🇩🇪 Germany</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="heading-3 text-foreground mb-2">
                  No applications found
                </h3>
                <p className="body text-muted-foreground mb-6">
                  {searchTerm || statusFilter !== 'all' || countryFilter !== 'all' 
                    ? 'Try adjusting your filters'
                    : 'Start your journey by creating your first application'
                  }
                </p>
                <Link to="/student/applications/new">
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Application
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
      </main>
    </div>
  );
};

export default ApplicationsPage;