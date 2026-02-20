import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Lightbulb, 
  Code, 
  Brain, 
  Users, 
  CheckCircle, 
  Clock, 
  Target,
  ArrowLeft,
  Play,
  RotateCcw,
  ChevronRight,
  Trophy
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Question {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  hints: string[];
  sampleAnswer: string;
  keyPoints: string[];
}

interface PracticeSession {
  questionId: string;
  startTime: number;
  answered: boolean;
  timeSpent: number;
}

const interviewQuestions: Question[] = [
  // Technical Questions
  {
    id: 'tech-1',
    category: 'Technical',
    difficulty: 'Easy',
    question: 'Explain the difference between let, const, and var in JavaScript.',
    hints: [
      'Think about scope differences',
      'Consider reassignment capabilities',
      'Remember hoisting behavior'
    ],
    sampleAnswer: 'var is function-scoped and can be redeclared, let is block-scoped and cannot be redeclared, and const is block-scoped and cannot be reassigned. var is hoisted with undefined, while let and const are hoisted but not initialized.',
    keyPoints: [
      'Scope: var (function), let/const (block)',
      'Reassignment: var/let (yes), const (no)',
      'Hoisting behavior differences',
      'Temporal dead zone for let/const'
    ]
  },
  {
    id: 'tech-2',
    category: 'Technical',
    difficulty: 'Medium',
    question: 'What is the difference between SQL and NoSQL databases? When would you use each?',
    hints: [
      'Consider data structure requirements',
      'Think about scalability needs',
      'Reflect on ACID vs BASE principles'
    ],
    sampleAnswer: 'SQL databases use structured schemas with tables and relationships, ideal for complex queries and transactions. NoSQL databases are schema-less, better for unstructured data, horizontal scaling, and high-velocity data. Use SQL for financial systems, NoSQL for social media feeds or IoT data.',
    keyPoints: [
      'SQL: Structured, ACID compliance, vertical scaling',
      'NoSQL: Flexible schema, BASE, horizontal scaling',
      'SQL for: Banking, ERP, complex transactions',
      'NoSQL for: Real-time analytics, big data, rapid development'
    ]
  },
  {
    id: 'tech-3',
    category: 'Technical',
    difficulty: 'Hard',
    question: 'Explain how you would design a URL shortening service like bit.ly. What are the key components and challenges?',
    hints: [
      'Think about the core algorithm for generating short URLs',
      'Consider database design and scalability',
      'Address collision handling and analytics'
    ],
    sampleAnswer: 'Key components: hash generation (base62 encoding), database (original URL mapping), redirect service, and analytics. Use distributed caching (Redis), load balancers, and consistent hashing. Challenges include: collision handling, scalability, custom short URLs, and rate limiting.',
    keyPoints: [
      'Hash generation using base62 encoding',
      'Database: Key-value store for URL mappings',
      'Caching layer for performance',
      'Handle collisions and custom URLs',
      'Analytics tracking and rate limiting'
    ]
  },
  {
    id: 'tech-4',
    category: 'Technical',
    difficulty: 'Medium',
    question: 'What is the Virtual DOM in React and why is it important?',
    hints: [
      'Compare it to the actual DOM',
      'Think about performance benefits',
      'Consider the reconciliation process'
    ],
    sampleAnswer: 'The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React creates a virtual copy, compares it with the previous version (diffing), and only updates the changed parts in the real DOM (reconciliation). This minimizes expensive DOM operations and improves performance.',
    keyPoints: [
      'In-memory representation of real DOM',
      'Efficient diffing algorithm',
      'Batch updates to real DOM',
      'Improves rendering performance'
    ]
  },
  // Problem-Solving Questions
  {
    id: 'prob-1',
    category: 'Problem Solving',
    difficulty: 'Easy',
    question: 'How would you reverse a string in your preferred programming language?',
    hints: [
      'Consider built-in methods',
      'Think about array manipulation',
      'What about a loop-based approach?'
    ],
    sampleAnswer: 'In JavaScript: str.split("").reverse().join(""). In Python: str[::-1]. Alternative: use a loop to iterate backwards. Consider edge cases like empty strings and special characters.',
    keyPoints: [
      'Multiple approaches: built-in methods, loops, recursion',
      'Time complexity: O(n)',
      'Space complexity considerations',
      'Handle edge cases: null, empty, special chars'
    ]
  },
  {
    id: 'prob-2',
    category: 'Problem Solving',
    difficulty: 'Medium',
    question: 'Find the first non-repeating character in a string.',
    hints: [
      'Use a hash map to count frequencies',
      'Consider two-pass approach',
      'Think about order preservation'
    ],
    sampleAnswer: 'Use a hash map to count character frequencies in first pass. In second pass, find the first character with count 1. Time: O(n), Space: O(n). Alternative: use JavaScript Map to maintain insertion order.',
    keyPoints: [
      'Two-pass algorithm using hash map',
      'First pass: count frequencies',
      'Second pass: find first with count 1',
      'Time: O(n), Space: O(n)',
      'Handle case sensitivity'
    ]
  },
  {
    id: 'prob-3',
    category: 'Problem Solving',
    difficulty: 'Hard',
    question: 'Implement a function to detect if a linked list has a cycle.',
    hints: [
      'Consider Floyd\'s cycle detection algorithm',
      'Think about two pointers moving at different speeds',
      'What happens if they meet?'
    ],
    sampleAnswer: 'Use Floyd\'s cycle detection (tortoise and hare). Two pointers: slow (1 step) and fast (2 steps). If they meet, there\'s a cycle. If fast reaches null, no cycle. Time: O(n), Space: O(1).',
    keyPoints: [
      'Floyd\'s algorithm: slow and fast pointers',
      'Slow moves 1 step, fast moves 2 steps',
      'If they meet, cycle exists',
      'Time: O(n), Space: O(1)',
      'No extra data structures needed'
    ]
  },
  // Behavioral Questions
  {
    id: 'behav-1',
    category: 'Behavioral',
    difficulty: 'Easy',
    question: 'Tell me about a time when you faced a challenging bug. How did you resolve it?',
    hints: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Describe your debugging process',
      'Highlight what you learned'
    ],
    sampleAnswer: 'In a React project, users reported intermittent crashes. I reproduced the issue, used browser DevTools to find a race condition in async calls. Added proper error boundaries and loading states. Result: 95% crash reduction. Learned importance of defensive programming and proper async handling.',
    keyPoints: [
      'Use STAR method for structure',
      'Describe your systematic approach',
      'Show problem-solving skills',
      'Emphasize learning and growth',
      'Quantify results if possible'
    ]
  },
  {
    id: 'behav-2',
    category: 'Behavioral',
    difficulty: 'Medium',
    question: 'Describe a situation where you had to learn a new technology quickly.',
    hints: [
      'Explain your learning strategy',
      'Show resourcefulness',
      'Discuss application of the knowledge'
    ],
    sampleAnswer: 'Needed to learn Docker for a deployment project with 2-week deadline. Strategy: official docs, hands-on practice, built sample apps, joined community forums. Delivered containerized application on time. Learned to leverage documentation and community resources for rapid learning.',
    keyPoints: [
      'Clear timeline and context',
      'Structured learning approach',
      'Practical application',
      'Successful outcome',
      'Lessons learned for future'
    ]
  },
  {
    id: 'behav-3',
    category: 'Behavioral',
    difficulty: 'Medium',
    question: 'How do you handle disagreements with team members about technical decisions?',
    hints: [
      'Show respect for different opinions',
      'Explain your decision-making process',
      'Emphasize collaboration'
    ],
    sampleAnswer: 'I listen to understand their perspective, present data-driven arguments for my approach, and suggest proof-of-concepts to compare options objectively. If still disagreed, I defer to team consensus or senior guidance. Focus on project goals, not ego.',
    keyPoints: [
      'Active listening and respect',
      'Data-driven discussion',
      'Willingness to compromise',
      'Focus on project success',
      'Learn from different perspectives'
    ]
  },
  // System Design
  {
    id: 'sys-1',
    category: 'System Design',
    difficulty: 'Medium',
    question: 'How would you design a rate limiter for an API?',
    hints: [
      'Consider different rate limiting algorithms',
      'Think about distributed systems',
      'Address storage and performance'
    ],
    sampleAnswer: 'Use token bucket or sliding window algorithm. Store counters in Redis for speed and distribution. Key design: user ID + timestamp, atomic operations, proper TTL. Handle edge cases: burst traffic, multi-region. Return 429 status with retry-after header.',
    keyPoints: [
      'Algorithm: Token bucket, sliding window, leaky bucket',
      'Storage: Redis with atomic operations',
      'Distributed: Consistent across servers',
      'Response: 429 status, retry-after header',
      'Consider burst allowance and time windows'
    ]
  },
  {
    id: 'sys-2',
    category: 'System Design',
    difficulty: 'Hard',
    question: 'Design a notification system that can send emails, SMS, and push notifications to millions of users.',
    hints: [
      'Think about message queues',
      'Consider priority and delivery guarantees',
      'Address scalability and fault tolerance'
    ],
    sampleAnswer: 'Architecture: API gateway → Message queue (Kafka/RabbitMQ) → Worker services for each channel → Third-party providers (SendGrid, Twilio, FCM). Use priority queues, dead letter queues, retry logic, and delivery tracking. Scale workers horizontally, implement circuit breakers.',
    keyPoints: [
      'Message queue for decoupling',
      'Separate workers per channel',
      'Priority queues for urgent messages',
      'Retry logic and dead letter queues',
      'Horizontal scaling and monitoring',
      'Template management and personalization'
    ]
  }
];

