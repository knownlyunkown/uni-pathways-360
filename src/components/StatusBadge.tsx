import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'action-required';
  className?: string;
}

const statusLabels = {
  pending: 'Pending',
  'in-review': 'In Review',
  approved: 'Approved',
  rejected: 'Rejected',
  'action-required': 'Action Required',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <span
      className={cn(
        'status-badge',
        `status-${status}`,
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;