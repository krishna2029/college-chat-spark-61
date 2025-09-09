import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Users, 
  HelpCircle, 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'faqs', label: 'Manage FAQs', icon: HelpCircle },
    { id: 'chats', label: 'Chat History', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockStats = [
    { title: 'Total Chats', value: '12,345', change: '+12%', color: 'text-green-500' },
    { title: 'Active Users', value: '2,567', change: '+8%', color: 'text-blue-500' },
    { title: 'FAQs', value: '189', change: '+3%', color: 'text-purple-500' },
    { title: 'Avg Response Time', value: '0.8s', change: '-5%', color: 'text-orange-500' },
  ];

  const mockFAQs = [
    { id: 1, question: 'What are the library hours?', category: 'Library', status: 'active', lastUpdated: '2024-01-15' },
    { id: 2, question: 'How to apply for hostel?', category: 'Hostel', status: 'active', lastUpdated: '2024-01-14' },
    { id: 3, question: 'Exam schedule information', category: 'Academics', status: 'draft', lastUpdated: '2024-01-13' },
  ];

  const mockChats = [
    { id: 1, user: 'John Doe', messages: 15, duration: '12m', date: '2024-01-15', status: 'completed' },
    { id: 2, user: 'Jane Smith', messages: 8, duration: '5m', date: '2024-01-15', status: 'active' },
    { id: 3, user: 'Mike Johnson', messages: 23, duration: '18m', date: '2024-01-14', status: 'completed' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with EduBot.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <div className={`text-sm font-medium ${stat.color}`}>
                          {stat.change}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Chats</CardTitle>
                  <CardDescription>Latest user interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockChats.slice(0, 3).map((chat) => (
                      <div key={chat.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{chat.user}</p>
                          <p className="text-sm text-muted-foreground">{chat.messages} messages · {chat.duration}</p>
                        </div>
                        <Badge variant={chat.status === 'active' ? 'default' : 'secondary'}>
                          {chat.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular FAQs</CardTitle>
                  <CardDescription>Most requested information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFAQs.map((faq) => (
                      <div key={faq.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{faq.question}</p>
                          <p className="text-sm text-muted-foreground">{faq.category}</p>
                        </div>
                        <Badge variant={faq.status === 'active' ? 'default' : 'outline'}>
                          {faq.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Manage FAQs</h1>
                <p className="text-muted-foreground">Add, edit, and organize frequently asked questions.</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <Input placeholder="Search FAQs..." className="w-full" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockFAQs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="font-medium">{faq.question}</TableCell>
                        <TableCell>{faq.category}</TableCell>
                        <TableCell>
                          <Badge variant={faq.status === 'active' ? 'default' : 'outline'}>
                            {faq.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{faq.lastUpdated}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'chats':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Chat History</h1>
              <p className="text-muted-foreground">Monitor and analyze user conversations.</p>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <Input placeholder="Search chats..." className="w-full" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockChats.map((chat) => (
                      <TableRow key={chat.id}>
                        <TableCell className="font-medium">{chat.user}</TableCell>
                        <TableCell>{chat.messages}</TableCell>
                        <TableCell>{chat.duration}</TableCell>
                        <TableCell>{chat.date}</TableCell>
                        <TableCell>
                          <Badge variant={chat.status === 'active' ? 'default' : 'secondary'}>
                            {chat.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Content for {activeTab} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.div
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start ${!sidebarOpen && 'px-2'}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  {sidebarOpen && <span className="ml-2">{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};