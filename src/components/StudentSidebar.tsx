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
  BookmarkPlus,
  Calendar,
  CreditCard,
  Upload,
  GraduationCap
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/student' },
  { id: 'applications', label: 'Applications', icon: FileText, path: '/student/applications' },
  { id: 'documents', label: 'Documents', icon: Upload, path: '/student/documents' },
  { id: 'wishlist', label: 'Wishlist', icon: BookmarkPlus, path: '/student/wishlist' },
  { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/student/appointments' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/student/payments' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/student/messages' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/student/notifications' },
  { id: 'profile', label: 'Profile', icon: User, path: '/student/profile' },
];

const StudentSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="px-3 py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-accent" />
            {!isCollapsed && (
              <div>
                <h2 className="heading-3 text-foreground">UNI 360°</h2>
                <p className="small text-muted-foreground">Student Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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

export default StudentSidebar;