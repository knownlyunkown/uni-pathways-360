import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'action-required';
  children: React.ReactNode;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children, className }) => {
  return (
    <span
      className={cn(
        'status-badge',
        `status-${status}`,
        className
      )}
    >
      {children}
    </span>
  );
};

export default StatusBadge;