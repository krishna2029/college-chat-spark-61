import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Calendar, Clock, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'academic' | 'event' | 'announcement' | 'deadline';
  time: string;
  isNew: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Registration for Fall 2024 Opens',
    content: 'Course registration for Fall semester begins Monday, April 15th at 8:00 AM.',
    type: 'academic',
    time: '2 hours ago',
    isNew: true
  },
  {
    id: '2',
    title: 'Campus Tech Fest 2024',
    content: 'Join us for the annual Technology Festival featuring AI workshops, coding competitions, and tech talks.',
    type: 'event',
    time: '1 day ago',
    isNew: true
  },
  {
    id: '3',
    title: 'Library Extended Hours',
    content: 'The library will remain open 24/7 during finals week (May 1-8).',
    type: 'announcement',
    time: '2 days ago',
    isNew: false
  },
  {
    id: '4',
    title: 'Assignment Deadline Reminder',
    content: 'Computer Science project submissions are due this Friday, April 12th.',
    type: 'deadline',
    time: '3 days ago',
    isNew: false
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'academic':
      return BookOpen;
    case 'event':
      return Calendar;
    case 'announcement':
      return Bell;
    case 'deadline':
      return Clock;
    default:
      return Bell;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'academic':
      return 'bg-primary text-primary-foreground';
    case 'event':
      return 'bg-accent text-accent-foreground';
    case 'announcement':
      return 'bg-secondary text-secondary-foreground';
    case 'deadline':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isNew: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isNew: false }))
    );
  };

  const unreadCount = notifications.filter(n => n.isNew).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[80vh] bg-background rounded-2xl shadow-strong border z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Bell className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">College News</h2>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount > 0 ? `${unreadCount} new notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)] p-6 space-y-4">
              {notifications.map((notification) => {
                const Icon = getTypeIcon(notification.type);
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      notification.isNew ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground truncate">
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              {notification.isNew && (
                                <Badge variant="secondary" className="text-xs">
                                  New
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-muted/20 rounded-b-2xl">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Stay updated with college announcements</span>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};