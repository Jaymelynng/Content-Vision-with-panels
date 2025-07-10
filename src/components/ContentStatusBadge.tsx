import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

interface ContentStatusBadgeProps {
  status: string;
  adminReviewed?: boolean;
  adminApproved?: boolean;
  adminFeedbackRequired?: boolean;
  className?: string;
}

export function ContentStatusBadge({ 
  status, 
  adminReviewed, 
  adminApproved, 
  adminFeedbackRequired,
  className = ""
}: ContentStatusBadgeProps) {
  const getStatusDisplay = () => {
    if (adminApproved) {
      return {
        text: 'Approved',
        variant: 'default' as const,
        icon: CheckCircle,
        className: 'bg-success text-success-foreground'
      };
    }
    
    if (adminFeedbackRequired) {
      return {
        text: 'Needs Revision',
        variant: 'destructive' as const,
        icon: AlertCircle,
        className: 'bg-warning text-warning-foreground'
      };
    }
    
    if (adminReviewed) {
      return {
        text: 'Under Review', 
        variant: 'secondary' as const,
        icon: Clock,
        className: 'bg-secondary text-secondary-foreground'
      };
    }
    
    switch (status) {
      case 'completed':
        return {
          text: 'Submitted',
          variant: 'outline' as const,
          icon: Clock,
          className: 'bg-primary/10 text-primary'
        };
      case 'in-progress':
        return {
          text: 'In Progress',
          variant: 'secondary' as const,
          icon: Clock,
          className: 'bg-secondary text-secondary-foreground'
        };
      case 'not-started':
      default:
        return {
          text: 'Not Started',
          variant: 'outline' as const,
          icon: XCircle,
          className: 'bg-muted text-muted-foreground'
        };
    }
  };

  const { text, icon: Icon, className: statusClassName } = getStatusDisplay();

  return (
    <Badge className={`${statusClassName} ${className}`}>
      <Icon className="h-3 w-3 mr-1" />
      {text}
    </Badge>
  );
}