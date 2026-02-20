import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  XCircle,
  Award,
  TrendingUp,
  Brain,
  Code,
  Database,
  Cloud,
  GitBranch,
  Target,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  questions: Question[];
  color: string;
}

interface AssessmentResult {
  assessmentId: string;
  score: number;
  totalQuestions: number;
  date: string;
  proficiencyLevel: string;
}

const assessments: Assessment[] = [
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of core JavaScript concepts',
    icon: <Code className="w-6 h-6" />,
    category: 'Programming',
    color: 'bg-yellow-500',
    questions: [
      {
        id: 1,
        question: 'What is the output of: console.log(typeof null)?',
        options: ['null', 'undefined', 'object', 'number'],
        correctAnswer: 2,
        explanation: 'In JavaScript, typeof null returns "object". This is a known quirk in the language.',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        question: 'What is a closure in JavaScript?',
        options: [
          'A function that has access to its outer function scope',
          'A way to close a program',
          'A type of loop',
          'A data structure'
        ],
        correctAnswer: 0,
        explanation: 'A closure is a function that has access to variables in its outer (enclosing) function scope, even after the outer function has returned.',
        difficulty: 'Intermediate'
      },
      {
        id: 3,
        question: 'What does "use strict" do in JavaScript?',
        options: [
          'Makes code run faster',
          'Enables strict mode with stricter error handling',
          'Compiles the code',
          'Disables all errors'
        ],
        correctAnswer: 1,
        explanation: '"use strict" enables strict mode, which catches common coding errors and prevents certain actions.',
        difficulty: 'Beginner'
      },
      {
        id: 4,
        question: 'What is the difference between == and === in JavaScript?',
        options: [
          'No difference',
          '== checks type and value, === checks only value',
          '=== checks type and value, == checks only value',
          'Both are deprecated'
        ],
        correctAnswer: 2,
        explanation: '=== (strict equality) checks both type and value, while == (loose equality) performs type coercion before comparison.',
        difficulty: 'Beginner'
      },
      {
        id: 5,
        question: 'What will Promise.all() do if one promise rejects?',
        options: [
          'Wait for all promises to complete',
          'Immediately reject with that error',
          'Continue with remaining promises',
          'Return undefined'
        ],
        correctAnswer: 1,
        explanation: 'Promise.all() immediately rejects if any promise in the array rejects, without waiting for other promises.',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: 'react',
    title: 'React & Frontend',
    description: 'Evaluate your React and modern frontend skills',
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'Frontend',
    color: 'bg-blue-500',
    questions: [
      {
        id: 1,
        question: 'What is the Virtual DOM in React?',
        options: [
          'A virtual reality interface',
          'A lightweight copy of the actual DOM',
          'A database',
          'A server-side rendering tool'
        ],
        correctAnswer: 1,
        explanation: 'The Virtual DOM is a lightweight JavaScript representation of the actual DOM, used by React to optimize updates.',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        question: 'What is the purpose of useEffect hook?',
        options: [
          'To update state',
          'To handle side effects in functional components',
          'To create components',
          'To style components'
        ],
        correctAnswer: 1,
        explanation: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
        difficulty: 'Intermediate'
      },
      {
        id: 3,
        question: 'What are React keys used for?',
        options: [
          'Encrypting data',
          'Helping React identify which items have changed',
          'Password protection',
          'API authentication'
        ],
        correctAnswer: 1,
        explanation: 'Keys help React identify which items in a list have changed, been added, or removed, optimizing re-renders.',
        difficulty: 'Beginner'
      },
      {
        id: 4,
        question: 'What is prop drilling in React?',
        options: [
          'A drilling machine',
          'Passing props through multiple component layers',
          'A debugging technique',
          'A testing method'
        ],
        correctAnswer: 1,
        explanation: 'Prop drilling refers to passing props through multiple levels of components to reach a deeply nested component.',
        difficulty: 'Intermediate'
      },
      {
        id: 5,
        question: 'What is the purpose of React.memo()?',
        options: [
          'To memorize code',
          'To prevent unnecessary re-renders of components',
          'To store data in memory',
          'To create memes'
        ],
        correctAnswer: 1,
        explanation: 'React.memo() is a higher-order component that prevents unnecessary re-renders by memoizing the component output.',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Check your understanding of DSA concepts',
    icon: <Brain className="w-6 h-6" />,
    category: 'Computer Science',
    color: 'bg-purple-500',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search has O(log n) time complexity because it divides the search space in half with each iteration.',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        question: 'Which data structure uses LIFO (Last In First Out)?',
        options: ['Queue', 'Stack', 'Array', 'Tree'],
        correctAnswer: 1,
        explanation: 'A Stack follows the LIFO principle where the last element added is the first one to be removed.',
        difficulty: 'Beginner'
      },
      {
        id: 3,
        question: 'What is the best case time complexity of Quick Sort?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correctAnswer: 0,
        explanation: 'Quick Sort has a best and average case time complexity of O(n log n) when the pivot divides the array evenly.',
        difficulty: 'Intermediate'
      },
      {
        id: 4,
        question: 'What is a hash collision?',
        options: [
          'When two keys hash to the same index',
          'When a hash table crashes',
          'When hashing fails',
          'When data gets corrupted'
        ],
        correctAnswer: 0,
        explanation: 'A hash collision occurs when two different keys produce the same hash value, mapping to the same index.',
        difficulty: 'Intermediate'
      },
      {
        id: 5,
        question: 'What is the space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Merge sort has O(n) space complexity because it requires additional space proportional to the input size for merging.',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: 'databases',
    title: 'Database & SQL',
    description: 'Test your database management knowledge',
    icon: <Database className="w-6 h-6" />,
    category: 'Backend',
    color: 'bg-green-500',
    questions: [
      {
        id: 1,
        question: 'What does SQL stand for?',
        options: [
          'Structured Question Language',
          'Structured Query Language',
          'Simple Query Language',
          'Standard Query Language'
        ],
        correctAnswer: 1,
        explanation: 'SQL stands for Structured Query Language, used for managing and querying relational databases.',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        question: 'What is a primary key?',
        options: [
          'The most important key',
          'A unique identifier for each record',
          'A password',
          'A foreign key reference'
        ],
        correctAnswer: 1,
        explanation: 'A primary key is a column (or set of columns) that uniquely identifies each row in a table.',
        difficulty: 'Beginner'
      },
      {
        id: 3,
        question: 'What is normalization in databases?',
        options: [
          'Making data normal',
          'Organizing data to reduce redundancy',
          'Backing up data',
          'Encrypting data'
        ],
        correctAnswer: 1,
        explanation: 'Normalization is the process of organizing data to minimize redundancy and dependency.',
        difficulty: 'Intermediate'
      },
      {
        id: 4,
        question: 'What does ACID stand for in database transactions?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Accuracy, Completeness, Integrity, Dependency',
          'Access, Control, Identity, Data',
          'All, Create, Insert, Delete'
        ],
        correctAnswer: 0,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability - key properties of database transactions.',
        difficulty: 'Intermediate'
      },
      {
        id: 5,
        question: 'What is an index in a database?',
        options: [
          'A table of contents',
          'A data structure that improves query speed',
          'A backup file',
          'A type of key'
        ],
        correctAnswer: 1,
        explanation: 'An index is a data structure that improves the speed of data retrieval operations on a database table.',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'git',
    title: 'Git & Version Control',
    description: 'Assess your Git and collaboration skills',
    icon: <GitBranch className="w-6 h-6" />,
    category: 'Development Tools',
    color: 'bg-orange-500',
    questions: [
      {
        id: 1,
        question: 'What does "git clone" do?',
        options: [
          'Creates a copy of a repository',
          'Deletes a repository',
          'Merges branches',
          'Commits changes'
        ],
        correctAnswer: 0,
        explanation: 'git clone creates a local copy of a remote repository on your machine.',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        question: 'What is the difference between "git pull" and "git fetch"?',
        options: [
          'No difference',
          'git pull fetches and merges, git fetch only fetches',
          'git fetch is faster',
          'git pull is deprecated'
        ],
        correctAnswer: 1,
        explanation: 'git pull fetches changes from remote and automatically merges them, while git fetch only downloads changes without merging.',
        difficulty: 'Intermediate'
      },
      {
        id: 3,
        question: 'What is a merge conflict?',
        options: [
          'When Git crashes',
          'When the same part of a file is modified in different branches',
          'When a branch is deleted',
          'When commits fail'
        ],
        correctAnswer: 1,
        explanation: 'A merge conflict occurs when Git cannot automatically resolve differences between two commits.',
        difficulty: 'Beginner'
      },
      {
        id: 4,
        question: 'What does "git rebase" do?',
        options: [
          'Deletes the base commit',
          'Reapplies commits on top of another base',
          'Creates a new branch',
          'Pushes to remote'
        ],
        correctAnswer: 1,
        explanation: 'git rebase reapplies commits on top of another base tip, creating a linear history.',
        difficulty: 'Advanced'
      },
      {
        id: 5,
        question: 'What is the purpose of .gitignore file?',
        options: [
          'To ignore Git commands',
          'To specify files Git should not track',
          'To delete files',
          'To configure Git settings'
        ],
        correctAnswer: 1,
        explanation: '.gitignore specifies intentionally untracked files that Git should ignore.',
        difficulty: 'Beginner'
      }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Measure your cloud computing knowledge',
    icon: <Cloud className="w-6 h-6" />,
    category: 'Infrastructure',
    color: 'bg-cyan-500',
    questions: [
      {
        id: 1,
        question: 'What does IaaS stand for?',
        options: [
          'Internet as a Service',
          'Infrastructure as a Service',
          'Integration as a Service',
          'Information as a Service'
        ],
        correctAnswer: 1,
        explanation: 'IaaS (Infrastructure as a Service) provides virtualized computing resources over the internet.',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        question: 'What is Docker used for?',
        options: [
          'Docking applications',
          'Containerizing applications',
          'Building websites',
          'Database management'
        ],
        correctAnswer: 1,
        explanation: 'Docker is a platform for developing, shipping, and running applications in containers.',
        difficulty: 'Beginner'
      },
      {
        id: 3,
        question: 'What is the main benefit of containerization?',
        options: [
          'Faster internet',
          'Consistency across different environments',
          'Better graphics',
          'Cheaper hosting'
        ],
        correctAnswer: 1,
        explanation: 'Containerization ensures applications run consistently across different computing environments.',
        difficulty: 'Intermediate'
      },
      {
        id: 4,
        question: 'What is CI/CD?',
        options: [
          'Continuous Integration/Continuous Deployment',
          'Code Integration/Code Deployment',
          'Computer Integration/Computer Deployment',
          'Cloud Integration/Cloud Deployment'
        ],
        correctAnswer: 0,
        explanation: 'CI/CD stands for Continuous Integration and Continuous Deployment, automating software delivery.',
        difficulty: 'Intermediate'
      },
      {
        id: 5,
        question: 'What is Kubernetes primarily used for?',
        options: [
          'Writing code',
          'Orchestrating containerized applications',
          'Database management',
          'Web design'
        ],
        correctAnswer: 1,
        explanation: 'Kubernetes is a container orchestration platform for automating deployment, scaling, and management of containerized applications.',
        difficulty: 'Advanced'
      }
    ]
  }
];

export function SkillsAssessment() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    // Load previous results
    const stored = localStorage.getItem('assessmentResults');
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const selectAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const nextQuestion = () => {
    if (selectedAssessment && currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAssessment = () => {
    if (!selectedAssessment) return;

    let correctCount = 0;
    selectedAssessment.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / selectedAssessment.questions.length) * 100;
    let proficiencyLevel = 'Beginner';
    if (score >= 80) proficiencyLevel = 'Advanced';
    else if (score >= 60) proficiencyLevel = 'Intermediate';

    const result: AssessmentResult = {
      assessmentId: selectedAssessment.id,
      score,
      totalQuestions: selectedAssessment.questions.length,
      date: new Date().toISOString(),
      proficiencyLevel
    };

    const updatedResults = [...results.filter(r => r.assessmentId !== selectedAssessment.id), result];
    setResults(updatedResults);
    localStorage.setItem('assessmentResults', JSON.stringify(updatedResults));

    setShowResults(true);
  };

  const exitAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const getResultForAssessment = (assessmentId: string) => {
    return results.find(r => r.assessmentId === assessmentId);
  };

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'text-green-600 dark:text-green-400';
      case 'Intermediate': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  if (selectedAssessment && !showResults) {
    const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100;
    const isAnswered = answers[currentQuestion.id] !== undefined;

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
                <h1 className="text-2xl text-gray-900 dark:text-white">{selectedAssessment.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Question {currentQuestionIndex + 1} of {selectedAssessment.questions.length}
                </p>
              </div>
              <Button onClick={exitAssessment} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8">
            <div className="mb-6">
              <Badge className="mb-4">
                {currentQuestion.difficulty}
              </Badge>
              <h2 className="text-2xl text-gray-900 dark:text-white mb-6">
                {currentQuestion.question}
              </h2>
            </div>

            <RadioGroup
              value={answers[currentQuestion.id]?.toString()}
              onValueChange={(value) => selectAnswer(currentQuestion.id, parseInt(value))}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      answers[currentQuestion.id] === index
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-base text-gray-900 dark:text-white"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                onClick={previousQuestion}
                variant="outline"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              {currentQuestionIndex === selectedAssessment.questions.length - 1 ? (
                <Button
                  onClick={submitAssessment}
                  disabled={Object.keys(answers).length !== selectedAssessment.questions.length}
                >
                  Submit Assessment
                </Button>
              ) : (
                <Button onClick={nextQuestion} disabled={!isAnswered}>
                  Next Question
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults && selectedAssessment) {
    let correctCount = 0;
    selectedAssessment.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / selectedAssessment.questions.length) * 100;
    let proficiencyLevel = 'Beginner';
    if (score >= 80) proficiencyLevel = 'Advanced';
    else if (score >= 60) proficiencyLevel = 'Intermediate';

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <CarvixLogo size="md" showText={true} />
              <ThemeToggle />
            </div>
            <h1 className="text-3xl text-gray-900 dark:text-white">Assessment Results</h1>
          </div>

          {/* Score Card */}
          <Card className="p-8 mb-6 text-center">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {score.toFixed(0)}%
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {correctCount} out of {selectedAssessment.questions.length} correct
            </p>
            <Badge className={`text-lg px-4 py-2 ${
              proficiencyLevel === 'Advanced' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
              proficiencyLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            }`}>
              Proficiency: {proficiencyLevel}
            </Badge>
          </Card>

          {/* Question Review */}
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Review Your Answers
            </h3>
            <div className="space-y-6">
              {selectedAssessment.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="border-b dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="text-lg text-gray-900 dark:text-white mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Your answer: </span>
                            <span className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {question.options[userAnswer]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Correct answer: </span>
                              <span className="text-green-600 dark:text-green-400">
                                {question.options[question.correctAnswer]}
                              </span>
                            </p>
                          )}
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex justify-center gap-3">
            <Button onClick={exitAssessment} variant="outline">
              Back to Assessments
            </Button>
            <Button onClick={() => startAssessment(selectedAssessment)}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
          </div>
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
              <h1 className="text-3xl text-gray-900 dark:text-white">Skills Assessment</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Evaluate your proficiency across different technical domains
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

        {/* Assessments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => {
            const result = getResultForAssessment(assessment.id);

            return (
              <Card key={assessment.id} className="p-6 hover:shadow-xl transition-shadow">
                <div className={`${assessment.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                  {assessment.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {assessment.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {assessment.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>{assessment.questions.length} questions</span>
                  <Badge variant="outline">{assessment.category}</Badge>
                </div>

                {result && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Score:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {result.score.toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Level:</span>
                      <span className={`text-sm font-semibold ${getProficiencyColor(result.proficiencyLevel)}`}>
                        {result.proficiencyLevel}
                      </span>
                    </div>
                  </div>
                )}

                <Button onClick={() => startAssessment(assessment)} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  {result ? 'Retake Assessment' : 'Start Assessment'}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
