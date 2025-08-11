import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Shield, Crown } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gunmetal-50/20 flex items-center justify-center">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <GraduationCap className="h-16 w-16 text-accent mx-auto mb-4" />
          <h1 className="heading-1 text-foreground mb-4">Welcome to UNI 360°</h1>
          <p className="body text-muted-foreground">
            Your complete university application management platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student Portal */}
          <Card className="glass-card hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="text-center">
              <GraduationCap className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="heading-3">Student Portal</CardTitle>
              <p className="small text-muted-foreground">
                Manage your university applications, documents, and track progress
              </p>
            </CardHeader>
            <CardContent>
              <Link to="/student" className="block">
                <Button variant="hero" className="w-full">
                  Enter Student Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Portal */}
          <Card className="glass-card hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="heading-3">Admin Portal</CardTitle>
              <p className="small text-muted-foreground">
                Process applications, verify documents, and assist students
              </p>
            </CardHeader>
            <CardContent>
              <Link to="/admin" className="block">
                <Button variant="accent" className="w-full">
                  Enter Admin Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Master Admin Portal */}
          <Card className="glass-card hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="text-center">
              <Crown className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="heading-3">Master Admin</CardTitle>
              <p className="small text-muted-foreground">
                System oversight, analytics, and admin management
              </p>
            </CardHeader>
            <CardContent>
              <Link to="/master-admin" className="block">
                <Button variant="outline" className="w-full">
                  Enter Master Admin
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