export function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentSession, setCurrentSession] = useState<PracticeSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    // Load completed questions from localStorage
    const stored = localStorage.getItem('completedInterviewQuestions');
    if (stored) {
      setCompletedQuestions(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Timer for practice session
    let interval: number;
    if (currentSession && !currentSession.answered) {
      interval = window.setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentSession]);

  const categories = ['all', 'Technical', 'Problem Solving', 'Behavioral', 'System Design'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredQuestions = interviewQuestions.filter(q => {
    const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const startPractice = (question: Question) => {
    setCurrentQuestion(question);
    setCurrentSession({
      questionId: question.id,
      startTime: Date.now(),
      answered: false,
      timeSpent: 0
    });
    setSessionTime(0);
    setShowAnswer(false);
    setShowHints(false);
  };

  const completeQuestion = () => {
    if (currentQuestion && currentSession) {
      const updated = [...completedQuestions, currentQuestion.id];
      setCompletedQuestions(updated);
      localStorage.setItem('completedInterviewQuestions', JSON.stringify(updated));
      
      setCurrentSession({
        ...currentSession,
        answered: true,
        timeSpent: sessionTime
      });
    }
  };

  const endSession = () => {
    setCurrentSession(null);
    setCurrentQuestion(null);
    setSessionTime(0);
    setShowAnswer(false);
    setShowHints(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical': return <Code className="w-4 h-4" />;
      case 'Problem Solving': return <Brain className="w-4 h-4" />;
      case 'Behavioral': return <Users className="w-4 h-4" />;
      case 'System Design': return <Target className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (completedQuestions.length / interviewQuestions.length) * 100;

  if (currentSession && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <CarvixLogo size="md" showText={true} />
              <ThemeToggle />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl text-gray-900 dark:text-white">Practice Session</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {currentQuestion.category} • {currentQuestion.difficulty}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Time Elapsed</div>
                  <div className="text-2xl text-gray-900 dark:text-white font-mono">
                    {formatTime(sessionTime)}
                  </div>
                </div>
                <Button onClick={endSession} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit
                </Button>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8 mb-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(currentQuestion.category)}
                  {currentQuestion.category}
                </Badge>
              </div>
              <h2 className="text-2xl text-gray-900 dark:text-white mb-4">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Hints Section */}
            <div className="mb-6">
              <Button
                onClick={() => setShowHints(!showHints)}
                variant="outline"
                className="mb-4"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </Button>
              
              {showHints && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                    💡 Hints to guide you:
                  </h3>
                  <ul className="space-y-2">
                    {currentQuestion.hints.map((hint, index) => (
                      <li key={index} className="text-sm text-yellow-800 dark:text-yellow-300 flex items-start">
                        <span className="mr-2">{index + 1}.</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sample Answer */}
            <div className="mb-6">
              <Button
                onClick={() => setShowAnswer(!showAnswer)}
                variant={showAnswer ? "default" : "outline"}
                className="mb-4"
              >
                {showAnswer ? 'Hide Answer' : 'Show Sample Answer'}
              </Button>
              
              {showAnswer && (
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2">
                      ✓ Sample Answer:
                    </h3>
                    <p className="text-sm text-green-800 dark:text-green-300">
                      {currentQuestion.sampleAnswer}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                      🎯 Key Points to Cover:
                    </h3>
                    <ul className="space-y-2">
                      {currentQuestion.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-blue-800 dark:text-blue-300 flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            {!currentSession.answered ? (
              <Button onClick={completeQuestion} className="w-full" size="lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                Mark as Completed
              </Button>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-lg mb-4">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Great job! Completed in {formatTime(sessionTime)}</span>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button onClick={endSession} variant="outline">
                    Back to Questions
                  </Button>
                  <Button 
                    onClick={() => {
                      const nextQuestions = filteredQuestions.filter(
                        q => !completedQuestions.includes(q.id) && q.id !== currentQuestion.id
                      );
                      if (nextQuestions.length > 0) {
                        startPractice(nextQuestions[0]);
                      }
                    }}
                    disabled={filteredQuestions.filter(q => !completedQuestions.includes(q.id)).length <= 1}
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl text-gray-900 dark:text-white">Interview Preparation</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Practice common tech interview questions and improve your skills
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

        {/* Progress Overview */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl text-gray-900 dark:text-white mb-1">Your Progress</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {completedQuestions.length} of {interviewQuestions.length} questions completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </Card>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 mb-4">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat} className="capitalize">
                  {cat === 'all' ? 'All Categories' : cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 self-center">Difficulty:</span>
            {difficulties.map(diff => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(diff)}
                className="capitalize"
              >
                {diff}
              </Button>
            ))}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((question) => {
            const isCompleted = completedQuestions.includes(question.id);
            
            return (
              <Card key={question.id} className="p-6 hover:shadow-xl transition-shadow relative">
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(question.category)}
                      {question.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg text-gray-900 dark:text-white mb-2 line-clamp-3">
                    {question.question}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>{question.hints.length} hints available</span>
                  <span>{question.keyPoints.length} key points</span>
                </div>

                <Button 
                  onClick={() => startPractice(question)}
                  className="w-full"
                  variant={isCompleted ? "outline" : "default"}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isCompleted ? 'Practice Again' : 'Start Practice'}
                </Button>
              </Card>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No questions found matching your filters. Try adjusting the category or difficulty.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
