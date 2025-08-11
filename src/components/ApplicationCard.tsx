import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatusBadge from './StatusBadge';
import { FileText, MessageSquare, Calendar, ExternalLink } from 'lucide-react';

interface ApplicationCardProps {
  id: string;
  university: string;
  course: string;
  country: 'germany' | 'uk';
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'action-required';
  progress: number;
  currentStage: string;
  nextStep: string;
  assignedAdmin?: string;
  dueDate?: string;
  documentsCount: {
    uploaded: number;
    required: number;
  };
  onViewDetails: () => void;
  onMessage: () => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  id,
  university,
  course,
  country,
  status,
  progress,
  currentStage,
  nextStep,
  assignedAdmin,
  dueDate,
  documentsCount,
  onViewDetails,
  onMessage,
}) => {
  const countryFlag = country === 'germany' ? '🇩🇪' : '🇬🇧';
  
  return (
    <Card className="glass-card hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{countryFlag}</span>
              <h3 className="heading-3 text-foreground truncate">{university}</h3>
            </div>
            <p className="body text-muted-foreground truncate">{course}</p>
            <p className="small text-muted-foreground">Application #{id}</p>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="small font-medium">Progress</span>
            <span className="small">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="small text-muted-foreground mt-1">Current: {currentStage}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="small text-muted-foreground">Documents</span>
            <span className="small font-medium">
              {documentsCount.uploaded}/{documentsCount.required}
            </span>
          </div>
          
          {assignedAdmin && (
            <div className="flex items-center justify-between">
              <span className="small text-muted-foreground">Admin</span>
              <span className="small font-medium">{assignedAdmin}</span>
            </div>
          )}
          
          {dueDate && (
            <div className="flex items-center justify-between">
              <span className="small text-muted-foreground">Due</span>
              <span className="small font-medium">{dueDate}</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
          <p className="small font-medium text-accent mb-1">Next Step</p>
          <p className="small text-foreground">{nextStep}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-3">
        <Button 
          variant="default" 
          className="flex-1"
          onClick={onViewDetails}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Details
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onMessage}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;