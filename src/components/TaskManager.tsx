import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ListTodo,
  Plus,
  Calendar,
  Flag,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  Clock,
  Bell,
  BellOff,
  MoreVertical,
  ArrowLeft,
  TrendingUp,
  Target,
  AlertCircle,
  ChevronDown,
  X,
  Save,
  Sparkles
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  dueDate: string;
  dueTime: string;
  reminder: boolean;
  reminderTime: number; // minutes before due time
  createdAt: string;
  completedAt?: string;
  tags: string[];
}

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  dueToday: number;
}

export function TaskManager() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // New task form state
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    category: 'General',
    dueDate: '',
    dueTime: '09:00',
    reminder: true,
    reminderTime: 30,
    tags: []
  });

  const categories = [
    'General',
    'Career Development',
    'Learning',
    'Interview Prep',
    'Job Applications',
    'Networking',
    'Skill Building',
    'Project Work',
    'Personal'
  ];

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('userTasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      setFilteredTasks(parsedTasks);
    }

    // Check for task reminders every minute
    const reminderInterval = setInterval(checkReminders, 60000);
    checkReminders(); // Check immediately on mount

    return () => clearInterval(reminderInterval);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('userTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Filter and sort tasks
  useEffect(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(task => task.category === filterCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate + ' ' + a.dueTime).getTime() - new Date(b.dueDate + ' ' + b.dueTime).getTime();
        case 'priority':
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, filterStatus, filterPriority, filterCategory, sortBy]);

  // Check for task reminders
  const checkReminders = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (task.reminder && task.status !== 'completed' && task.dueDate) {
        const dueDateTime = new Date(task.dueDate + ' ' + task.dueTime);
        const reminderTime = new Date(dueDateTime.getTime() - task.reminderTime * 60000);
        
        // Check if reminder should trigger (within the next minute)
        const timeDiff = reminderTime.getTime() - now.getTime();
        if (timeDiff > 0 && timeDiff < 60000) {
          showReminder(task);
        }

        // Check if task is overdue
        if (now > dueDateTime && task.status !== 'completed') {
          const wasAlreadyNotified = localStorage.getItem(`overdue-${task.id}`);
          if (!wasAlreadyNotified) {
            toast.error(`Task overdue: ${task.title}`, {
              description: `This task was due on ${formatDate(task.dueDate)} at ${task.dueTime}`,
              duration: 10000
            });
            localStorage.setItem(`overdue-${task.id}`, 'true');
          }
        }
      }
    });
  };

  const showReminder = (task: Task) => {
    const alreadyShown = sessionStorage.getItem(`reminder-${task.id}`);
    if (!alreadyShown) {
      toast.info(`Task reminder: ${task.title}`, {
        description: `Due ${formatDate(task.dueDate)} at ${task.dueTime}`,
        duration: 8000,
        icon: <Bell className="w-4 h-4" />
      });
      sessionStorage.setItem(`reminder-${task.id}`, 'true');
    }
  };

  // Calculate task statistics
  const getTaskStats = (): TaskStats => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      overdue: tasks.filter(t => {
        if (t.status === 'completed') return false;
        const dueDateTime = new Date(t.dueDate + ' ' + t.dueTime);
        return dueDateTime < now;
      }).length,
      dueToday: tasks.filter(t => {
        if (t.status === 'completed') return false;
        const dueDate = new Date(t.dueDate);
        return dueDate.getTime() === today.getTime();
      }).length
    };
  };

  // Create new task
  const handleCreateTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      toast.error('Please fill in required fields', {
        description: 'Task title and due date are required'
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || '',
      description: newTask.description || '',
      status: newTask.status || 'todo',
      priority: newTask.priority || 'medium',
      category: newTask.category || 'General',
      dueDate: newTask.dueDate || '',
      dueTime: newTask.dueTime || '09:00',
      reminder: newTask.reminder !== undefined ? newTask.reminder : true,
      reminderTime: newTask.reminderTime || 30,
      createdAt: new Date().toISOString(),
      tags: newTask.tags || []
    };

    setTasks([...tasks, task]);
    setIsNewTaskOpen(false);
    resetNewTaskForm();
    toast.success('Task created successfully!', {
      description: `"${task.title}" has been added to your tasks`,
      icon: <CheckCircle className="w-4 h-4" />
    });
  };

  // Update task
  const handleUpdateTask = () => {
    if (!editingTask) return;

    setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
    setEditingTask(null);
    toast.success('Task updated successfully!', {
      icon: <CheckCircle className="w-4 h-4" />
    });
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success('Task deleted', {
      description: task ? `"${task.title}" has been removed` : 'Task removed successfully'
    });
  };

  // Toggle task completion
  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
        };
      }
      return task;
    }));
    
    const task = tasks.find(t => t.id === taskId);
    if (task?.status !== 'completed') {
      toast.success('Task completed! 🎉', {
        description: 'Great job completing this task!'
      });
    }
  };

  // Reset new task form
  const resetNewTaskForm = () => {
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      category: 'General',
      dueDate: '',
      dueTime: '09:00',
      reminder: true,
      reminderTime: 30,
      tags: []
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  // Check if task is overdue
  const isOverdue = (task: Task) => {
    if (task.status === 'completed') return false;
    const now = new Date();
    const dueDateTime = new Date(task.dueDate + ' ' + task.dueTime);
    return dueDateTime < now;
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'low':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'todo':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
                <CarvixLogo className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent truncate">
                    Carvix
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Task Manager</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="sm:hidden">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <ListTodo className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl sm:text-3xl font-bold">My Tasks</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Organize your career goals and daily activities
              </p>
            </div>
            <Button
              onClick={() => setIsNewTaskOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{stats.total}</p>
                </div>
                <ListTodo className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{stats.completed}</p>
                </div>
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{stats.inProgress}</p>
                </div>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Due Today</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{stats.dueToday}</p>
                </div>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="col-span-2 sm:col-span-1"
          >
            <Card className="p-3 sm:p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{stats.overdue}</p>
                </div>
                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="createdAt">Created</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tasks List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="p-12 text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || filterCategory !== 'all'
                      ? 'Try adjusting your filters or search query'
                      : 'Start by creating your first task to organize your goals'}
                  </p>
                  <Button
                    onClick={() => setIsNewTaskOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Task
                  </Button>
                </Card>
              </motion.div>
            ) : (
              filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card className={`p-4 sm:p-6 hover:shadow-lg transition-all ${
                    task.status === 'completed' ? 'opacity-60' : ''
                  } ${isOverdue(task) ? 'border-red-300 dark:border-red-700' : ''}`}>
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTaskComplete(task.id)}
                        className="mt-1 flex-shrink-0 touch-manipulation"
                        aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                        ) : (
                          <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" />
                        )}
                      </button>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start gap-2 mb-2">
                          <h3 className={`text-base sm:text-lg font-semibold break-words ${
                            task.status === 'completed' ? 'line-through text-gray-500' : ''
                          }`}>
                            {task.title}
                          </h3>
                          {isOverdue(task) && (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>

                        {task.description && (
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 break-words">
                            {task.description}
                          </p>
                        )}

                        {/* Tags and Metadata */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                            <Flag className="w-3 h-3 mr-1" />
                            {task.priority}
                          </Badge>
                          <Badge className={`${getStatusColor(task.status)} text-xs`}>
                            {task.status === 'in-progress' ? 'In Progress' : task.status === 'todo' ? 'To Do' : 'Completed'}
                          </Badge>
                          <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                            {task.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">{formatDate(task.dueDate)} at {task.dueTime}</span>
                            <span className="sm:hidden">{formatDate(task.dueDate)}</span>
                          </div>
                          {task.reminder && (
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">{task.reminderTime}m before</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingTask(task)}
                          className="touch-manipulation h-8 w-8 sm:h-9 sm:w-9"
                          aria-label="Edit task"
                        >
                          <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 touch-manipulation h-8 w-8 sm:h-9 sm:w-9"
                          aria-label="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* New Task Dialog */}
      <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              Create New Task
            </DialogTitle>
            <DialogDescription>
              Add a new task to your list and set reminders
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g., Complete React course module"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Add more details about this task..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="mt-1"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="dueTime">Due Time</Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={newTask.dueTime}
                  onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="reminder"
                  checked={newTask.reminder}
                  onCheckedChange={(checked) => setNewTask({ ...newTask, reminder: checked as boolean })}
                />
                <Label htmlFor="reminder" className="cursor-pointer">
                  Set reminder notification
                </Label>
              </div>

              {newTask.reminder && (
                <div>
                  <Label htmlFor="reminderTime">Remind me before</Label>
                  <Select
                    value={newTask.reminderTime?.toString()}
                    onValueChange={(value) => setNewTask({ ...newTask, reminderTime: parseInt(value) })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="1440">1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsNewTaskOpen(false);
              resetNewTaskForm();
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateTask}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-purple-600" />
              Edit Task
            </DialogTitle>
            <DialogDescription>
              Update your task details and reminders
            </DialogDescription>
          </DialogHeader>

          {editingTask && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Task Title *</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingTask.status}
                    onValueChange={(value: any) => setEditingTask({ ...editingTask, status: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value: any) => setEditingTask({ ...editingTask, priority: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingTask.category}
                  onValueChange={(value) => setEditingTask({ ...editingTask, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-dueDate">Due Date *</Label>
                  <Input
                    id="edit-dueDate"
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-dueTime">Due Time</Label>
                  <Input
                    id="edit-dueTime"
                    type="time"
                    value={editingTask.dueTime}
                    onChange={(e) => setEditingTask({ ...editingTask, dueTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="edit-reminder"
                    checked={editingTask.reminder}
                    onCheckedChange={(checked) => setEditingTask({ ...editingTask, reminder: checked as boolean })}
                  />
                  <Label htmlFor="edit-reminder" className="cursor-pointer">
                    Set reminder notification
                  </Label>
                </div>

                {editingTask.reminder && (
                  <div>
                    <Label htmlFor="edit-reminderTime">Remind me before</Label>
                    <Select
                      value={editingTask.reminderTime?.toString()}
                      onValueChange={(value) => setEditingTask({ ...editingTask, reminderTime: parseInt(value) })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="1440">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTask(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTask}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}