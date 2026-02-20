import { useState } from 'react';
import { Link } from 'react-router';
import { BookOpen, Clock, ExternalLink, CheckCircle, Circle, Award, ArrowLeft, Search, Code, Database, Cloud, Palette, Shield, Brain, Server, Smartphone, Users, Briefcase, TrendingUp } from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { careerRoadmaps, quickRoadmaps, type CareerRoadmap, type Phase, type Milestone } from '../data/roadmaps';

const careerIcons: { [key: string]: React.ReactNode } = {
  'Core IT & Software': <Code className="w-5 h-5" />,
  'Data & AI': <Brain className="w-5 h-5" />,
  'Cloud & DevOps': <Cloud className="w-5 h-5" />,
  'Design & UX': <Palette className="w-5 h-5" />,
  'Cybersecurity': <Shield className="w-5 h-5" />,
  'Product & Strategy': <Briefcase className="w-5 h-5" />,
};

export function LearningRoadmap() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<CareerRoadmap | null>(careerRoadmaps[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());

  const categories = ['all', ...Array.from(new Set(careerRoadmaps.map(r => r.category)))];

  const filteredRoadmaps = careerRoadmaps.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || roadmap.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleMilestoneCompletion = (phaseIndex: number, milestoneIndex: number) => {
    const key = `${selectedRoadmap?.id}-${phaseIndex}-${milestoneIndex}`;
    const newCompleted = new Set(completedMilestones);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedMilestones(newCompleted);
  };

  const isMilestoneCompleted = (phaseIndex: number, milestoneIndex: number) => {
    const key = `${selectedRoadmap?.id}-${phaseIndex}-${milestoneIndex}`;
    return completedMilestones.has(key);
  };

  const calculateProgress = () => {
    if (!selectedRoadmap) return 0;
    let total = 0;
    let completed = 0;
    selectedRoadmap.phases.forEach((phase, pIndex) => {
      phase.milestones.forEach((_, mIndex) => {
        total++;
        if (isMilestoneCompleted(pIndex, mIndex)) completed++;
      });
    });
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (!selectedRoadmap) {
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
                <h1 className="text-3xl text-gray-900 dark:text-white">Learning Roadmaps</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Structured learning paths for {careerRoadmaps.length}+ tech careers
                </p>
              </div>
              <Link to="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search roadmaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Roadmap Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map(roadmap => (
              <Card
                key={roadmap.id}
                className="p-6 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedRoadmap(roadmap)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                    {careerIcons[roadmap.category] || <Code className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{roadmap.title}</h3>
                    <Badge variant="outline" className="text-xs mt-1">{roadmap.category}</Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{roadmap.totalDuration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                    <Badge className={getDifficultyColor(roadmap.difficulty)}>{roadmap.difficulty}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Phases:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{roadmap.phases.length}</span>
                  </div>
                </div>

                <Button className="w-full">
                  View Roadmap
                </Button>
              </Card>
            ))}
          </div>

          {filteredRoadmaps.length === 0 && (
            <Card className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 dark:text-white mb-2">No roadmaps found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters.
              </p>
            </Card>
          )}
        </div>
      </div>
    );
  }

  const progress = calculateProgress();

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
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRoadmap(null)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Roadmaps
                </Button>
              </div>
              <h1 className="text-3xl text-gray-900 dark:text-white">{selectedRoadmap.title} Roadmap</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline">{selectedRoadmap.category}</Badge>
                <Badge className={getDifficultyColor(selectedRoadmap.difficulty)}>{selectedRoadmap.difficulty}</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedRoadmap.totalDuration} • {selectedRoadmap.phases.length} Phases
                </span>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Your Progress</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your learning journey
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </Card>

        {/* Roadmap Phases */}
        <div className="space-y-6">
          {selectedRoadmap.phases.map((phase, phaseIndex) => (
            <Card key={phaseIndex} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{phase.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {phase.duration}
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {phase.milestones.length} Milestones
                </Badge>
              </div>

              <Accordion type="multiple" className="space-y-4">
                {phase.milestones.map((milestone, milestoneIndex) => {
                  const isCompleted = isMilestoneCompleted(phaseIndex, milestoneIndex);

                  return (
                    <AccordionItem key={milestoneIndex} value={`milestone-${phaseIndex}-${milestoneIndex}`} className="border rounded-lg">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMilestoneCompletion(phaseIndex, milestoneIndex);
                            }}
                            className="flex-shrink-0 cursor-pointer"
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                              {milestone.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {milestone.description} • {milestone.duration}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-4 pb-4">
                        {/* Skills */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Skills to Learn</h4>
                          <div className="flex flex-wrap gap-2">
                            {milestone.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* Resources */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Learning Resources</h4>
                          <div className="space-y-2">
                            {milestone.resources.map((resource, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                <div className="flex items-center gap-3 flex-1">
                                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{resource.name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {resource.platform} • {resource.type} • {resource.duration}
                                    </p>
                                  </div>
                                </div>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Practice Projects</h4>
                          <ul className="space-y-2">
                            {milestone.projects.map((project, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Code className="w-4 h-4 mt-0.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                <span>{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Card>
          ))}
        </div>

        {/* Completion Banner */}
        {progress === 100 && (
          <Card className="p-8 text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <Award className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Congratulations! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You've completed the {selectedRoadmap.title} roadmap!
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setSelectedRoadmap(null)}>
                Explore More Roadmaps
              </Button>
              <Link to="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}