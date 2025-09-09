import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Shield, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const handleAdminPanel = () => {
    navigate('/admin');
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
          <AvatarFallback className="text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-xl shadow-strong z-50"
            >
              {/* Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {user.role === 'admin' ? (
                        <Shield className="h-3 w-3 text-accent" />
                      ) : (
                        <BookOpen className="h-3 w-3 text-primary" />
                      )}
                      <span className="text-xs text-muted-foreground capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-accent/10"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Profile</div>
                    <div className="text-xs text-muted-foreground">
                      View and edit profile
                    </div>
                  </div>
                </Button>

                {user.role === 'student' && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 hover:bg-accent/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Award className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Achievements</div>
                      <div className="text-xs text-muted-foreground">
                        View your progress
                      </div>
                    </div>
                  </Button>
                )}

                {user.role === 'admin' && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 hover:bg-accent/10"
                    onClick={handleAdminPanel}
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Admin Panel</div>
                      <div className="text-xs text-muted-foreground">
                        Manage system
                      </div>
                    </div>
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-accent/10"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Settings</div>
                    <div className="text-xs text-muted-foreground">
                      Preferences & privacy
                    </div>
                  </div>
                </Button>
              </div>

              {/* Footer */}
              <div className="p-2 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-3 text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};