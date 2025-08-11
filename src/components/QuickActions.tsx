import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  BookmarkPlus, 
  Calendar, 
  MessageSquare,
  FileText,
  CreditCard 
} from 'lucide-react';

interface QuickActionsProps {
  country: 'germany' | 'uk';
  onAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ country, onAction }) => {
  const actions = [
    {
      id: 'create-application',
      label: 'Create Application',
      description: 'Start a new university application',
      icon: Plus,
      variant: 'hero' as const,
    },
    {
      id: 'add-wishlist',
      label: 'Add to Wishlist',
      description: 'Save universities to apply later',
      icon: BookmarkPlus,
      variant: 'accent' as const,
    },
    {
      id: 'book-appointment',
      label: country === 'germany' ? 'Book APS Appointment' : 'Book UKVI Appointment',
      description: country === 'germany' 
        ? 'Schedule APS interview' 
        : 'Schedule visa appointment',
      icon: Calendar,
      variant: 'default' as const,
    },
    {
      id: 'chat-admin',
      label: 'Chat with Admin',
      description: 'Get help from your assigned admin',
      icon: MessageSquare,
      variant: 'outline' as const,
    },
    {
      id: 'upload-documents',
      label: 'Upload Documents',
      description: 'Upload required application documents',
      icon: FileText,
      variant: 'outline' as const,
    },
    {
      id: 'make-payment',
      label: 'Make Payment',
      description: 'Pay application or service fees',
      icon: CreditCard,
      variant: 'outline' as const,
    },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="heading-3">Quick Actions</CardTitle>
        <p className="small">Common tasks for your applications</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-center gap-2 text-center"
                onClick={() => onAction(action.id)}
              >
                <Icon className="h-6 w-6" />
                <div>
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs opacity-80 mt-1">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;