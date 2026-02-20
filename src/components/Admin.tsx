import { useState } from 'react';
import { Link } from 'react-router';
import {
  Users,
  TrendingUp,
  FileText,
  Settings,
  BarChart3,
  Shield,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  BookOpen,
  Activity,
  Clock,
  MapPin,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
  ListTodo,
  Plus,
  Calendar,
  Flag,
  User,
  Paperclip,
  MessageSquare,
  MoreVertical
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { motion } from 'motion/react';

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
  careerPath: string;
  progress: number;
  sessionsCompleted: number;
}

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalSessions: number;
  avgSessionTime: string;
  popularCareerPaths: { name: string; count: number; percentage: number }[];
  userGrowth: { month: string; users: number }[];
  engagementRate: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  category: string;
  createdAt: string;
  comments: number;
  attachments: number;
}

export function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState<string>('all');
  const [taskSearch, setTaskSearch] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Update Career Roadmap for AI/ML',
      description: 'Revise the Machine Learning career path with latest tools and frameworks',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Admin',
      dueDate: '2024-02-20',
      category: 'Content',
      createdAt: '2024-02-10',
      comments: 3,
      attachments: 2
    },
    {
      id: '2',
      title: 'Fix user authentication bug',
      description: 'Users reporting issues with password reset functionality',
      status: 'todo',
      priority: 'urgent',
      assignee: 'Dev Team',
      dueDate: '2024-02-15',
      category: 'Bug Fix',
      createdAt: '2024-02-12',
      comments: 5,
      attachments: 1
    },
    {
      id: '3',
      title: 'Add new skill assessments',
      description: 'Create assessments for React, Node.js, and Python',
      status: 'completed',
      priority: 'medium',
      assignee: 'Content Team',
      dueDate: '2024-02-10',
      category: 'Content',
      createdAt: '2024-02-01',
      comments: 2,
      attachments: 0
    },
    {
      id: '4',
      title: 'Optimize database queries',
      description: 'Improve performance of dashboard loading time',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Dev Team',
      dueDate: '2024-02-18',
      category: 'Performance',
      createdAt: '2024-02-08',
      comments: 1,
      attachments: 3
    },
    {
      id: '5',
      title: 'User feedback analysis',
      description: 'Review and categorize user feedback from last month',
      status: 'todo',
      priority: 'low',
      assignee: 'Admin',
      dueDate: '2024-02-25',
      category: 'Research',
      createdAt: '2024-02-11',
      comments: 0,
      attachments: 0
    },
    {
      id: '6',
      title: 'Update AI mentor prompts',
      description: 'Refine AI responses for better career guidance',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'AI Team',
      dueDate: '2024-02-22',
      category: 'AI Config',
      createdAt: '2024-02-09',
      comments: 4,
      attachments: 1
    }
  ]);

  // Mock analytics data
  const analytics: AnalyticsData = {
    totalUsers: 2847,
    activeUsers: 1923,
    newUsersThisMonth: 342,
    totalSessions: 15672,
    avgSessionTime: '24 min',
    engagementRate: 67.5,
    popularCareerPaths: [
      { name: 'Full Stack Developer', count: 524, percentage: 18.4 },
      { name: 'Data Scientist', count: 412, percentage: 14.5 },
      { name: 'Cloud Engineer', count: 356, percentage: 12.5 },
      { name: 'UX Designer', count: 298, percentage: 10.5 },
      { name: 'Cybersecurity Analyst', count: 267, percentage: 9.4 }
    ],
    userGrowth: [
      { month: 'Jan', users: 2105 },
      { month: 'Feb', users: 2234 },
      { month: 'Mar', users: 2456 },
      { month: 'Apr', users: 2589 },
      { month: 'May', users: 2714 },
      { month: 'Jun', users: 2847 }
    ]
  };

  // Mock user data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      status: 'active',
      careerPath: 'Full Stack Developer',
      progress: 78,
      sessionsCompleted: 45
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@example.com',
      joinDate: '2024-02-08',
      lastActive: '5 hours ago',
      status: 'active',
      careerPath: 'Data Scientist',
      progress: 62,
      sessionsCompleted: 32
    },
    {
      id: '3',
      name: 'Anjali Patel',
      email: 'anjali.patel@example.com',
      joinDate: '2024-03-22',
      lastActive: '1 day ago',
      status: 'active',
      careerPath: 'UX Designer',
      progress: 45,
      sessionsCompleted: 28
    },
    {
      id: '4',
      name: 'Amit Verma',
      email: 'amit.verma@example.com',
      joinDate: '2023-11-10',
      lastActive: '3 days ago',
      status: 'inactive',
      careerPath: 'Cloud Engineer',
      progress: 34,
      sessionsCompleted: 19
    },
    {
      id: '5',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      joinDate: '2024-04-05',
      lastActive: '30 min ago',
      status: 'active',
      careerPath: 'Cybersecurity Analyst',
      progress: 89,
      sessionsCompleted: 67
    },
    {
      id: '6',
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      joinDate: '2023-12-20',
      lastActive: '1 week ago',
      status: 'suspended',
      careerPath: 'Mobile Developer',
      progress: 23,
      sessionsCompleted: 12
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive'
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4" />;
      case 'suspended':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <CarvixLogo className="w-10 h-10" />
                <div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Carvix Admin
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">System Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">User View</Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users, monitor analytics, and oversee platform operations
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListTodo className="w-4 h-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <Badge className="bg-purple-600 text-white">Total</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{analytics.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700">
                  <div className="flex items-center justify-between mb-3">
                    <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <Badge className="bg-green-600 text-white">Active</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{analytics.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <Badge className="bg-blue-600 text-white">+12%</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{analytics.newUsersThisMonth.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">New This Month</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-700">
                  <div className="flex items-center justify-between mb-3">
                    <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    <Badge className="bg-orange-600 text-white">Avg</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{analytics.avgSessionTime}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Session Time</div>
                </Card>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    User Growth
                  </h3>
                  <div className="space-y-4">
                    {analytics.userGrowth.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{month.month}</span>
                          <span className="text-gray-600 dark:text-gray-400">{month.users} users</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(month.users / 3000) * 100}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Popular Career Paths */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Popular Career Paths
                  </h3>
                  <div className="space-y-4">
                    {analytics.popularCareerPaths.map((path, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{path.name}</span>
                          <span className="text-gray-600 dark:text-gray-400">{path.count} users</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${path.percentage * 5}%` }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <h4 className="font-semibold">Total Sessions</h4>
                  </div>
                  <div className="text-2xl font-bold">{analytics.totalSessions.toLocaleString()}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mentor interactions</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold">Engagement Rate</h4>
                  </div>
                  <div className="text-2xl font-bold">{analytics.engagementRate}%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active participation</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold">Completion Rate</h4>
                  </div>
                  <div className="text-2xl font-bold">58.3%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Roadmap completion</p>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* User Table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Career Path</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No users found matching your criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadge(user.status) as any} className="flex items-center gap-1 w-fit">
                                {getStatusIcon(user.status)}
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.careerPath}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                                    style={{ width: `${user.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm">{user.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.sessionsCompleted}</TableCell>
                            <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                              {user.lastActive}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div>Showing {filteredUsers.length} of {mockUsers.length} users</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Activate Users</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bulk activate accounts</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <UserX className="w-8 h-8 text-red-600" />
                    <div>
                      <h4 className="font-semibold">Suspend Users</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Manage suspensions</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Download className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">Export Data</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Download user reports</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search tasks by title or description..."
                      value={taskSearch}
                      onChange={(e) => setTaskSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={taskFilter} onValueChange={setTaskFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="todo">To-Do</SelectItem>
                        <SelectItem value="in-progress">In-Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Task Table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No tasks found matching your criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        tasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-gray-500">{task.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  task.status === 'todo'
                                    ? 'secondary'
                                    : task.status === 'in-progress'
                                    ? 'default'
                                    : 'success'
                                }
                                className="flex items-center gap-1 w-fit"
                              >
                                {task.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  task.priority === 'low'
                                    ? 'secondary'
                                    : task.priority === 'medium'
                                    ? 'default'
                                    : task.priority === 'high'
                                    ? 'warning'
                                    : 'danger'
                                }
                                className="flex items-center gap-1 w-fit"
                              >
                                {task.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>{task.assignee}</TableCell>
                            <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                              {task.dueDate}
                            </TableCell>
                            <TableCell>{task.category}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div>Showing {tasks.length} of {tasks.length} tasks</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Plus className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Add New Task</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Create a new task</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Edit className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">Edit Tasks</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Modify existing tasks</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Download className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">Export Data</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Download task reports</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Career Paths</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">50+ paths</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Manage career path descriptions, requirements, and roadmaps
                </p>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Paths
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Learning Resources</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">200+ resources</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Add, edit, or remove learning materials and courses
                </p>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Resources
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Skills Database</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">500+ skills</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Update skill requirements and assessments
                </p>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Skills
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Templates</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">15 templates</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Manage resume and cover letter templates
                </p>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Templates
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-8 h-8 text-pink-600" />
                  <div>
                    <h3 className="font-semibold text-lg">AI Prompts</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">30+ prompts</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Configure AI mentor prompts and responses
                </p>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Prompts
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Categories</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">13 categories</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Organize and manage career categories
                </p>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Categories
                </Button>
              </Card>
            </motion.div>

            {/* Recent Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Content Updates</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Added DevOps Engineer roadmap', date: '2 hours ago', type: 'Career Path' },
                    { title: 'Updated Machine Learning resources', date: '5 hours ago', type: 'Resources' },
                    { title: 'Modified AI Mentor prompts', date: '1 day ago', type: 'AI Config' },
                    { title: 'Added new skill assessments', date: '2 days ago', type: 'Skills' }
                  ].map((update, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium">{update.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{update.date}</p>
                      </div>
                      <Badge variant="outline">{update.type}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  General Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Platform Name</label>
                    <Input defaultValue="Carvix" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Support Email</label>
                    <Input defaultValue="support@carvix.com" type="email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Maintenance Mode</label>
                    <Select defaultValue="off">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="off">Off</SelectItem>
                        <SelectItem value="on">On</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Save Settings
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Session Timeout (minutes)</label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Max Login Attempts</label>
                    <Input type="number" defaultValue="5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Two-Factor Authentication</label>
                    <Select defaultValue="optional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                        <SelectItem value="required">Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Update Security
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  AI Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">AI Model</label>
                    <Select defaultValue="gpt4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4">GPT-4</SelectItem>
                        <SelectItem value="gpt35">GPT-3.5</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Response Temperature</label>
                    <Input type="number" step="0.1" defaultValue="0.7" min="0" max="1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Max Response Length</label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Save AI Config
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Notifications</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="important">Important Only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Admin Alerts</label>
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">User Activity Reports</label>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700">
                    Save Notifications
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-medium">API Status</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Operational</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-medium">Database</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Healthy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-medium">AI Services</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Online</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}