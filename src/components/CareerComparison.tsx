import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ArrowLeft,
  TrendingUp,
  Code,
  Database,
  Cloud,
  Palette,
  Shield,
  Brain,
  Server,
  Smartphone,
  Search,
  X,
  CheckCircle,
  Layers,
  Monitor,
  Network,
  Lock,
  TestTube,
  BarChart3,
  Zap,
  Megaphone,
  Building,
  Rocket,
  Users,
  GraduationCap,
  Headphones,
  Briefcase,
  Globe
} from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Career {
  id: string;
  title: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  averageSalary: {
    india: string;
    us: string;
  };
  demandLevel: 'Very High' | 'High' | 'Moderate';
  growthRate: string;
  workLifeBalance: number; // 1-5
  entryDifficulty: 'Easy' | 'Moderate' | 'Hard';
  requiredSkills: string[];
  typicalResponsibilities: string[];
  careerProgression: string[];
  idealFor: string[];
  pros: string[];
  cons: string[];
  remoteWorkPotential: 'High' | 'Medium' | 'Low';
}

const careers: Career[] = [
  // 💻 Core IT & Software Career Paths
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    icon: <Code className="w-6 h-6" />,
    category: 'Core IT & Software',
    description: 'Design, develop, and maintain software applications and systems',
    averageSalary: { india: '₹5-18 LPA', us: '$75-140k' },
    demandLevel: 'Very High',
    growthRate: '+22% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Programming', 'Data Structures', 'Algorithms', 'Git', 'Problem Solving', 'Testing'],
    typicalResponsibilities: ['Write clean, efficient code', 'Debug and fix issues', 'Collaborate with teams', 'Code reviews', 'Documentation'],
    careerProgression: ['Junior Engineer → Senior Engineer → Tech Lead → Architect'],
    idealFor: ['Problem solvers', 'Logical thinkers', 'Detail-oriented', 'Continuous learners'],
    pros: ['High demand', 'Good salary', 'Remote work', 'Career growth'],
    cons: ['Deadline pressure', 'Constant learning', 'Sitting hours', 'Bug fixing stress'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Developer',
    icon: <Layers className="w-6 h-6" />,
    category: 'Core IT & Software',
    description: 'Build complete web applications handling both frontend and backend',
    averageSalary: { india: '₹6-15 LPA', us: '$80-130k' },
    demandLevel: 'Very High',
    growthRate: '+25% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Moderate',
    requiredSkills: ['JavaScript/TypeScript', 'React/Vue/Angular', 'Node.js', 'Databases', 'REST APIs', 'Git'],
    typicalResponsibilities: ['Develop frontend interfaces', 'Build backend APIs', 'Database design', 'Security implementation', 'Deployment'],
    careerProgression: ['Junior Developer → Senior Developer → Tech Lead → Engineering Manager'],
    idealFor: ['Versatile learners', 'Problem solvers', 'Team players', 'Variety seekers'],
    pros: ['High demand', 'Versatile skills', 'Good salary', 'Remote opportunities'],
    cons: ['Many technologies to learn', 'Can be overwhelming', 'Constant updates', 'Long hours'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: <Monitor className="w-6 h-6" />,
    category: 'Core IT & Software',
    description: 'Create beautiful and responsive user interfaces for web applications',
    averageSalary: { india: '₹5-12 LPA', us: '$70-120k' },
    demandLevel: 'Very High',
    growthRate: '+20% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['HTML/CSS', 'JavaScript', 'React/Vue/Angular', 'Responsive Design', 'TypeScript', 'Git'],
    typicalResponsibilities: ['Build UI components', 'Ensure responsiveness', 'Optimize performance', 'Collaborate with designers', 'Accessibility'],
    careerProgression: ['Junior Frontend → Senior Frontend → Frontend Lead → Head of Frontend'],
    idealFor: ['Creative minds', 'Visual thinkers', 'User-focused', 'Design enthusiasts'],
    pros: ['Entry-friendly', 'Creative work', 'See immediate results', 'High demand'],
    cons: ['Browser compatibility', 'Design changes', 'Keep up with trends', 'Can be repetitive'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: <Server className="w-6 h-6" />,
    category: 'Core IT & Software',
    description: 'Build server-side logic, APIs, and database systems',
    averageSalary: { india: '₹6-14 LPA', us: '$75-125k' },
    demandLevel: 'High',
    growthRate: '+22% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Node.js/Python/Java', 'Databases', 'REST/GraphQL APIs', 'Authentication', 'System Design', 'Git'],
    typicalResponsibilities: ['Design and build APIs', 'Database management', 'Business logic', 'Security', 'Performance optimization'],
    careerProgression: ['Junior Backend → Senior Backend → Backend Lead → Principal Engineer'],
    idealFor: ['Logical thinkers', 'System designers', 'Data-oriented', 'Problem solvers'],
    pros: ['Core role', 'Strong fundamentals', 'Career progression', 'Stable demand'],
    cons: ['Less visual feedback', 'Complex debugging', 'Database challenges', 'Security burden'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Developer',
    icon: <Smartphone className="w-6 h-6" />,
    category: 'Core IT & Software',
    description: 'Build native or cross-platform mobile applications',
    averageSalary: { india: '₹5-14 LPA', us: '$75-130k' },
    demandLevel: 'High',
    growthRate: '+18% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Swift/Kotlin or React Native/Flutter', 'Mobile UI/UX', 'REST APIs', 'State Management', 'App Store Guidelines'],
    typicalResponsibilities: ['Develop mobile apps', 'Optimize performance', 'Offline functionality', 'App store submissions', 'Battery optimization'],
    careerProgression: ['Junior Mobile Dev → Senior Mobile Dev → Mobile Lead → Head of Mobile'],
    idealFor: ['Mobile enthusiasts', 'UI-focused', 'Detail-oriented', 'User experience advocates'],
    pros: ['Growing market', 'Direct user impact', 'App revenue potential', 'Specialized skills'],
    cons: ['Multiple platforms', 'App store approval', 'Device fragmentation', 'Frequent OS updates'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    icon: <Globe className="w-6 h-6" />,
    category: 'Core IT & Software',
    description: 'Create and maintain websites using various web technologies',
    averageSalary: { india: '₹3-10 LPA', us: '$60-100k' },
    demandLevel: 'Very High',
    growthRate: '+18% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'CMS platforms', 'Responsive Design', 'SEO basics'],
    typicalResponsibilities: ['Build websites', 'Maintain web properties', 'Update content', 'Performance optimization', 'Browser testing'],
    careerProgression: ['Junior Web Dev → Senior Web Dev → Lead Developer → Technical Manager'],
    idealFor: ['Beginners', 'Creative problem solvers', 'Fast learners', 'Client-focused'],
    pros: ['Easy entry point', 'Abundant jobs', 'Freelance opportunities', 'Creative freedom'],
    cons: ['Competitive field', 'Client demands', 'Cross-browser issues', 'Can be repetitive'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'systems-engineer',
    title: 'Systems Engineer',
    icon: <Network className="w-6 h-6" />,
    category: 'Core IT & Software',
    description: 'Design and manage complex IT infrastructure and systems',
    averageSalary: { india: '₹6-16 LPA', us: '$80-130k' },
    demandLevel: 'High',
    growthRate: '+15% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Linux/Windows Server', 'Networking', 'Scripting', 'Virtualization', 'Troubleshooting', 'Security'],
    typicalResponsibilities: ['Maintain IT infrastructure', 'System monitoring', 'Troubleshoot issues', 'Implement upgrades', 'Documentation'],
    careerProgression: ['Junior Systems Engineer → Senior Systems Engineer → Systems Architect → IT Director'],
    idealFor: ['Technical problem solvers', 'Detail-oriented', 'Analytical thinkers', 'Patient troubleshooters'],
    pros: ['Stable career', 'Diverse responsibilities', 'Problem-solving', 'Good compensation'],
    cons: ['On-call duties', 'High pressure', 'Complex systems', 'Legacy technology'],
    remoteWorkPotential: 'Medium'
  },

  // 🎨 Design & User Experience Paths
  {
    id: 'ui-designer',
    title: 'UI Designer',
    icon: <Palette className="w-6 h-6" />,
    category: 'Design & UX',
    description: 'Design visually appealing user interfaces for digital products',
    averageSalary: { india: '₹4-12 LPA', us: '$65-110k' },
    demandLevel: 'High',
    growthRate: '+16% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['Figma/Adobe XD', 'Color Theory', 'Typography', 'Layout Design', 'Design Systems', 'Prototyping'],
    typicalResponsibilities: ['Create UI mockups', 'Design components', 'Maintain design systems', 'Collaborate with developers', 'Visual consistency'],
    careerProgression: ['Junior UI Designer → Senior UI Designer → Lead Designer → Design Director'],
    idealFor: ['Creative individuals', 'Visual thinkers', 'Detail-oriented', 'Aesthetically minded'],
    pros: ['Creative work', 'Visual results', 'Portfolio building', 'Good demand'],
    cons: ['Subjective feedback', 'Revision cycles', 'Trend pressure', 'Client opinions'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    icon: <Users className="w-6 h-6" />,
    category: 'Design & UX',
    description: 'Research and design optimal user experiences for products',
    averageSalary: { india: '₹5-15 LPA', us: '$75-125k' },
    demandLevel: 'High',
    growthRate: '+18% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Moderate',
    requiredSkills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture', 'Analytics'],
    typicalResponsibilities: ['Conduct user research', 'Create user flows', 'Design wireframes', 'Run usability tests', 'Iterate based on feedback'],
    careerProgression: ['Junior UX Designer → Senior UX Designer → UX Lead → Head of UX'],
    idealFor: ['Empathetic individuals', 'Analytical thinkers', 'Problem solvers', 'User advocates'],
    pros: ['User-focused', 'Research-backed', 'Impactful work', 'Good salaries'],
    cons: ['Stakeholder management', 'Research time', 'Balancing user needs', 'Convincing teams'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    icon: <Palette className="w-6 h-6" />,
    category: 'Design & UX',
    description: 'End-to-end product design from research to visual design',
    averageSalary: { india: '₹6-18 LPA', us: '$85-140k' },
    demandLevel: 'Very High',
    growthRate: '+20% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Moderate',
    requiredSkills: ['UX Research', 'UI Design', 'Prototyping', 'Design Thinking', 'Product Strategy', 'Figma/Sketch'],
    typicalResponsibilities: ['Product research', 'Design end-to-end flows', 'Create high-fidelity mockups', 'Collaborate with PM/Engineering', 'Iterate designs'],
    careerProgression: ['Product Designer → Senior Product Designer → Lead Designer → VP of Design'],
    idealFor: ['Holistic thinkers', 'Creative problem solvers', 'User-focused', 'Strategic minds'],
    pros: ['End-to-end ownership', 'Strategic impact', 'High demand', 'Excellent compensation'],
    cons: ['High expectations', 'Multiple stakeholders', 'Tight deadlines', 'Balancing tradeoffs'],
    remoteWorkPotential: 'High'
  },

  // 🤖 Data, AI & Intelligence Paths
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    icon: <BarChart3 className="w-6 h-6" />,
    category: 'Data & AI',
    description: 'Analyze data to derive insights and support business decisions',
    averageSalary: { india: '₹4-10 LPA', us: '$60-95k' },
    demandLevel: 'Very High',
    growthRate: '+25% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['SQL', 'Excel', 'Python/R', 'Data Visualization', 'Statistics', 'Tableau/Power BI'],
    typicalResponsibilities: ['Collect and clean data', 'Analyze trends', 'Create visualizations', 'Generate reports', 'Present insights'],
    careerProgression: ['Junior Data Analyst → Senior Data Analyst → Analytics Manager → Head of Analytics'],
    idealFor: ['Analytical thinkers', 'Detail-oriented', 'Curious minds', 'Numbers enthusiasts'],
    pros: ['Entry-friendly', 'High demand', 'Diverse industries', 'Impactful insights'],
    cons: ['Data cleaning tedious', 'Reporting pressure', 'Tool learning curve', 'Stakeholder management'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: <Brain className="w-6 h-6" />,
    category: 'Data & AI',
    description: 'Build predictive models and extract insights from complex data',
    averageSalary: { india: '₹8-20 LPA', us: '$95-150k' },
    demandLevel: 'Very High',
    growthRate: '+35% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Hard',
    requiredSkills: ['Python/R', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'Deep Learning'],
    typicalResponsibilities: ['Build ML models', 'Analyze large datasets', 'Feature engineering', 'Model deployment', 'Communicate findings'],
    careerProgression: ['Data Scientist → Senior Data Scientist → Lead Data Scientist → Chief Data Officer'],
    idealFor: ['Math enthusiasts', 'Analytical minds', 'Problem solvers', 'Research-oriented'],
    pros: ['Excellent salary', 'Intellectually stimulating', 'High demand', 'Impactful work'],
    cons: ['Math heavy', 'Data cleaning tedious', 'Steep learning curve', 'Need advanced degrees'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    icon: <Brain className="w-6 h-6" />,
    category: 'Data & AI',
    description: 'Design and deploy machine learning systems and models',
    averageSalary: { india: '₹10-25 LPA', us: '$110-170k' },
    demandLevel: 'Very High',
    growthRate: '+40% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Hard',
    requiredSkills: ['Python', 'TensorFlow/PyTorch', 'ML Algorithms', 'MLOps', 'Cloud Platforms', 'Docker/Kubernetes'],
    typicalResponsibilities: ['Build ML pipelines', 'Train and optimize models', 'Deploy to production', 'Monitor model performance', 'A/B testing'],
    careerProgression: ['ML Engineer → Senior ML Engineer → ML Architect → Director of ML'],
    idealFor: ['Technical experts', 'Research-minded', 'Problem solvers', 'Optimization enthusiasts'],
    pros: ['Cutting-edge tech', 'Excellent compensation', 'High demand', 'Impactful solutions'],
    cons: ['Very competitive', 'Complex problems', 'Constant learning', 'Production challenges'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    icon: <Zap className="w-6 h-6" />,
    category: 'Data & AI',
    description: 'Develop AI systems and integrate AI capabilities into products',
    averageSalary: { india: '₹12-30 LPA', us: '$120-180k' },
    demandLevel: 'Very High',
    growthRate: '+45% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Hard',
    requiredSkills: ['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'LLMs', 'Cloud AI Services'],
    typicalResponsibilities: ['Design AI solutions', 'Train neural networks', 'Integrate AI APIs', 'Optimize AI models', 'Research new techniques'],
    careerProgression: ['AI Engineer → Senior AI Engineer → AI Architect → Chief AI Officer'],
    idealFor: ['Innovation seekers', 'Research-oriented', 'Technical experts', 'Future-focused'],
    pros: ['Cutting-edge field', 'Excellent pay', 'High impact', 'Innovation opportunities'],
    cons: ['Highly competitive', 'Rapid changes', 'Complex problems', 'Resource intensive'],
    remoteWorkPotential: 'High'
  },

  // 🔐 Cybersecurity & Networking Paths
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    icon: <Shield className="w-6 h-6" />,
    category: 'Cybersecurity',
    description: 'Protect systems and data from security threats',
    averageSalary: { india: '₹6-16 LPA', us: '$80-135k' },
    demandLevel: 'Very High',
    growthRate: '+33% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Hard',
    requiredSkills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance', 'Incident Response', 'Security Tools'],
    typicalResponsibilities: ['Monitor threats', 'Vulnerability assessments', 'Incident response', 'Security policies', 'Employee training'],
    careerProgression: ['Security Analyst → Senior Security Analyst → Security Architect → CISO'],
    idealFor: ['Detail-oriented', 'Problem solvers', 'Continuous learners', 'Ethical hackers'],
    pros: ['Critical importance', 'Job security', 'High salaries', 'Always evolving'],
    cons: ['High stress', 'On-call duties', 'Constant threats', 'Certification requirements'],
    remoteWorkPotential: 'Medium'
  },
  {
    id: 'ethical-hacker',
    title: 'Ethical Hacker',
    icon: <Lock className="w-6 h-6" />,
    category: 'Cybersecurity',
    description: 'Test systems for vulnerabilities through authorized hacking',
    averageSalary: { india: '₹7-20 LPA', us: '$90-150k' },
    demandLevel: 'Very High',
    growthRate: '+30% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Hard',
    requiredSkills: ['Penetration Testing', 'Network Security', 'Programming', 'Security Tools', 'Exploit Development', 'CEH/OSCP'],
    typicalResponsibilities: ['Conduct penetration tests', 'Identify vulnerabilities', 'Write security reports', 'Recommend fixes', 'Security audits'],
    careerProgression: ['Penetration Tester → Senior Pentester → Security Consultant → Security Director'],
    idealFor: ['Problem solvers', 'Curious hackers', 'Detail-oriented', 'Ethical individuals'],
    pros: ['Exciting work', 'High demand', 'Good pay', 'Continuous learning'],
    cons: ['Certification heavy', 'Legal responsibilities', 'Stress', 'Staying current'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    icon: <Shield className="w-6 h-6" />,
    category: 'Cybersecurity',
    description: 'Build and maintain security infrastructure and tools',
    averageSalary: { india: '₹8-18 LPA', us: '$95-145k' },
    demandLevel: 'Very High',
    growthRate: '+32% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Hard',
    requiredSkills: ['Security Architecture', 'Encryption', 'Firewalls', 'IDS/IPS', 'SIEM', 'Cloud Security'],
    typicalResponsibilities: ['Design security systems', 'Implement security controls', 'Monitor infrastructure', 'Incident handling', 'Security automation'],
    careerProgression: ['Security Engineer → Senior Security Engineer → Security Architect → VP Security'],
    idealFor: ['Technical experts', 'System thinkers', 'Problem solvers', 'Detail-focused'],
    pros: ['Critical role', 'Excellent pay', 'Job security', 'Technical depth'],
    cons: ['High pressure', 'On-call', 'Complex systems', 'Constant threats'],
    remoteWorkPotential: 'Medium'
  },
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    icon: <Network className="w-6 h-6" />,
    category: 'Cybersecurity',
    description: 'Design, implement, and maintain computer networks',
    averageSalary: { india: '₹5-14 LPA', us: '$70-120k' },
    demandLevel: 'High',
    growthRate: '+18% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Cisco/Juniper', 'TCP/IP', 'Routing/Switching', 'Network Security', 'Troubleshooting', 'CCNA/CCNP'],
    typicalResponsibilities: ['Design network topology', 'Configure network devices', 'Monitor performance', 'Troubleshoot issues', 'Network security'],
    careerProgression: ['Network Engineer → Senior Network Engineer → Network Architect → Network Director'],
    idealFor: ['Technical problem solvers', 'Detail-oriented', 'Patient troubleshooters', 'Infrastructure enthusiasts'],
    pros: ['Stable career', 'Good demand', 'Technical skills', 'Problem-solving'],
    cons: ['On-call duties', 'Hardware issues', 'Certification costs', 'Legacy systems'],
    remoteWorkPotential: 'Low'
  },

  // ☁️ Cloud, DevOps & Infrastructure
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    icon: <Cloud className="w-6 h-6" />,
    category: 'Cloud & DevOps',
    description: 'Design and manage cloud infrastructure and services',
    averageSalary: { india: '₹7-18 LPA', us: '$90-140k' },
    demandLevel: 'Very High',
    growthRate: '+30% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Moderate',
    requiredSkills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Networking'],
    typicalResponsibilities: ['Design cloud architecture', 'Manage cloud resources', 'Cost optimization', 'Security implementation', 'Migration projects'],
    careerProgression: ['Cloud Engineer → Senior Cloud Engineer → Cloud Architect → VP Infrastructure'],
    idealFor: ['System thinkers', 'Automation lovers', 'Problem solvers', 'Infrastructure enthusiasts'],
    pros: ['High demand', 'Excellent pay', 'Modern tech', 'Remote work'],
    cons: ['On-call duties', 'Cost pressure', 'Complexity', 'Constant changes'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    icon: <Zap className="w-6 h-6" />,
    category: 'Cloud & DevOps',
    description: 'Automate and streamline software delivery and infrastructure',
    averageSalary: { india: '₹7-20 LPA', us: '$95-150k' },
    demandLevel: 'Very High',
    growthRate: '+28% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Moderate',
    requiredSkills: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins/GitLab CI', 'Infrastructure as Code', 'Monitoring'],
    typicalResponsibilities: ['Build CI/CD pipelines', 'Automate deployments', 'Monitor systems', 'Incident response', 'Infrastructure optimization'],
    careerProgression: ['DevOps Engineer → Senior DevOps → DevOps Architect → Director of DevOps'],
    idealFor: ['Automation enthusiasts', 'Problem solvers', 'Bridge builders', 'Efficiency seekers'],
    pros: ['High demand', 'Good salaries', 'Modern practices', 'Impactful work'],
    cons: ['On-call', 'High pressure', 'Broad skillset needed', 'Incident stress'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'sre',
    title: 'Site Reliability Engineer (SRE)',
    icon: <Shield className="w-6 h-6" />,
    category: 'Cloud & DevOps',
    description: 'Ensure reliability and performance of large-scale systems',
    averageSalary: { india: '₹10-25 LPA', us: '$110-170k' },
    demandLevel: 'Very High',
    growthRate: '+32% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Hard',
    requiredSkills: ['System Design', 'Programming', 'Monitoring', 'Incident Management', 'Automation', 'Cloud Platforms'],
    typicalResponsibilities: ['Ensure system reliability', 'Automate operations', 'Incident response', 'Capacity planning', 'SLO/SLA management'],
    careerProgression: ['SRE → Senior SRE → Staff SRE → Principal SRE'],
    idealFor: ['System thinkers', 'Problem solvers', 'Reliability advocates', 'Automation enthusiasts'],
    pros: ['Excellent compensation', 'Challenging work', 'High impact', 'Top companies'],
    cons: ['High stress', 'On-call rotation', 'Production incidents', 'Competitive field'],
    remoteWorkPotential: 'High'
  },

  // 🧪 Testing & Quality Paths
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    icon: <TestTube className="w-6 h-6" />,
    category: 'Testing & Quality',
    description: 'Ensure software quality through testing and automation',
    averageSalary: { india: '₹4-12 LPA', us: '$65-110k' },
    demandLevel: 'High',
    growthRate: '+20% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['Test Planning', 'Manual Testing', 'Automation Testing', 'Selenium/Cypress', 'Bug Tracking', 'API Testing'],
    typicalResponsibilities: ['Create test plans', 'Execute test cases', 'Write automated tests', 'Report bugs', 'Regression testing'],
    careerProgression: ['QA Engineer → Senior QA → QA Lead → QA Manager'],
    idealFor: ['Detail-oriented', 'Patient testers', 'Quality advocates', 'Systematic thinkers'],
    pros: ['Entry-friendly', 'Stable demand', 'Less pressure', 'Clear processes'],
    cons: ['Repetitive tasks', 'Lower pay', 'Less creative', 'Undervalued sometimes'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'automation-test-engineer',
    title: 'Automation Test Engineer',
    icon: <TestTube className="w-6 h-6" />,
    category: 'Testing & Quality',
    description: 'Build and maintain automated test frameworks',
    averageSalary: { india: '₹5-14 LPA', us: '$75-125k' },
    demandLevel: 'Very High',
    growthRate: '+25% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Programming', 'Selenium/Cypress', 'Test Frameworks', 'CI/CD', 'API Testing', 'Performance Testing'],
    typicalResponsibilities: ['Build test automation', 'Maintain test suites', 'CI/CD integration', 'Performance testing', 'Test reporting'],
    careerProgression: ['Automation Engineer → Senior Automation Engineer → Test Architect → QA Manager'],
    idealFor: ['Technical QA enthusiasts', 'Automation lovers', 'Programmers', 'Efficiency seekers'],
    pros: ['High demand', 'Technical role', 'Better compensation', 'Automation impact'],
    cons: ['Maintenance burden', 'Flaky tests', 'Tool learning', 'Developer dependency'],
    remoteWorkPotential: 'High'
  },

  // 📊 Data, Business & Analytics
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    icon: <BarChart3 className="w-6 h-6" />,
    category: 'Business & Analytics',
    description: 'Bridge business needs with technical solutions',
    averageSalary: { india: '₹5-15 LPA', us: '$70-120k' },
    demandLevel: 'High',
    growthRate: '+20% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['Requirements Gathering', 'Process Analysis', 'SQL', 'Excel', 'Communication', 'Documentation'],
    typicalResponsibilities: ['Gather requirements', 'Analyze processes', 'Create documentation', 'Stakeholder management', 'Solution design'],
    careerProgression: ['Business Analyst → Senior BA → Lead BA → Product Manager'],
    idealFor: ['Communicators', 'Problem solvers', 'Bridge builders', 'Analytical thinkers'],
    pros: ['Good demand', 'Less technical', 'Business exposure', 'Career pivot opportunities'],
    cons: ['Stakeholder challenges', 'Scope creep', 'Documentation heavy', 'Balancing needs'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'product-analyst',
    title: 'Product Analyst',
    icon: <BarChart3 className="w-6 h-6" />,
    category: 'Business & Analytics',
    description: 'Analyze product metrics and drive data-informed decisions',
    averageSalary: { india: '₹6-16 LPA', us: '$80-130k' },
    demandLevel: 'Very High',
    growthRate: '+25% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Moderate',
    requiredSkills: ['SQL', 'Python/R', 'Analytics Tools', 'A/B Testing', 'Product Metrics', 'Data Visualization'],
    typicalResponsibilities: ['Track product metrics', 'Run experiments', 'User behavior analysis', 'Create dashboards', 'Provide insights'],
    careerProgression: ['Product Analyst → Senior Product Analyst → Lead Analyst → Head of Analytics'],
    idealFor: ['Data enthusiasts', 'Product-minded', 'Analytical thinkers', 'Impact-driven'],
    pros: ['High impact', 'Product exposure', 'Good demand', 'Career growth'],
    cons: ['Data dependencies', 'Stakeholder pressure', 'Metric overload', 'Experimentation challenges'],
    remoteWorkPotential: 'High'
  },

  // 🧠 Product, Management & Strategy
  {
    id: 'product-manager',
    title: 'Product Manager',
    icon: <Briefcase className="w-6 h-6" />,
    category: 'Product & Strategy',
    description: 'Define product vision and drive product strategy',
    averageSalary: { india: '₹10-25 LPA', us: '$100-160k' },
    demandLevel: 'High',
    growthRate: '+15% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Hard',
    requiredSkills: ['Product Strategy', 'User Research', 'Analytics', 'Agile/Scrum', 'Communication', 'Technical Understanding'],
    typicalResponsibilities: ['Define product roadmap', 'Gather requirements', 'Prioritize features', 'Collaborate with engineering', 'Analyze metrics'],
    careerProgression: ['Associate PM → Product Manager → Senior PM → Director of Product → CPO'],
    idealFor: ['Strategic thinkers', 'Communicators', 'User advocates', 'Business-minded'],
    pros: ['High impact', 'Cross-functional work', 'Excellent compensation', 'Strategic role'],
    cons: ['Stakeholder balancing', 'High pressure', 'Broad skillset', 'Hard first role'],
    remoteWorkPotential: 'Medium'
  },
  {
    id: 'scrum-master',
    title: 'Scrum Master',
    icon: <Users className="w-6 h-6" />,
    category: 'Product & Strategy',
    description: 'Facilitate agile processes and remove team blockers',
    averageSalary: { india: '₹7-18 LPA', us: '$85-130k' },
    demandLevel: 'High',
    growthRate: '+18% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Scrum Framework', 'Agile Methodologies', 'Facilitation', 'Communication', 'Conflict Resolution', 'CSM Certification'],
    typicalResponsibilities: ['Facilitate ceremonies', 'Remove impediments', 'Coach teams', 'Track metrics', 'Process improvement'],
    careerProgression: ['Scrum Master → Senior Scrum Master → Agile Coach → Agile Director'],
    idealFor: ['Facilitators', 'Team players', 'Process improvers', 'Servant leaders'],
    pros: ['People-focused', 'Good demand', 'Stable role', 'Work-life balance'],
    cons: ['Team dependencies', 'Organizational resistance', 'Limited technical growth', 'Process overhead'],
    remoteWorkPotential: 'Medium'
  },

  // 📈 Marketing, Growth & Sales-Tech
  {
    id: 'growth-analyst',
    title: 'Growth Analyst',
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'Marketing & Growth',
    description: 'Drive user acquisition and retention through data analysis',
    averageSalary: { india: '₹6-15 LPA', us: '$75-125k' },
    demandLevel: 'High',
    growthRate: '+22% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Moderate',
    requiredSkills: ['SQL', 'Analytics', 'A/B Testing', 'Funnel Analysis', 'Growth Hacking', 'Marketing Tools'],
    typicalResponsibilities: ['Analyze growth metrics', 'Run experiments', 'Optimize funnels', 'User retention analysis', 'Report insights'],
    careerProgression: ['Growth Analyst → Senior Growth Analyst → Growth Lead → Head of Growth'],
    idealFor: ['Data-driven marketers', 'Experimenters', 'Impact-focused', 'Analytical minds'],
    pros: ['High impact', 'Experimental culture', 'Good compensation', 'Startup opportunities'],
    cons: ['Pressure to grow', 'Competitive', 'Fast-paced', 'Attribution challenges'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'seo-specialist',
    title: 'SEO Specialist',
    icon: <Search className="w-6 h-6" />,
    category: 'Marketing & Growth',
    description: 'Optimize websites for search engines and increase organic traffic',
    averageSalary: { india: '₹3-10 LPA', us: '$50-90k' },
    demandLevel: 'High',
    growthRate: '+18% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['SEO Tools', 'Keyword Research', 'On-page SEO', 'Link Building', 'Analytics', 'Content Strategy'],
    typicalResponsibilities: ['Keyword research', 'On-page optimization', 'Link building', 'Technical SEO', 'Track rankings'],
    careerProgression: ['SEO Specialist → Senior SEO → SEO Manager → Head of SEO'],
    idealFor: ['Digital marketers', 'Data enthusiasts', 'Content strategists', 'Patient optimizers'],
    pros: ['Entry-friendly', 'Measurable results', 'Freelance opportunities', 'Diverse industries'],
    cons: ['Algorithm changes', 'Long-term results', 'Competitive', 'Manual work'],
    remoteWorkPotential: 'High'
  },

  // 🧩 Emerging & Future-Tech Careers
  {
    id: 'blockchain-dev',
    title: 'Blockchain Developer',
    icon: <Layers className="w-6 h-6" />,
    category: 'Emerging Tech',
    description: 'Build decentralized applications and blockchain solutions',
    averageSalary: { india: '₹8-22 LPA', us: '$100-160k' },
    demandLevel: 'High',
    growthRate: '+35% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Hard',
    requiredSkills: ['Solidity/Rust', 'Smart Contracts', 'Web3.js', 'Ethereum/other chains', 'Cryptography', 'DeFi protocols'],
    typicalResponsibilities: ['Develop smart contracts', 'Build dApps', 'Blockchain integration', 'Security audits', 'Protocol design'],
    careerProgression: ['Blockchain Dev → Senior Blockchain Dev → Blockchain Architect → CTO'],
    idealFor: ['Crypto enthusiasts', 'Security-minded', 'Innovation seekers', 'Technical experts'],
    pros: ['Cutting-edge', 'High salaries', 'Startup opportunities', 'Future technology'],
    cons: ['Volatile industry', 'Complex tech', 'Regulatory uncertainty', 'Security risks'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'ar-vr-dev',
    title: 'AR/VR Developer',
    icon: <Monitor className="w-6 h-6" />,
    category: 'Emerging Tech',
    description: 'Create immersive augmented and virtual reality experiences',
    averageSalary: { india: '₹6-18 LPA', us: '$85-140k' },
    demandLevel: 'Moderate',
    growthRate: '+30% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Hard',
    requiredSkills: ['Unity/Unreal Engine', 'C#/C++', '3D Graphics', 'AR Kit/AR Core', 'VR SDKs', '3D Math'],
    typicalResponsibilities: ['Develop AR/VR apps', '3D modeling integration', 'Optimize performance', 'User interaction design', 'Testing'],
    careerProgression: ['AR/VR Dev → Senior AR/VR Dev → Technical Lead → XR Director'],
    idealFor: ['3D enthusiasts', 'Gamers', 'Creative technologists', 'Immersive tech lovers'],
    pros: ['Cutting-edge', 'Creative work', 'Growing field', 'Diverse applications'],
    cons: ['Niche market', 'Hardware limitations', 'Motion sickness issues', 'Performance challenges'],
    remoteWorkPotential: 'Medium'
  },

  // 🧑‍🏫 Teaching, Research & Knowledge Roles
  {
    id: 'technical-trainer',
    title: 'Technical Trainer',
    icon: <GraduationCap className="w-6 h-6" />,
    category: 'Education & Research',
    description: 'Train professionals on technical skills and technologies',
    averageSalary: { india: '₹4-12 LPA', us: '$60-100k' },
    demandLevel: 'Moderate',
    growthRate: '+15% by 2027',
    workLifeBalance: 4,
    entryDifficulty: 'Easy',
    requiredSkills: ['Technical Expertise', 'Communication', 'Presentation', 'Curriculum Design', 'Training Tools', 'Patience'],
    typicalResponsibilities: ['Develop training content', 'Conduct training sessions', 'Assess learners', 'Update curriculum', 'One-on-one mentoring'],
    careerProgression: ['Trainer → Senior Trainer → Training Manager → Head of Learning'],
    idealFor: ['Teachers', 'Communicators', 'Patient educators', 'Knowledge sharers'],
    pros: ['Share knowledge', 'People interaction', 'Work-life balance', 'Fulfilling work'],
    cons: ['Lower pay', 'Repetitive content', 'Learner challenges', 'Limited technical growth'],
    remoteWorkPotential: 'High'
  },

  // 🧠 Support, Ops & Hybrid Roles
  {
    id: 'tech-support',
    title: 'Technical Support Engineer',
    icon: <Headphones className="w-6 h-6" />,
    category: 'Support & Operations',
    description: 'Provide technical assistance and troubleshoot issues',
    averageSalary: { india: '₹3-8 LPA', us: '$50-85k' },
    demandLevel: 'High',
    growthRate: '+12% by 2027',
    workLifeBalance: 3,
    entryDifficulty: 'Easy',
    requiredSkills: ['Troubleshooting', 'Customer Service', 'Technical Knowledge', 'Ticketing Systems', 'Communication', 'Patience'],
    typicalResponsibilities: ['Resolve technical issues', 'Customer communication', 'Document solutions', 'Escalate complex problems', 'Create knowledge base'],
    careerProgression: ['Support Engineer → Senior Support → Support Lead → Support Manager'],
    idealFor: ['Problem solvers', 'Patient helpers', 'Communicators', 'Service-oriented'],
    pros: ['Entry-friendly', 'Learn technologies', 'Stable jobs', 'People skills'],
    cons: ['Customer frustration', 'Repetitive issues', 'Lower pay', 'Limited growth'],
    remoteWorkPotential: 'High'
  },

  // 🚀 Freelance, Startup & Independent Paths
  {
    id: 'freelance-developer',
    title: 'Freelance Developer',
    icon: <Rocket className="w-6 h-6" />,
    category: 'Freelance & Startup',
    description: 'Work independently on client projects across technologies',
    averageSalary: { india: '₹3-20 LPA', us: '$40-150k' },
    demandLevel: 'High',
    growthRate: '+20% by 2027',
    workLifeBalance: 5,
    entryDifficulty: 'Moderate',
    requiredSkills: ['Full-stack Development', 'Self-management', 'Client Communication', 'Time Management', 'Business Skills', 'Portfolio'],
    typicalResponsibilities: ['Client projects', 'Project management', 'Business development', 'Invoicing', 'Self-learning'],
    careerProgression: ['Freelancer → Agency Owner → Consultant → SaaS Founder'],
    idealFor: ['Self-starters', 'Independent workers', 'Entrepreneurs', 'Flexible schedulers'],
    pros: ['Flexibility', 'Location independence', 'Income potential', 'Diverse projects'],
    cons: ['Unstable income', 'No benefits', 'Client management', 'Self-discipline needed'],
    remoteWorkPotential: 'High'
  },
  {
    id: 'tech-content-creator',
    title: 'Technical Content Creator',
    icon: <Megaphone className="w-6 h-6" />,
    category: 'Freelance & Startup',
    description: 'Create educational content about technology and programming',
    averageSalary: { india: '₹2-15 LPA', us: '$30-120k' },
    demandLevel: 'Moderate',
    growthRate: '+25% by 2027',
    workLifeBalance: 5,
    entryDifficulty: 'Easy',
    requiredSkills: ['Technical Knowledge', 'Content Creation', 'Video Editing', 'Communication', 'Social Media', 'Marketing'],
    typicalResponsibilities: ['Create tutorials', 'Write articles', 'Make videos', 'Build audience', 'Monetization'],
    careerProgression: ['Content Creator → Influencer → Course Creator → Education Platform'],
    idealFor: ['Teachers', 'Communicators', 'Creative individuals', 'Self-motivated'],
    pros: ['Creative freedom', 'Flexible schedule', 'Passive income', 'Build brand'],
    cons: ['Inconsistent income', 'Burnout risk', 'Algorithm dependency', 'Self-promotion needed'],
    remoteWorkPotential: 'High'
  }
];

export function CareerComparison() {
  const [selectedCareers, setSelectedCareers] = useState<Career[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(careers.map(c => c.category)))];

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || career.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleCareer = (career: Career) => {
    if (selectedCareers.find(c => c.id === career.id)) {
      setSelectedCareers(selectedCareers.filter(c => c.id !== career.id));
    } else if (selectedCareers.length < 3) {
      setSelectedCareers([...selectedCareers, career]);
    }
  };

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'High': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    }
  };

  const renderWorkLifeBalance = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`w-2 h-8 rounded ${
              i <= rating ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    );
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
              <h1 className="text-3xl text-gray-900 dark:text-white">Career Comparison Tool</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Compare {careers.length}+ tech career paths side-by-side
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

        {/* Selected Careers */}
        {selectedCareers.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Comparing {selectedCareers.length} Career{selectedCareers.length > 1 ? 's' : ''} 
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 font-normal">
                (Select up to 3)
              </span>
            </h2>
            
            <div className="grid gap-4" style={{
              gridTemplateColumns: `repeat(${selectedCareers.length}, minmax(0, 1fr))`
            }}>
              {selectedCareers.map(career => (
                <div key={career.id} className="space-y-4">
                  {/* Career Header */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center text-white">
                        {career.icon}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCareer(career)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {career.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {career.description}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-3 bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">💰 Salary (India)</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{career.averageSalary.india}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">💵 Salary (US)</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{career.averageSalary.us}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">📈 Growth Rate</div>
                      <div className="font-semibold text-green-600 dark:text-green-400">{career.growthRate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">⚖️ Work-Life Balance</div>
                      {renderWorkLifeBalance(career.workLifeBalance)}
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">📊 Demand</div>
                      <Badge className={getDemandColor(career.demandLevel)}>{career.demandLevel}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">🎯 Entry Difficulty</div>
                      <Badge className={getDifficultyColor(career.entryDifficulty)}>{career.entryDifficulty}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">🏠 Remote Work</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{career.remoteWorkPotential}</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Required Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {career.requiredSkills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Responsibilities</div>
                    <ul className="space-y-1">
                      {career.typicalResponsibilities.map((resp, idx) => (
                        <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="mr-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Ideal For</div>
                    <div className="space-y-1">
                      {career.idealFor.map((trait, idx) => (
                        <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
                          {trait}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">✓ Pros</div>
                    <ul className="space-y-1 mb-3">
                      {career.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-gray-600 dark:text-gray-400">• {pro}</li>
                      ))}
                    </ul>
                    <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">✗ Cons</div>
                    <ul className="space-y-1">
                      {career.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-gray-600 dark:text-gray-400">• {con}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Career Progression */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Career Path</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {career.careerProgression[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search careers..."
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

        {/* Available Careers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Available Careers ({filteredCareers.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCareers.map(career => {
              const isSelected = selectedCareers.find(c => c.id === career.id);
              const canSelect = selectedCareers.length < 3 || isSelected;

              return (
                <Card
                  key={career.id}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected 
                      ? 'ring-2 ring-indigo-600 dark:ring-indigo-400 shadow-lg' 
                      : canSelect 
                      ? 'hover:shadow-lg' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => canSelect && toggleCareer(career)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center text-white">
                      {career.icon}
                    </div>
                    {isSelected && (
                      <Badge className="bg-indigo-600 text-white">Selected</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {career.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    {career.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="text-xs">{career.category}</Badge>
                    <Badge className={getDemandColor(career.demandLevel)}>{career.demandLevel}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
