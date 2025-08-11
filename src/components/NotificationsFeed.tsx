import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'message' | 'document' | 'status' | 'appointment' | 'payment';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  applicationId?: string;
}

interface NotificationsFeedProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAllRead: () => void;
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({
  notifications,
  onNotificationClick,
  onMarkAllRead,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'document':
        return FileText;
      case 'status':
        return CheckCircle;
      case 'appointment':
        return Clock;
      case 'payment':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-status-rejected';
      case 'medium':
        return 'bg-status-pending';
      default:
        return 'bg-muted';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="heading-3">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="body text-muted-foreground">No notifications yet</p>
              <p className="small text-muted-foreground">You'll see updates about your applications here</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-accent/10 ${
                    notification.isRead 
                      ? 'bg-background/50 border-border/50' 
                      : 'bg-accent/5 border-accent/20'
                  }`}
                  onClick={() => onNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="small font-medium text-foreground truncate">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="h-2 w-2 bg-accent rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="small text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </span>
                        {notification.applicationId && (
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            App #{notification.applicationId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsFeed;