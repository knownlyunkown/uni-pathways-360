import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  FileText, 
  MessageSquare, 
  Bell, 
  User, 
  BookmarkPlus,
  Calendar,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  className?: string;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'wishlist', label: 'Wishlist', icon: BookmarkPlus },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

const Navigation: React.FC<NavigationProps> = ({
  activeItem = 'dashboard',
  onItemClick,
  className,
}) => {
  return (
    <Card className={cn('glass-nav p-4', className)}>
      <div className="flex flex-col space-y-2">
        <div className="px-3 py-2">
          <h2 className="heading-3 tracking-tight text-foreground">
            UNI 360°
          </h2>
          <p className="small">Student Portal</p>
        </div>
        <nav className="flex flex-col space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? 'accent' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 text-left',
                  isActive && 'bg-accent/20'
                )}
                onClick={() => onItemClick?.(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};

export default Navigation;