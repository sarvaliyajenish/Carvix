import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Star,
  Clock,
  Filter,
  Search,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Code,
  Brain,
  Briefcase,
  Users
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Article' | 'Video' | 'Course' | 'Documentation';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  author: string;
  url: string;
  rating: number;
  tags: string[];
  isFree: boolean;
}

const resources: Resource[] = [
  // JavaScript Resources
  {
    id: '1',
    title: 'JavaScript: The Complete Guide',
    description: 'Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks.',
    type: 'Course',
    category: 'JavaScript',
    difficulty: 'Beginner',
    duration: '52 hours',
    author: 'Maximilian Schwarzmüller',
    url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
    rating: 4.8,
    tags: ['JavaScript', 'ES6', 'Async', 'DOM'],
    isFree: false
  },
  {
    id: '2',
    title: 'Understanding JavaScript Closures',
    description: 'Deep dive into one of JavaScript\'s most important concepts with practical examples.',
    type: 'Article',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    duration: '15 min read',
    author: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
    rating: 4.9,
    tags: ['JavaScript', 'Closures', 'Functions'],
    isFree: true
  },
  {
    id: '3',
    title: 'Async JavaScript: Promises, Callbacks, Async Await',
    description: 'Learn asynchronous programming patterns in JavaScript through practical examples.',
    type: 'Video',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    author: 'Traversy Media',
    url: 'https://www.youtube.com/watch?v=PoRJizFvM7s',
    rating: 4.7,
    tags: ['JavaScript', 'Async', 'Promises', 'Async/Await'],
    isFree: true
  },
  // React Resources
  {
    id: '4',
    title: 'React - The Complete Guide',
    description: 'Comprehensive React course covering hooks, context, Redux, Next.js, and testing.',
    type: 'Course',
    category: 'React',
    difficulty: 'Beginner',
    duration: '48 hours',
    author: 'Maximilian Schwarzmüller',
    url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    rating: 4.9,
    tags: ['React', 'Hooks', 'Redux', 'Next.js'],
    isFree: false
  },
  {
    id: '5',
    title: 'React Hooks Deep Dive',
    description: 'Master React Hooks including useState, useEffect, useContext, and custom hooks.',
    type: 'Article',
    category: 'React',
    difficulty: 'Intermediate',
    duration: '25 min read',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/react-hooks',
    rating: 4.8,
    tags: ['React', 'Hooks', 'useState', 'useEffect'],
    isFree: true
  },
  {
    id: '6',
    title: 'React Official Documentation',
    description: 'The official React documentation with tutorials, API reference, and best practices.',
    type: 'Documentation',
    category: 'React',
    difficulty: 'Beginner',
    duration: 'Self-paced',
    author: 'React Team',
    url: 'https://react.dev/',
    rating: 5.0,
    tags: ['React', 'Documentation', 'Tutorial'],
    isFree: true
  },
  // Data Structures & Algorithms
  {
    id: '7',
    title: 'Data Structures and Algorithms Masterclass',
    description: 'Learn essential DSA concepts with implementations in JavaScript.',
    type: 'Course',
    category: 'DSA',
    difficulty: 'Intermediate',
    duration: '45 hours',
    author: 'Colt Steele',
    url: 'https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/',
    rating: 4.8,
    tags: ['Algorithms', 'Data Structures', 'Big O', 'JavaScript'],
    isFree: false
  },
  {
    id: '8',
    title: 'Big O Notation Explained',
    description: 'Understanding time and space complexity for algorithm analysis.',
    type: 'Video',
    category: 'DSA',
    difficulty: 'Beginner',
    duration: '45 min',
    author: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=Mo4vesaut8g',
    rating: 4.7,
    tags: ['Big O', 'Algorithms', 'Complexity'],
    isFree: true
  },
  {
    id: '9',
    title: 'LeetCode Patterns and Templates',
    description: 'Common coding patterns to solve 80% of LeetCode problems efficiently.',
    type: 'Article',
    category: 'DSA',
    difficulty: 'Advanced',
    duration: '30 min read',
    author: 'Sean Prashad',
    url: 'https://seanprashad.com/leetcode-patterns/',
    rating: 4.9,
    tags: ['LeetCode', 'Patterns', 'Interview Prep'],
    isFree: true
  },
  // System Design
  {
    id: '10',
    title: 'System Design Interview Course',
    description: 'Comprehensive guide to acing system design interviews for senior roles.',
    type: 'Course',
    category: 'System Design',
    difficulty: 'Advanced',
    duration: '30 hours',
    author: 'Exponent',
    url: 'https://www.tryexponent.com/courses/system-design-interview',
    rating: 4.8,
    tags: ['System Design', 'Interview', 'Architecture'],
    isFree: false
  },
  {
    id: '11',
    title: 'Designing Data-Intensive Applications',
    description: 'The bible of system design covering databases, scalability, and distributed systems.',
    type: 'Article',
    category: 'System Design',
    difficulty: 'Advanced',
    duration: '10 hours read',
    author: 'Martin Kleppmann',
    url: 'https://dataintensive.net/',
    rating: 5.0,
    tags: ['System Design', 'Databases', 'Scalability'],
    isFree: false
  },
  {
    id: '12',
    title: 'System Design Primer',
    description: 'Open-source guide to learning system design with examples and resources.',
    type: 'Documentation',
    category: 'System Design',
    difficulty: 'Intermediate',
    duration: 'Self-paced',
    author: 'Donne Martin',
    url: 'https://github.com/donnemartin/system-design-primer',
    rating: 4.9,
    tags: ['System Design', 'Scalability', 'Architecture'],
    isFree: true
  },
  // Career Development
  {
    id: '13',
    title: 'Cracking the Coding Interview',
    description: 'The ultimate guide to technical interview preparation with 189 programming questions.',
    type: 'Article',
    category: 'Career',
    difficulty: 'Intermediate',
    duration: '15 hours read',
    author: 'Gayle Laakmann McDowell',
    url: 'https://www.crackingthecodinginterview.com/',
    rating: 4.9,
    tags: ['Interview', 'Career', 'Coding'],
    isFree: false
  },
  {
    id: '14',
    title: 'How to Write a Software Engineer Resume',
    description: 'Complete guide to crafting an ATS-friendly resume that gets interviews.',
    type: 'Article',
    category: 'Career',
    difficulty: 'Beginner',
    duration: '20 min read',
    author: 'Neetcode',
    url: 'https://neetcode.io/courses/lessons/how-to-write-a-software-engineer-resume',
    rating: 4.7,
    tags: ['Resume', 'Career', 'Job Search'],
    isFree: true
  },
  {
    id: '15',
    title: 'Behavioral Interview Preparation',
    description: 'Master the STAR method and common behavioral questions for tech interviews.',
    type: 'Video',
    category: 'Career',
    difficulty: 'Beginner',
    duration: '1 hour',
    author: 'Tech Interview Pro',
    url: 'https://www.youtube.com/watch?v=PJKYqLP6MRE',
    rating: 4.6,
    tags: ['Interview', 'Behavioral', 'STAR Method'],
    isFree: true
  },
  // Web Development
  {
    id: '16',
    title: 'Full Stack Open',
    description: 'Free comprehensive course on modern web development from University of Helsinki.',
    type: 'Course',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '200 hours',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com/',
    rating: 4.9,
    tags: ['Full Stack', 'React', 'Node.js', 'MongoDB'],
    isFree: true
  },
  {
    id: '17',
    title: 'CSS Grid and Flexbox Tutorial',
    description: 'Master modern CSS layout techniques for responsive web design.',
    type: 'Video',
    category: 'Web Development',
    difficulty: 'Beginner',
    duration: '2 hours',
    author: 'Wes Bos',
    url: 'https://cssgrid.io/',
    rating: 4.8,
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    isFree: true
  },
  {
    id: '18',
    title: 'Web Performance Optimization',
    description: 'Learn techniques to make your websites load faster and perform better.',
    type: 'Article',
    category: 'Web Development',
    difficulty: 'Advanced',
    duration: '45 min read',
    author: 'Google Developers',
    url: 'https://web.dev/performance/',
    rating: 4.7,
    tags: ['Performance', 'Optimization', 'Web Vitals'],
    isFree: true
  },
  // Python & Backend
  {
    id: '19',
    title: 'Python for Everybody Specialization',
    description: 'Learn Python basics, data structures, web scraping, and databases.',
    type: 'Course',
    category: 'Python',
    difficulty: 'Beginner',
    duration: '64 hours',
    author: 'University of Michigan',
    url: 'https://www.coursera.org/specializations/python',
    rating: 4.8,
    tags: ['Python', 'Databases', 'Web Scraping'],
    isFree: true
  },
  {
    id: '20',
    title: 'Building REST APIs with Node.js',
    description: 'Create production-ready REST APIs with Express, MongoDB, and authentication.',
    type: 'Course',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '12 hours',
    author: 'Academind',
    url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
    rating: 4.7,
    tags: ['Node.js', 'REST API', 'MongoDB', 'Express'],
    isFree: false
  },
  // DevOps & Cloud
  {
    id: '21',
    title: 'Docker and Kubernetes Complete Guide',
    description: 'Master containerization and orchestration from basics to advanced deployments.',
    type: 'Course',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '22 hours',
    author: 'Stephen Grider',
    url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
    rating: 4.8,
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
    isFree: false
  },
  {
    id: '22',
    title: 'AWS Certified Solutions Architect',
    description: 'Prepare for AWS certification and learn cloud architecture patterns.',
    type: 'Course',
    category: 'Cloud',
    difficulty: 'Intermediate',
    duration: '30 hours',
    author: 'Stephane Maarek',
    url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/',
    rating: 4.9,
    tags: ['AWS', 'Cloud', 'Architecture', 'Certification'],
    isFree: false
  },
  {
    id: '23',
    title: 'Introduction to CI/CD',
    description: 'Learn continuous integration and deployment with GitHub Actions and Jenkins.',
    type: 'Video',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1 hour',
    author: 'TechWorld with Nana',
    url: 'https://www.youtube.com/watch?v=scEDHsr3APg',
    rating: 4.7,
    tags: ['CI/CD', 'GitHub Actions', 'DevOps'],
    isFree: true
  }
];

