import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, GraduationCap, Bell, BellRing } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileDropdown } from './ProfileDropdown';
import { NotificationModal } from './NotificationModal';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const publicNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Chatbot', href: '/chatbot' },
  ];

  const authNavItems = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative p-2 bg-gradient-to-br from-primary via-primary to-accent rounded-xl shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  EduBot
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Public Navigation */}
              {publicNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 shadow-soft'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications (Students Only) */}
                  {user?.role === 'student' && (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 rounded-xl hover:bg-primary/10 relative"
                        onClick={() => setIsNotificationOpen(true)}
                      >
                        <Bell className="h-5 w-5" />
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                        >
                          3
                        </Badge>
                      </Button>
                    </div>
                  )}
                  
                  <ThemeToggle />
                  <ProfileDropdown />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  {authNavItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10 shadow-soft'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      } ${item.name === 'Register' ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105' : ''}`}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <ThemeToggle />
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {isAuthenticated && user?.role === 'student' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl relative"
                  onClick={() => setIsNotificationOpen(true)}
                >
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>
              )}
              <ThemeToggle />
              {isAuthenticated && <ProfileDropdown />}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-xl"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
        </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-4 pb-6 space-y-3 bg-background/95 backdrop-blur-lg border-t border-border/50">
                {/* Public Navigation */}
                {publicNavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10 shadow-soft'
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* Auth Navigation */}
                {!isAuthenticated && (
                  <div className="pt-3 border-t border-border/50 space-y-3">
                    {authNavItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10 shadow-soft'
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                        } ${item.name === 'Register' ? 'bg-gradient-to-r from-primary to-accent text-white' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </>
  );
};