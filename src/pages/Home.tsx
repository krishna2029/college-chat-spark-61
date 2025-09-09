import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Globe, Clock, HeadphonesIcon, ArrowRight, GraduationCap, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChatbotModal } from '@/components/ChatbotModal';

export const Home = () => {
  const navigate = useNavigate();
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const features = [
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Chat in your preferred language - Hindi, English, Tamil, Telugu & more.',
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      title: '24x7 Availability',
      description: 'Get instant answers anytime, day or night. Always here to help.',
      color: 'text-green-500'
    },
    {
      icon: HeadphonesIcon,
      title: 'Smart Student Help',
      description: 'Personalized assistance for exams, library, hostel, transport & academics.',
      color: 'text-purple-500'
    }
  ];

  const stats = [
    { icon: GraduationCap, value: '50K+', label: 'Students Helped' },
    { icon: MessageCircle, value: '1M+', label: 'Questions Answered' },
    { icon: Users, value: '24/7', label: 'Always Available' },
    { icon: BookOpen, value: '100+', label: 'Topics Covered' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                College AI Assistant –{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Multilingual Chatbot
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Get instant answers about exams, library, hostel, transport & more in your language.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <Button
                onClick={() => navigate('/chatbot')}
                className="btn-hero text-lg px-8 py-4 group"
              >
                Start Chat
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our AI Assistant?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of student support with our intelligent, multilingual chatbot.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="feature-card h-full">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who are already using our AI assistant for their academic needs.
            </p>
            <Button
              onClick={() => navigate('/chatbot')}
              className="btn-hero text-lg px-8 py-4 group"
            >
              Try It Now
              <MessageCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">EduBot</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering students with intelligent, multilingual assistance for all their academic needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/chatbot" className="hover:text-primary transition-colors">Chatbot</a></li>
                <li><a href="/login" className="hover:text-primary transition-colors">Login</a></li>
                <li><a href="/register" className="hover:text-primary transition-colors">Register</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>support@edubot.college</li>
                <li>+91 98765 43210</li>
                <li>Campus Tech Center</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EduBot College Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Chatbot Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button
          onClick={() => {
            console.log('Chatbot icon clicked, setting chatbotOpen to true');
            setChatbotOpen(true);
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      </motion.div>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
};