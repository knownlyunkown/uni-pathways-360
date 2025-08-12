import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  User, 
  Shield,
  Activity,
  Database,
  AlertTriangle,
  Globe,
  UserPlus,
  FileText
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/master-admin' },
  { id: 'admins', label: 'Admin Management', icon: Users, path: '/master-admin/admins' },
  { id: 'analytics', label: 'System Analytics', icon: BarChart3, path: '/master-admin/analytics' },
  { id: 'performance', label: 'Performance', icon: Activity, path: '/master-admin/performance' },
  { id: 'applications', label: 'All Applications', icon: FileText, path: '/master-admin/applications' },
  { id: 'countries', label: 'Country Management', icon: Globe, path: '/master-admin/countries' },
  { id: 'external', label: 'External Services', icon: AlertTriangle, path: '/master-admin/external' },
  { id: 'database', label: 'Database', icon: Database, path: '/master-admin/database' },
  { id: 'settings', label: 'System Settings', icon: Settings, path: '/master-admin/settings' },
  { id: 'profile', label: 'Profile', icon: User, path: '/master-admin/profile' },
];

const MasterAdminSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="px-3 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-tiger-eye" />
            {!isCollapsed && (
              <div>
                <h2 className="heading-3 text-foreground">UNI 360°</h2>
                <p className="small text-muted-foreground">Master Admin</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>System Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.path} 
                        className={({ isActive }) =>
                          isActive 
                            ? "bg-tiger-eye/20 text-tiger-eye font-medium" 
                            : "hover:bg-muted/50 text-muted-foreground"
                        }
                      >
                        <Icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MasterAdminSidebar;