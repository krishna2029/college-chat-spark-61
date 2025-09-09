import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatbotModal = ({ isOpen, onClose }: ChatbotModalProps) => {
  console.log('ChatbotModal rendered with isOpen:', isOpen);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your College AI Assistant. I can help you with information about exams, library hours, hostel facilities, transport, and much more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockChatHistory = [
    { id: 1, user: 'John Doe', lastMessage: 'Thanks for the library hours info!', time: '2 hours ago', messages: 8 },
    { id: 2, user: 'Jane Smith', lastMessage: 'When is the next exam?', time: '4 hours ago', messages: 12 },
    { id: 3, user: 'Mike Johnson', lastMessage: 'Hostel meal timings please', time: '6 hours ago', messages: 5 },
    { id: 4, user: 'Sarah Wilson', lastMessage: 'Bus route information needed', time: '1 day ago', messages: 15 },
    { id: 5, user: 'Alex Brown', lastMessage: 'Fee payment deadline?', time: '2 days ago', messages: 7 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return 'For exam schedules and information, you can check the academic calendar on the college portal. Upcoming exams will be notified 2 weeks in advance. Do you need information about a specific exam?';
    } else if (lowerMessage.includes('library')) {
      return 'The college library is open Monday to Friday: 8:00 AM - 8:00 PM, and weekends: 9:00 AM - 5:00 PM. You can access digital resources 24/7 through the online portal. Need help with book reservations?';
    } else if (lowerMessage.includes('hostel')) {
      return 'Our hostel facilities include WiFi, mess services, laundry, and 24/7 security. Mess timings: Breakfast 7:30-9:30 AM, Lunch 12:30-2:30 PM, Dinner 7:30-9:30 PM. Any specific hostel queries?';
    } else if (lowerMessage.includes('transport') || lowerMessage.includes('bus')) {
      return 'College buses run from major city points. Morning buses: 7:30 AM, 8:00 AM, 8:30 AM. Evening return: 4:30 PM, 5:00 PM, 5:30 PM. Would you like route details?';
    } else if (lowerMessage.includes('fee') || lowerMessage.includes('payment')) {
      return 'Fee payments can be made online through the college portal or at the accounts office. Payment deadlines are usually by the 10th of each month. Need help with payment procedures?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! Great to see you here. I\'m ready to help with any college-related questions you have. What would you like to know about?';
    } else {
      return 'I understand you\'re asking about "' + userMessage + '". Could you please provide more specific details? I can help with exams, library, hostel, transport, fees, and general college information.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-6xl h-[80vh] bg-card rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">College AI Assistant</h2>
                  <p className="text-sm text-muted-foreground">Chat with history view</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Split Layout */}
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Chat History Panel */}
              <ResizablePanel defaultSize={30} minSize={25}>
                <Card className="h-full rounded-none border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Recent Chats</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {mockChatHistory.map((chat) => (
                        <div
                          key={chat.id}
                          className="p-3 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm text-foreground">{chat.user}</p>
                            <Badge variant="secondary" className="text-xs">
                              {chat.messages}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                            {chat.lastMessage}
                          </p>
                          <p className="text-xs text-muted-foreground">{chat.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Chat Interface Panel */}
              <ResizablePanel defaultSize={70}>
                <div className="h-full flex flex-col">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[80%] ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === 'user' 
                              ? 'bg-chat-user text-chat-user-foreground' 
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            {message.sender === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </div>

                          <div className={`${
                            message.sender === 'user' 
                              ? 'chat-bubble-user' 
                              : 'chat-bubble-bot'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="chat-bubble-bot">
                            <div className="flex items-center space-x-1">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm">Typing...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-border p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="flex-1"
                        disabled={isLoading}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isLoading}
                        className="px-4"
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Try asking about: exams, library hours, hostel facilities, transport, fees
                    </p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};