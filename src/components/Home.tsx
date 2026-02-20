import { Link } from 'react-router';
import { 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  Users,
  Zap,
  Brain,
  Code,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Career Path Analysis',
    description: 'Discover 2-3 ideal career paths based on your skills, interests, and market demand.',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Skill Gap Identification',
    description: 'Get a clear view of what skills you need to learn to reach your career goals.',
    color: 'green',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Learning Roadmaps',
    description: 'Structured learning paths with resources, timelines, and milestones for 50+ careers.',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'AI Mentor Chat',
    description: 'Ask questions and get personalized advice from your AI career mentor anytime.',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Interview Preparation',
    description: 'Practice with real interview questions tailored to your target roles.',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Career Comparison',
    description: 'Compare multiple career paths side-by-side to make informed decisions.',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-500'
  }
];

const stats = [
  { number: '50+', label: 'Career Paths' },
  { number: '100+', label: 'Learning Resources' },
  { number: '1000+', label: 'Practice Questions' },
  { number: '24/7', label: 'AI Mentor Support' }
];

const careerCategories = [
  { name: 'Core IT & Software', icon: <Code className="w-5 h-5" />, count: '15+' },
  { name: 'Data & AI', icon: <Brain className="w-5 h-5" />, count: '10+' },
  { name: 'Cybersecurity', icon: <Target className="w-5 h-5" />, count: '8+' },
  { name: 'Design & UX', icon: <Sparkles className="w-5 h-5" />, count: '7+' },
  { name: 'Cloud & DevOps', icon: <Zap className="w-5 h-5" />, count: '6+' },
  { name: 'Product & Strategy', icon: <Users className="w-5 h-5" />, count: '5+' }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at TCS',
    text: 'Carvix helped me transition from testing to development. The roadmap was clear and actionable!',
    rating: 5
  },
  {
    name: 'Rahul Kumar',
    role: 'Data Analyst at Infosys',
    text: 'The AI mentor answered all my doubts. Got placed as a Data Analyst within 4 months!',
    rating: 5
  },
  {
    name: 'Anjali Patel',
    role: 'UI/UX Designer at Startup',
    text: 'Best career guidance tool for tech students. The interview prep section is gold!',
    rating: 5
  }
];

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <CarvixLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <h1 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Carvix
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">AI Career Counselor</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/setup">
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 sm:mb-6 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-700 text-xs sm:text-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Your Personal AI
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              {' '}Career Mentor
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4">
            Get personalized career guidance, skill gap analysis, and structured learning paths 
            tailored for IT and tech professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base sm:text-lg h-12 sm:h-14">
              <Link to="/setup">
                Start Your Journey
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base sm:text-lg h-12 sm:h-14">
              <Link to="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-all">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.number}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Everything You Need to Succeed</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Comprehensive tools and guidance to help you navigate your tech career journey
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-5 sm:p-6 hover:shadow-xl transition-all group cursor-pointer">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Career Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Explore 50+ Tech Career Paths</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Comprehensive guidance across all major technology domains
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {careerCategories.map((category, index) => (
            <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{category.count} paths</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Success Stories</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            See how Carvix helped students and professionals achieve their career goals
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-5 sm:p-6 hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Ready to Transform Your Career?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Join thousands of students and professionals who are building successful tech careers with Carvix
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-base sm:text-lg h-12 sm:h-14">
            <Link to="/setup">
              Start Free Today
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <CarvixLogo className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="font-semibold text-sm sm:text-base">Carvix</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © 2026 Carvix. AI-Powered Career Counseling for Tech Professionals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}