export function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
  const types = ['all', 'Article', 'Video', 'Course', 'Documentation'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const toggleBookmark = (id: string) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(b => b !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || resource.difficulty === difficultyFilter;
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesBookmark = !showBookmarkedOnly || bookmarked.includes(resource.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesBookmark;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article': return <FileText className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Course': return <BookOpen className="w-4 h-4" />;
      case 'Documentation': return <Code className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

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
              <h1 className="text-3xl text-gray-900 dark:text-white">Resource Library</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Curated articles, videos, and courses for your tech career
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

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{resources.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Free Resources</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {resources.filter(r => r.isFree).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categories.length - 1}
                </p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bookmarked</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookmarked.length}</p>
              </div>
              <BookmarkCheck className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
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

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>
                      {diff === 'all' ? 'All Levels' : diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showBookmarkedOnly ? "default" : "outline"}
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className="w-full"
              >
                <BookmarkCheck className="w-4 h-4 mr-2" />
                {showBookmarkedOnly ? 'Showing Bookmarked' : 'Show Bookmarked'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => {
            const isBookmarked = bookmarked.includes(resource.id);

            return (
              <Card key={resource.id} className="p-6 hover:shadow-xl transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                      {getTypeIcon(resource.type)}
                    </div>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(resource.id)}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-gray-400" />
                    )}
                  </Button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {resource.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">By {resource.author}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-900 dark:text-white">{resource.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                    <Badge variant="outline">{resource.category}</Badge>
                    {resource.isFree && (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        Free
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {resource.duration}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-500 px-2 py-1">
                        +{resource.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <Button className="w-full" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      View Resource
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 dark:text-white mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
