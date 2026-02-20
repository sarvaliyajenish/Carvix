import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  TrendingUp, 
  Target, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare, 
  BookOpen,
  Briefcase,
  Brain,
  GitCompare,
  Library,
  Award,
  ListTodo
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ProfileData {
  name: string;
  email: string;
  education: string;
  degree: string;
  graduationYear: string;
  technicalSkills: string;
  softSkills: string;
  experience: string;
  interests: string;
  careerGoals: string;
  resumeText: string;
}

interface CareerPath {
  title: string;
  match: number;
  description: string;
  whyFits: string[];
  demand: string;
  averageSalary: string;
  growth: string;
}

interface SkillGap {
  category: string;
  missing: string[];
  weak: string[];
}

export function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      navigate('/setup');
      return;
    }

    const profileData: ProfileData = JSON.parse(storedProfile);
    setProfile(profileData);

    // Analyze profile and generate recommendations
    analyzeProfile(profileData);
  }, [navigate]);

  const analyzeProfile = (profileData: ProfileData) => {
    const skills = profileData.technicalSkills.toLowerCase();
    const interests = profileData.interests.toLowerCase();
    const goals = profileData.careerGoals.toLowerCase();

    // Identify strengths
    const identifiedStrengths = [];
    if (skills.includes('python') || skills.includes('java') || skills.includes('c++')) {
      identifiedStrengths.push('Strong programming foundation');
    }
    if (skills.includes('react') || skills.includes('angular') || skills.includes('vue')) {
      identifiedStrengths.push('Modern frontend frameworks');
    }
    if (skills.includes('sql') || skills.includes('database')) {
      identifiedStrengths.push('Database knowledge');
    }
    if (profileData.experience.length > 50) {
      identifiedStrengths.push('Relevant project experience');
    }
    if (skills.includes('git') || skills.includes('github')) {
      identifiedStrengths.push('Version control proficiency');
    }
    setStrengths(identifiedStrengths.length > 0 ? identifiedStrengths : ['Eager to learn', 'Clear career goals']);

    // Generate career path recommendations
    const paths: CareerPath[] = [];

    // Full Stack Developer
    if (
      skills.includes('react') ||
      skills.includes('javascript') ||
      skills.includes('node') ||
      interests.includes('web') ||
      interests.includes('full')
    ) {
      paths.push({
        title: 'Full Stack Developer',
        match: 85,
        description:
          'Build complete web applications handling both frontend and backend development.',
        whyFits: [
          'Your interest in web development aligns perfectly with this role',
          'Current skills provide a solid foundation for full stack work',
          'High demand in startups and tech companies',
        ],
        demand: 'Very High - 120k+ job openings globally',
        averageSalary: '₹6-15 LPA (India) | $80-130k (US)',
        growth: '+25% expected growth by 2027',
      });
    }

    // Data Scientist / ML Engineer
    if (
      skills.includes('python') ||
      skills.includes('machine learning') ||
      skills.includes('ai') ||
      interests.includes('data') ||
      interests.includes('ai') ||
      interests.includes('ml')
    ) {
      paths.push({
        title: 'Data Scientist / ML Engineer',
        match: 78,
        description:
          'Work with data to build predictive models and intelligent systems using machine learning.',
        whyFits: [
          'Python skills are essential for data science',
          'Growing field with massive industry demand',
          'Your analytical mindset suits this career',
        ],
        demand: 'High - 80k+ job openings globally',
        averageSalary: '₹8-20 LPA (India) | $95-150k (US)',
        growth: '+35% expected growth by 2027',
      });
    }

    // Cloud Engineer / DevOps
    if (
      skills.includes('aws') ||
      skills.includes('azure') ||
      skills.includes('cloud') ||
      skills.includes('docker') ||
      skills.includes('kubernetes') ||
      interests.includes('cloud') ||
      interests.includes('devops')
    ) {
      paths.push({
        title: 'Cloud Engineer / DevOps',
        match: 80,
        description:
          'Manage cloud infrastructure, automate deployments, and ensure scalable systems.',
        whyFits: [
          'Cloud skills are highly valued in the current market',
          'DevOps combines development and operations',
          'Essential for modern software delivery',
        ],
        demand: 'Very High - 100k+ job openings globally',
        averageSalary: '₹7-18 LPA (India) | $90-140k (US)',
        growth: '+30% expected growth by 2027',
      });
    }

    // Default paths if no specific match
    if (paths.length === 0) {
      paths.push(
        {
          title: 'Frontend Developer',
          match: 70,
          description: 'Create beautiful and responsive user interfaces for web applications.',
          whyFits: [
            'Entry-friendly with clear learning path',
            'High demand across all company sizes',
            'Creative and technical blend',
          ],
          demand: 'Very High - 110k+ job openings globally',
          averageSalary: '₹5-12 LPA (India) | $70-120k (US)',
          growth: '+20% expected growth by 2027',
        },
        {
          title: 'Backend Developer',
          match: 68,
          description: 'Build server-side logic, APIs, and database systems that power applications.',
          whyFits: [
            'Strong foundation for system design',
            'Critical role in every tech product',
            'Good career progression opportunities',
          ],
          demand: 'High - 90k+ job openings globally',
          averageSalary: '₹6-14 LPA (India) | $75-125k (US)',
          growth: '+22% expected growth by 2027',
        }
      );
    }

    // Sort by match score and take top 3
    paths.sort((a, b) => b.match - a.match);
    setCareerPaths(paths.slice(0, 3));

    // Identify skill gaps
    const gaps: SkillGap[] = [];

    // Technical skills gap
    const technicalMissing = [];
    const technicalWeak = [];

    if (!skills.includes('git')) technicalMissing.push('Git/GitHub');
    if (!skills.includes('data structures')) technicalWeak.push('Data Structures & Algorithms');
    if (!skills.includes('api') && !skills.includes('rest')) technicalMissing.push('RESTful APIs');
    if (!skills.includes('testing')) technicalMissing.push('Unit Testing');
    if (!skills.includes('docker') && !skills.includes('container')) technicalWeak.push('Docker/Containers');

    gaps.push({
      category: 'Technical Skills',
      missing: technicalMissing.slice(0, 3),
      weak: technicalWeak.slice(0, 2),
    });

    // Tools & platforms
    const toolsMissing = [];
    if (!skills.includes('linux')) toolsMissing.push('Linux/Unix');
    if (!skills.includes('aws') && !skills.includes('azure') && !skills.includes('gcp'))
      toolsMissing.push('Cloud Platform (AWS/Azure/GCP)');
    if (!skills.includes('sql') && !skills.includes('database')) toolsMissing.push('SQL & Databases');

    if (toolsMissing.length > 0) {
      gaps.push({
        category: 'Tools & Platforms',
        missing: toolsMissing,
        weak: [],
      });
    }

    // Soft skills
    const softSkillsMissing = [];
    const softSkillsLower = profileData.softSkills.toLowerCase();
    if (!softSkillsLower.includes('communication')) softSkillsMissing.push('Communication Skills');
    if (!softSkillsLower.includes('problem')) softSkillsMissing.push('Problem Solving');

    if (softSkillsMissing.length > 0) {
      gaps.push({
        category: 'Professional Skills',
        missing: softSkillsMissing,
        weak: [],
      });
    }

    setSkillGaps(gaps);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6 transition-colors">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <CarvixLogo size="md" showText={true} />
            <ThemeToggle />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl text-gray-900 dark:text-white">Welcome back, {profile.name}!</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                {profile.degree} • {profile.education === 'final-year' ? 'Final Year' : profile.education === 'graduate' ? 'Recent Graduate' : 'Working Professional'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link
                to="/roadmap"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <BookOpen className="w-4 h-4" />
                Learning Roadmap
              </Link>
              <Link
                to="/mentor"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageSquare className="w-4 h-4" />
                AI Mentor
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Access Tools */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Career Development Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Link to="/tasks">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <ListTodo className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Task Manager
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Organize tasks with reminders and track your progress
                </p>
              </Card>
            </Link>

            <Link to="/interview-prep">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Interview Prep
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practice common tech interview questions with hints and feedback
                </p>
              </Card>
            </Link>

            <Link to="/job-tracker">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Job Tracker
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Organize and track all your job applications in one place
                </p>
              </Card>
            </Link>

            <Link to="/skills-assessment">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Skills Assessment
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Evaluate your proficiency in different technical domains
                </p>
              </Card>
            </Link>

            <Link to="/career-comparison">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                <div className="bg-cyan-100 dark:bg-cyan-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <GitCompare className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Career Comparison
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compare different tech career paths side-by-side
                </p>
              </Card>
            </Link>

            <Link to="/resources">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Library className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Resource Library
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Curated articles, videos, and courses for learning
                </p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Career Path Recommendations */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-3xl text-gray-900 dark:text-white">Recommended Career Paths</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {careerPaths.map((path, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-gray-900 dark:text-white">{path.title}</h3>
                  <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    {path.match}% Match
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{path.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm text-gray-900 dark:text-white mb-2">Why This Fits You:</h4>
                  <ul className="space-y-1">
                    {path.whyFits.map((reason, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">Demand:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{path.demand}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Salary:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{path.averageSalary}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Growth:</span>
                    <span className="ml-2 text-green-600 dark:text-green-400">{path.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div>
          <div className="flex items-center mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
            <h2 className="text-3xl text-gray-900 dark:text-white">Skill Gap Analysis</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Based on your career goals and current industry requirements, here are the skills you should focus on:
            </p>

            <div className="space-y-6">
              {skillGaps.map((gap, index) => (
                <div key={index} className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
                  <h3 className="text-xl mb-3 text-gray-900 dark:text-white">{gap.category}</h3>

                  {gap.missing.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm text-red-600 dark:text-red-400 mb-2">🔴 Missing (High Priority)</h4>
                      <div className="flex flex-wrap gap-2">
                        {gap.missing.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm border border-red-200 dark:border-red-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {gap.weak.length > 0 && (
                    <div>
                      <h4 className="text-sm text-orange-600 dark:text-orange-400 mb-2">🟡 Needs Improvement (Medium Priority)</h4>
                      <div className="flex flex-wrap gap-2">
                        {gap.weak.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm border border-orange-200 dark:border-orange-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-300">
                <strong>💡 Pro Tip:</strong> Focus on high-priority skills first. Check your personalized learning roadmap for a structured plan to fill these gaps.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                to="/roadmap"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                View Your Learning Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}