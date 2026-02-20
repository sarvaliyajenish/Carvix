import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Plus, 
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  ExternalLink,
  Trash2,
  Edit,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Phone
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  jobUrl?: string;
  status: 'Applied' | 'Phone Screen' | 'Technical Interview' | 'Final Round' | 'Offer' | 'Rejected';
  appliedDate: string;
  salary?: string;
  notes?: string;
  contactPerson?: string;
  contactEmail?: string;
}

const statusColors = {
  'Applied': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Phone Screen': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Technical Interview': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Final Round': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'Offer': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'Rejected': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

const statusIcons = {
  'Applied': <Mail className="w-4 h-4" />,
  'Phone Screen': <Phone className="w-4 h-4" />,
  'Technical Interview': <Briefcase className="w-4 h-4" />,
  'Final Round': <TrendingUp className="w-4 h-4" />,
  'Offer': <CheckCircle className="w-4 h-4" />,
  'Rejected': <XCircle className="w-4 h-4" />,
};

export function JobTracker() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    company: '',
    position: '',
    location: '',
    jobUrl: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    salary: '',
    notes: '',
    contactPerson: '',
    contactEmail: '',
  });

  useEffect(() => {
    // Load applications from localStorage
    const stored = localStorage.getItem('jobApplications');
    if (stored) {
      setApplications(JSON.parse(stored));
    } else {
      // Add sample data
      const sampleApplications: JobApplication[] = [
        {
          id: '1',
          company: 'Google',
          position: 'Software Engineer',
          location: 'Bangalore, India',
          jobUrl: 'https://careers.google.com',
          status: 'Technical Interview',
          appliedDate: '2026-01-15',
          salary: '₹15-25 LPA',
          notes: 'Referral from college senior. Focus on system design and algorithms.',
          contactPerson: 'Priya Sharma',
          contactEmail: 'priya@google.com'
        },
        {
          id: '2',
          company: 'Microsoft',
          position: 'Frontend Developer',
          location: 'Hyderabad, India',
          status: 'Phone Screen',
          appliedDate: '2026-01-20',
          salary: '₹12-20 LPA',
          notes: 'Applied through LinkedIn. Recruiter mentioned strong React team.'
        },
        {
          id: '3',
          company: 'Amazon',
          position: 'Full Stack Developer',
          location: 'Mumbai, India',
          status: 'Applied',
          appliedDate: '2026-01-28',
          salary: '₹18-28 LPA'
        }
      ];
      setApplications(sampleApplications);
      localStorage.setItem('jobApplications', JSON.stringify(sampleApplications));
    }
  }, []);

  useEffect(() => {
    // Filter applications
    let filtered = applications;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [applications, statusFilter, searchQuery]);

  const saveApplications = (newApplications: JobApplication[]) => {
    setApplications(newApplications);
    localStorage.setItem('jobApplications', JSON.stringify(newApplications));
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position || !formData.location) {
      alert('Please fill in required fields');
      return;
    }

    if (editingApplication) {
      // Update existing
      const updated = applications.map(app =>
        app.id === editingApplication.id ? { ...formData, id: app.id } as JobApplication : app
      );
      saveApplications(updated);
    } else {
      // Add new
      const newApp: JobApplication = {
        ...formData,
        id: Date.now().toString(),
      } as JobApplication;
      saveApplications([...applications, newApp]);
    }

    resetForm();
  };

  const deleteApplication = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      saveApplications(applications.filter(app => app.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      jobUrl: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      salary: '',
      notes: '',
      contactPerson: '',
      contactEmail: '',
    });
    setEditingApplication(null);
    setIsAddDialogOpen(false);
  };

  const startEdit = (app: JobApplication) => {
    setEditingApplication(app);
    setFormData(app);
    setIsAddDialogOpen(true);
  };

  const getStats = () => {
    return {
      total: applications.length,
      active: applications.filter(app => !['Offer', 'Rejected'].includes(app.status)).length,
      offers: applications.filter(app => app.status === 'Offer').length,
      rejected: applications.filter(app => app.status === 'Rejected').length,
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <CarvixLogo size="md" showText={true} />
            <ThemeToggle />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl text-gray-900 dark:text-white">Job Application Tracker</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Keep track of all your job applications in one place
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Application
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingApplication ? 'Edit Application' : 'Add New Application'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g., Google"
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position *</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          placeholder="e.g., Software Engineer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g., Bangalore, India"
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => setFormData({ ...formData, status: value as JobApplication['status'] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Applied">Applied</SelectItem>
                            <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                            <SelectItem value="Technical Interview">Technical Interview</SelectItem>
                            <SelectItem value="Final Round">Final Round</SelectItem>
                            <SelectItem value="Offer">Offer</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="appliedDate">Applied Date</Label>
                        <Input
                          id="appliedDate"
                          type="date"
                          value={formData.appliedDate}
                          onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="salary">Expected Salary</Label>
                        <Input
                          id="salary"
                          value={formData.salary}
                          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                          placeholder="e.g., ₹12-18 LPA"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="jobUrl">Job URL</Label>
                      <Input
                        id="jobUrl"
                        value={formData.jobUrl}
                        onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          placeholder="Recruiter name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          placeholder="recruiter@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Add any relevant notes about this application..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                      {editingApplication ? 'Update' : 'Add'} Application
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Offers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.offers}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by company, position, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                <SelectItem value="Technical Interview">Technical Interview</SelectItem>
                <SelectItem value="Final Round">Final Round</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card className="p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 dark:text-white mb-2">
                {applications.length === 0 ? 'No applications yet' : 'No matching applications'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {applications.length === 0
                  ? 'Start tracking your job applications by adding your first one!'
                  : 'Try adjusting your filters or search query.'}
              </p>
              {applications.length === 0 && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Application
                </Button>
              )}
            </Card>
          ) : (
            filteredApplications.map((app) => (
              <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {app.company}
                      </h3>
                      <Badge className={statusColors[app.status]}>
                        {statusIcons[app.status]}
                        <span className="ml-1">{app.status}</span>
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-lg text-gray-900 dark:text-white mb-1">{app.position}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          📍 {app.location}
                        </p>
                        {app.salary && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            💰 {app.salary}
                          </p>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                        </div>
                        {app.contactPerson && (
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-4 h-4" />
                            <span>{app.contactPerson}</span>
                          </div>
                        )}
                        {app.contactEmail && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{app.contactEmail}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {app.notes && (
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{app.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {app.jobUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={app.jobUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View Job
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => startEdit(app)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
