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
  FileText, 
  MessageSquare, 
  Bell, 
  User, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin' },
  { id: 'queue', label: 'Application Queue', icon: Clock, path: '/admin/queue' },
  { id: 'assigned', label: 'My Assigned', icon: FileText, path: '/admin/assigned' },
  { id: 'completed', label: 'Completed', icon: CheckCircle, path: '/admin/completed' },
  { id: 'external', label: 'External Services', icon: AlertTriangle, path: '/admin/external' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  { id: 'profile', label: 'Profile', icon: User, path: '/admin/profile' },
];

const AdminSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="px-3 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            {!isCollapsed && (
              <div>
                <h2 className="heading-3 text-foreground">UNI 360°</h2>
                <p className="small text-muted-foreground">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
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
                            ? "bg-accent/20 text-accent font-medium" 
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

export default AdminSidebar;