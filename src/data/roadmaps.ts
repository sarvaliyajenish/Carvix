// Comprehensive Career Roadmaps Data

export interface Resource {
  name: string;
  type: 'Course' | 'Documentation' | 'Practice' | 'Project' | 'Tutorial' | 'Book';
  platform: string;
  url: string;
  duration: string;
}

export interface Milestone {
  title: string;
  duration: string;
  skills: string[];
  description: string;
  resources: Resource[];
  projects: string[];
}

export interface Phase {
  name: string;
  duration: string;
  milestones: Milestone[];
}

export interface CareerRoadmap {
  id: string;
  title: string;
  category: string;
  totalDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  phases: Phase[];
}

export const careerRoadmaps: CareerRoadmap[] = [
  // 💻 Core IT & Software Career Paths
  {
    id: 'full-stack-developer',
    title: 'Full-Stack Developer',
    category: 'Core IT & Software',
    totalDuration: '6-9 months',
    difficulty: 'Intermediate',
    phases: [
      {
        name: 'Phase 1: Frontend Fundamentals',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Master HTML, CSS & JavaScript',
            duration: '4 weeks',
            skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design'],
            description: 'Build strong foundation in web technologies',
            resources: [
              { name: 'freeCodeCamp Responsive Web Design', type: 'Course', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', duration: '300 hours' },
              { name: 'JavaScript.info', type: 'Documentation', platform: 'javascript.info', url: 'https://javascript.info/', duration: 'Self-paced' },
              { name: 'CSS Tricks', type: 'Tutorial', platform: 'CSS-Tricks', url: 'https://css-tricks.com/', duration: 'Self-paced' }
            ],
            projects: ['Portfolio Website', 'Landing Page', 'Calculator App'],
            completed: false
          },
          {
            title: 'Learn React Framework',
            duration: '4 weeks',
            skills: ['React', 'JSX', 'Hooks', 'State Management', 'Component Design'],
            description: 'Master modern frontend framework',
            resources: [
              { name: 'React Official Docs', type: 'Documentation', platform: 'React', url: 'https://react.dev/', duration: 'Self-paced' },
              { name: 'React - The Complete Guide', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/course/react-the-complete-guide/', duration: '48 hours' }
            ],
            projects: ['Todo App', 'Weather App', 'E-commerce Product Page'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: Backend Development',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Master Node.js & Express',
            duration: '4 weeks',
            skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Middleware', 'Authentication'],
            description: 'Build server-side applications',
            resources: [
              { name: 'Node.js Complete Guide', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/course/nodejs-the-complete-guide/', duration: '40 hours' },
              { name: 'Express.js Documentation', type: 'Documentation', platform: 'Express', url: 'https://expressjs.com/', duration: 'Self-paced' }
            ],
            projects: ['REST API', 'Authentication System', 'Blog Backend'],
            completed: false
          },
          {
            title: 'Database Management',
            duration: '4 weeks',
            skills: ['MongoDB', 'PostgreSQL', 'Database Design', 'ORMs', 'SQL'],
            description: 'Learn database design and management',
            resources: [
              { name: 'MongoDB University', type: 'Course', platform: 'MongoDB', url: 'https://university.mongodb.com/', duration: 'Self-paced' },
              { name: 'PostgreSQL Tutorial', type: 'Tutorial', platform: 'PostgreSQL', url: 'https://www.postgresql.org/docs/', duration: 'Self-paced' }
            ],
            projects: ['Database Schema Design', 'CRUD Application', 'Data Migration Scripts'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Full-Stack Integration',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Build Complete Applications',
            duration: '6 weeks',
            skills: ['Full-Stack Architecture', 'State Management', 'API Integration', 'Deployment'],
            description: 'Integrate frontend and backend',
            resources: [
              { name: 'Full Stack Open', type: 'Course', platform: 'University of Helsinki', url: 'https://fullstackopen.com/', duration: '200 hours' }
            ],
            projects: ['Social Media Clone', 'E-commerce Platform', 'Real-time Chat App'],
            completed: false
          },
          {
            title: 'DevOps & Deployment',
            duration: '4 weeks',
            skills: ['Docker', 'CI/CD', 'AWS/Heroku', 'Git', 'Testing'],
            description: 'Deploy and maintain applications',
            resources: [
              { name: 'Docker Mastery', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/course/docker-mastery/', duration: '20 hours' },
              { name: 'GitHub Actions', type: 'Documentation', platform: 'GitHub', url: 'https://docs.github.com/actions', duration: 'Self-paced' }
            ],
            projects: ['Containerized App', 'CI/CD Pipeline', 'Production Deployment'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Core IT & Software',
    totalDuration: '4-6 months',
    difficulty: 'Beginner',
    phases: [
      {
        name: 'Phase 1: Web Fundamentals',
        duration: '4-6 weeks',
        milestones: [
          {
            title: 'HTML & CSS Mastery',
            duration: '3 weeks',
            skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design', 'Accessibility'],
            description: 'Master core web technologies',
            resources: [
              { name: 'HTML & CSS Course', type: 'Course', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', duration: '150 hours' },
              { name: 'MDN Web Docs', type: 'Documentation', platform: 'Mozilla', url: 'https://developer.mozilla.org/', duration: 'Self-paced' }
            ],
            projects: ['Personal Portfolio', 'Responsive Landing Page', 'CSS Art'],
            completed: false
          },
          {
            title: 'JavaScript Fundamentals',
            duration: '3 weeks',
            skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Events', 'Async Programming'],
            description: 'Learn JavaScript programming',
            resources: [
              { name: 'JavaScript Course', type: 'Course', platform: 'JavaScript.info', url: 'https://javascript.info/', duration: 'Self-paced' },
              { name: 'Eloquent JavaScript', type: 'Book', platform: 'Online', url: 'https://eloquentjavascript.net/', duration: 'Self-paced' }
            ],
            projects: ['Interactive Game', 'Form Validator', 'API Consumer'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: Modern Frameworks',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'React Development',
            duration: '6 weeks',
            skills: ['React', 'Hooks', 'Context API', 'React Router', 'Component Patterns'],
            description: 'Master React framework',
            resources: [
              { name: 'React Documentation', type: 'Documentation', platform: 'React', url: 'https://react.dev/', duration: 'Self-paced' },
              { name: 'React Complete Course', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/course/react-the-complete-guide/', duration: '48 hours' }
            ],
            projects: ['Movie Database App', 'E-commerce Frontend', 'Dashboard UI'],
            completed: false
          },
          {
            title: 'State Management & Advanced Patterns',
            duration: '2 weeks',
            skills: ['Redux', 'Context API', 'Custom Hooks', 'Performance Optimization'],
            description: 'Advanced React concepts',
            resources: [
              { name: 'Redux Documentation', type: 'Documentation', platform: 'Redux', url: 'https://redux.js.org/', duration: 'Self-paced' }
            ],
            projects: ['Redux Todo App', 'Global State Management'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Professional Frontend',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Build Tools & Testing',
            duration: '4 weeks',
            skills: ['Webpack', 'Vite', 'Jest', 'Testing Library', 'TypeScript'],
            description: 'Professional development tools',
            resources: [
              { name: 'TypeScript Handbook', type: 'Documentation', platform: 'TypeScript', url: 'https://www.typescriptlang.org/', duration: 'Self-paced' },
              { name: 'Testing JavaScript', type: 'Course', platform: 'Testing Library', url: 'https://testing-library.com/', duration: 'Self-paced' }
            ],
            projects: ['Typed React App', 'Test Suite for Project'],
            completed: false
          },
          {
            title: 'Performance & Deployment',
            duration: '4 weeks',
            skills: ['Performance Optimization', 'SEO', 'Accessibility', 'Deployment', 'PWA'],
            description: 'Optimize and deploy applications',
            resources: [
              { name: 'Web Performance', type: 'Documentation', platform: 'web.dev', url: 'https://web.dev/performance/', duration: 'Self-paced' }
            ],
            projects: ['Optimized Portfolio', 'PWA Application'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Core IT & Software',
    totalDuration: '5-7 months',
    difficulty: 'Intermediate',
    phases: [
      {
        name: 'Phase 1: Programming Fundamentals',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Choose & Master a Language',
            duration: '6 weeks',
            skills: ['Python/Node.js/Java', 'OOP', 'Data Structures', 'Algorithms'],
            description: 'Strong programming foundation',
            resources: [
              { name: 'Python for Everybody', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/specializations/python', duration: '64 hours' },
              { name: 'Node.js Guide', type: 'Documentation', platform: 'Node.js', url: 'https://nodejs.org/', duration: 'Self-paced' }
            ],
            projects: ['CLI Tool', 'File System Manager', 'Algorithm Implementations'],
            completed: false
          },
          {
            title: 'Database Fundamentals',
            duration: '2 weeks',
            skills: ['SQL', 'Database Design', 'Normalization', 'Queries'],
            description: 'Learn database concepts',
            resources: [
              { name: 'SQL Tutorial', type: 'Tutorial', platform: 'W3Schools', url: 'https://www.w3schools.com/sql/', duration: 'Self-paced' },
              { name: 'Database Design', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '20 hours' }
            ],
            projects: ['Database Schema', 'SQL Queries Practice'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: API Development',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'RESTful API Development',
            duration: '4 weeks',
            skills: ['REST', 'Express/Flask/Spring', 'HTTP', 'Middleware', 'Authentication'],
            description: 'Build robust APIs',
            resources: [
              { name: 'REST API Design', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '12 hours' },
              { name: 'Express.js Guide', type: 'Documentation', platform: 'Express', url: 'https://expressjs.com/', duration: 'Self-paced' }
            ],
            projects: ['CRUD API', 'User Authentication API', 'Blog API'],
            completed: false
          },
          {
            title: 'Advanced Backend Concepts',
            duration: '4 weeks',
            skills: ['GraphQL', 'WebSockets', 'Caching', 'Rate Limiting', 'Security'],
            description: 'Advanced API patterns',
            resources: [
              { name: 'GraphQL Tutorial', type: 'Tutorial', platform: 'GraphQL', url: 'https://graphql.org/learn/', duration: 'Self-paced' },
              { name: 'Web Security', type: 'Course', platform: 'OWASP', url: 'https://owasp.org/', duration: 'Self-paced' }
            ],
            projects: ['GraphQL API', 'Real-time Chat', 'Secured API'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Production-Ready Backend',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Databases & ORM',
            duration: '4 weeks',
            skills: ['PostgreSQL/MongoDB', 'Prisma/Sequelize/Mongoose', 'Migrations', 'Indexing'],
            description: 'Advanced database management',
            resources: [
              { name: 'PostgreSQL Course', type: 'Course', platform: 'PostgreSQL', url: 'https://www.postgresql.org/', duration: 'Self-paced' },
              { name: 'MongoDB University', type: 'Course', platform: 'MongoDB', url: 'https://university.mongodb.com/', duration: 'Self-paced' }
            ],
            projects: ['Complex Schema Design', 'Database Optimization'],
            completed: false
          },
          {
            title: 'Testing, Deployment & DevOps',
            duration: '6 weeks',
            skills: ['Unit Testing', 'Integration Testing', 'Docker', 'CI/CD', 'Monitoring'],
            description: 'Deploy production-ready systems',
            resources: [
              { name: 'Testing Best Practices', type: 'Tutorial', platform: 'Jest', url: 'https://jestjs.io/', duration: 'Self-paced' },
              { name: 'Docker Tutorial', type: 'Course', platform: 'Docker', url: 'https://www.docker.com/', duration: '20 hours' }
            ],
            projects: ['Test Suite', 'Dockerized Application', 'Production Deployment'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & AI',
    totalDuration: '8-12 months',
    difficulty: 'Advanced',
    phases: [
      {
        name: 'Phase 1: Programming & Math',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Python for Data Science',
            duration: '4 weeks',
            skills: ['Python', 'NumPy', 'Pandas', 'Jupyter', 'Data Manipulation'],
            description: 'Master Python for data analysis',
            resources: [
              { name: 'Python for Data Science', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '45 hours' },
              { name: 'Pandas Documentation', type: 'Documentation', platform: 'Pandas', url: 'https://pandas.pydata.org/', duration: 'Self-paced' }
            ],
            projects: ['Data Cleaning Pipeline', 'Exploratory Data Analysis'],
            completed: false
          },
          {
            title: 'Statistics & Mathematics',
            duration: '6 weeks',
            skills: ['Statistics', 'Probability', 'Linear Algebra', 'Calculus'],
            description: 'Build mathematical foundation',
            resources: [
              { name: 'Statistics for Data Science', type: 'Course', platform: 'Khan Academy', url: 'https://www.khanacademy.org/', duration: 'Self-paced' },
              { name: 'Linear Algebra', type: 'Course', platform: 'MIT OCW', url: 'https://ocw.mit.edu/', duration: 'Self-paced' }
            ],
            projects: ['Statistical Analysis', 'Hypothesis Testing'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: Machine Learning',
        duration: '10-12 weeks',
        milestones: [
          {
            title: 'ML Fundamentals',
            duration: '6 weeks',
            skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
            description: 'Core machine learning concepts',
            resources: [
              { name: 'Machine Learning by Andrew Ng', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/learn/machine-learning', duration: '60 hours' },
              { name: 'Scikit-learn Documentation', type: 'Documentation', platform: 'Scikit-learn', url: 'https://scikit-learn.org/', duration: 'Self-paced' }
            ],
            projects: ['Classification Model', 'Regression Model', 'Clustering Analysis'],
            completed: false
          },
          {
            title: 'Deep Learning',
            duration: '6 weeks',
            skills: ['Neural Networks', 'TensorFlow/PyTorch', 'CNNs', 'RNNs'],
            description: 'Advanced ML techniques',
            resources: [
              { name: 'Deep Learning Specialization', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '90 hours' },
              { name: 'PyTorch Tutorials', type: 'Tutorial', platform: 'PyTorch', url: 'https://pytorch.org/tutorials/', duration: 'Self-paced' }
            ],
            projects: ['Image Classification', 'Sentiment Analysis', 'Time Series Prediction'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Advanced DS & Deployment',
        duration: '10-12 weeks',
        milestones: [
          {
            title: 'Data Visualization & Communication',
            duration: '4 weeks',
            skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Storytelling', 'Dashboards'],
            description: 'Communicate insights effectively',
            resources: [
              { name: 'Data Visualization', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '30 hours' }
            ],
            projects: ['Interactive Dashboard', 'Data Story Presentation'],
            completed: false
          },
          {
            title: 'MLOps & Production',
            duration: '8 weeks',
            skills: ['Model Deployment', 'MLflow', 'Docker', 'APIs', 'Monitoring'],
            description: 'Deploy ML models to production',
            resources: [
              { name: 'MLOps Course', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '40 hours' }
            ],
            projects: ['Deployed ML Model', 'ML Pipeline', 'Model Monitoring System'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Cloud & DevOps',
    totalDuration: '6-8 months',
    difficulty: 'Intermediate',
    phases: [
      {
        name: 'Phase 1: Linux & Networking',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Linux System Administration',
            duration: '4 weeks',
            skills: ['Linux Commands', 'Shell Scripting', 'File Systems', 'Process Management'],
            description: 'Master Linux fundamentals',
            resources: [
              { name: 'Linux Fundamentals', type: 'Course', platform: 'Linux Academy', url: 'https://linuxacademy.com/', duration: '40 hours' },
              { name: 'Bash Scripting Guide', type: 'Tutorial', platform: 'Bash', url: 'https://www.gnu.org/software/bash/', duration: 'Self-paced' }
            ],
            projects: ['Automation Scripts', 'System Monitoring Tool'],
            completed: false
          },
          {
            title: 'Networking Basics',
            duration: '4 weeks',
            skills: ['TCP/IP', 'DNS', 'Load Balancers', 'Firewalls', 'HTTP/HTTPS'],
            description: 'Understand network fundamentals',
            resources: [
              { name: 'Networking Course', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '30 hours' }
            ],
            projects: ['Network Configuration', 'Firewall Rules'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: Containers & Orchestration',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Docker Mastery',
            duration: '4 weeks',
            skills: ['Docker', 'Containers', 'Images', 'Docker Compose', 'Volumes'],
            description: 'Containerize applications',
            resources: [
              { name: 'Docker Mastery', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/course/docker-mastery/', duration: '20 hours' },
              { name: 'Docker Documentation', type: 'Documentation', platform: 'Docker', url: 'https://docs.docker.com/', duration: 'Self-paced' }
            ],
            projects: ['Containerized App', 'Multi-container Setup'],
            completed: false
          },
          {
            title: 'Kubernetes',
            duration: '6 weeks',
            skills: ['Kubernetes', 'Pods', 'Services', 'Deployments', 'Helm'],
            description: 'Orchestrate containers at scale',
            resources: [
              { name: 'Kubernetes Course', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '25 hours' },
              { name: 'Kubernetes Documentation', type: 'Documentation', platform: 'Kubernetes', url: 'https://kubernetes.io/', duration: 'Self-paced' }
            ],
            projects: ['K8s Cluster Setup', 'Application Deployment on K8s'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: CI/CD & Cloud',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'CI/CD Pipelines',
            duration: '4 weeks',
            skills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Testing Automation'],
            description: 'Automate deployments',
            resources: [
              { name: 'CI/CD Tutorial', type: 'Tutorial', platform: 'GitHub', url: 'https://docs.github.com/actions', duration: 'Self-paced' }
            ],
            projects: ['CI/CD Pipeline', 'Automated Testing Pipeline'],
            completed: false
          },
          {
            title: 'Cloud Platforms & IaC',
            duration: '6 weeks',
            skills: ['AWS/Azure/GCP', 'Terraform', 'CloudFormation', 'Monitoring'],
            description: 'Infrastructure as Code',
            resources: [
              { name: 'AWS Solutions Architect', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '30 hours' },
              { name: 'Terraform Guide', type: 'Documentation', platform: 'Terraform', url: 'https://www.terraform.io/', duration: 'Self-paced' }
            ],
            projects: ['IaC Templates', 'Cloud Infrastructure Setup'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design & UX',
    totalDuration: '4-6 months',
    difficulty: 'Beginner',
    phases: [
      {
        name: 'Phase 1: Design Fundamentals',
        duration: '4-6 weeks',
        milestones: [
          {
            title: 'Design Principles',
            duration: '3 weeks',
            skills: ['Color Theory', 'Typography', 'Layout', 'Visual Hierarchy', 'Composition'],
            description: 'Learn core design concepts',
            resources: [
              { name: 'Design Fundamentals', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '30 hours' },
              { name: 'Refactoring UI', type: 'Book', platform: 'RefactoringUI', url: 'https://www.refactoringui.com/', duration: 'Self-paced' }
            ],
            projects: ['Logo Design', 'Poster Design', 'Brand Guidelines'],
            completed: false
          },
          {
            title: 'UX Research & Strategy',
            duration: '3 weeks',
            skills: ['User Research', 'Personas', 'User Journey Maps', 'Information Architecture'],
            description: 'Understand user needs',
            resources: [
              { name: 'UX Research Course', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '25 hours' }
            ],
            projects: ['User Research Report', 'Persona Creation', 'Journey Map'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: Design Tools & Prototyping',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Master Figma/Adobe XD',
            duration: '4 weeks',
            skills: ['Figma', 'Components', 'Auto Layout', 'Prototyping', 'Design Systems'],
            description: 'Professional design tools',
            resources: [
              { name: 'Figma Tutorial', type: 'Tutorial', platform: 'Figma', url: 'https://www.figma.com/resources/learn-design/', duration: 'Self-paced' },
              { name: 'Design Systems', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '15 hours' }
            ],
            projects: ['Mobile App Design', 'Web Dashboard', 'Design System'],
            completed: false
          },
          {
            title: 'Wireframing & Prototyping',
            duration: '4 weeks',
            skills: ['Wireframes', 'Low-fi Prototypes', 'High-fi Prototypes', 'Interactions', 'Micro-animations'],
            description: 'Create interactive prototypes',
            resources: [
              { name: 'Prototyping Course', type: 'Course', platform: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/', duration: '20 hours' }
            ],
            projects: ['App Prototype', 'Website Wireframes', 'Interactive Mockup'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Advanced UX & Portfolio',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Usability Testing & Iteration',
            duration: '4 weeks',
            skills: ['Usability Testing', 'A/B Testing', 'Analytics', 'Iteration', 'Accessibility'],
            description: 'Test and improve designs',
            resources: [
              { name: 'Usability Testing', type: 'Course', platform: 'Nielsen Norman Group', url: 'https://www.nngroup.com/', duration: 'Self-paced' }
            ],
            projects: ['Usability Test Plan', 'Accessibility Audit'],
            completed: false
          },
          {
            title: 'Portfolio Development',
            duration: '4 weeks',
            skills: ['Case Studies', 'Portfolio Design', 'Presentation', 'Storytelling'],
            description: 'Build professional portfolio',
            resources: [
              { name: 'UX Portfolio Guide', type: 'Tutorial', platform: 'Medium', url: 'https://medium.com/', duration: 'Self-paced' }
            ],
            projects: ['Complete Portfolio Website', '3-5 Case Studies'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Cybersecurity',
    totalDuration: '7-10 months',
    difficulty: 'Advanced',
    phases: [
      {
        name: 'Phase 1: IT & Networking Foundations',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'IT Fundamentals',
            duration: '4 weeks',
            skills: ['Operating Systems', 'Networking', 'Protocols', 'System Administration'],
            description: 'Build IT foundation',
            resources: [
              { name: 'CompTIA A+', type: 'Course', platform: 'CompTIA', url: 'https://www.comptia.org/', duration: '50 hours' },
              { name: 'Network+', type: 'Course', platform: 'CompTIA', url: 'https://www.comptia.org/', duration: '50 hours' }
            ],
            projects: ['Network Configuration', 'System Setup'],
            completed: false
          },
          {
            title: 'Security Fundamentals',
            duration: '4 weeks',
            skills: ['Cryptography', 'Security Concepts', 'Threats', 'Vulnerabilities'],
            description: 'Core security concepts',
            resources: [
              { name: 'Security+', type: 'Course', platform: 'CompTIA', url: 'https://www.comptia.org/', duration: '60 hours' }
            ],
            projects: ['Security Audit', 'Threat Analysis Report'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: Ethical Hacking & Pentesting',
        duration: '10-12 weeks',
        milestones: [
          {
            title: 'Ethical Hacking Basics',
            duration: '6 weeks',
            skills: ['Penetration Testing', 'Vulnerability Assessment', 'Reconnaissance', 'Exploitation'],
            description: 'Learn offensive security',
            resources: [
              { name: 'CEH Course', type: 'Course', platform: 'EC-Council', url: 'https://www.eccouncil.org/', duration: '80 hours' },
              { name: 'HackTheBox', type: 'Practice', platform: 'HackTheBox', url: 'https://www.hackthebox.com/', duration: 'Self-paced' }
            ],
            projects: ['Vulnerability Scan Report', 'Pentest Report'],
            completed: false
          },
          {
            title: 'Advanced Security Tools',
            duration: '6 weeks',
            skills: ['Metasploit', 'Burp Suite', 'Wireshark', 'Nmap', 'Security Frameworks'],
            description: 'Master security tools',
            resources: [
              { name: 'Practical Ethical Hacking', type: 'Course', platform: 'TCM Security', url: 'https://tcm-sec.com/', duration: '25 hours' }
            ],
            projects: ['Full Penetration Test', 'Security Tool Automation'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Incident Response & Compliance',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Incident Response',
            duration: '5 weeks',
            skills: ['Incident Handling', 'Forensics', 'Malware Analysis', 'SIEM'],
            description: 'Handle security incidents',
            resources: [
              { name: 'Incident Response', type: 'Course', platform: 'SANS', url: 'https://www.sans.org/', duration: '40 hours' }
            ],
            projects: ['Incident Response Plan', 'Forensics Analysis'],
            completed: false
          },
          {
            title: 'Compliance & Governance',
            duration: '5 weeks',
            skills: ['ISO 27001', 'GDPR', 'NIST', 'Risk Management', 'Security Policies'],
            description: 'Understand compliance',
            resources: [
              { name: 'CISSP Fundamentals', type: 'Course', platform: 'Cybrary', url: 'https://www.cybrary.it/', duration: '60 hours' }
            ],
            projects: ['Security Policy Document', 'Compliance Assessment'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer',
    category: 'Core IT & Software',
    totalDuration: '5-7 months',
    difficulty: 'Intermediate',
    phases: [
      {
        name: 'Phase 1: Mobile Fundamentals',
        duration: '4-6 weeks',
        milestones: [
          {
            title: 'Choose Platform & Language',
            duration: '6 weeks',
            skills: ['Swift/Kotlin or React Native/Flutter', 'Mobile UI Patterns', 'Platform Guidelines'],
            description: 'Learn mobile development basics',
            resources: [
              { name: 'Flutter Course', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '40 hours' },
              { name: 'React Native Documentation', type: 'Documentation', platform: 'React Native', url: 'https://reactnative.dev/', duration: 'Self-paced' },
              { name: 'iOS Development', type: 'Course', platform: 'Apple', url: 'https://developer.apple.com/', duration: 'Self-paced' }
            ],
            projects: ['Hello World App', 'Calculator App', 'Todo App'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: App Development',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Navigation & State Management',
            duration: '4 weeks',
            skills: ['Navigation', 'State Management', 'API Integration', 'Async Operations'],
            description: 'Build functional apps',
            resources: [
              { name: 'State Management Course', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '15 hours' }
            ],
            projects: ['Weather App', 'News Reader', 'Social Media Clone'],
            completed: false
          },
          {
            title: 'Native Features',
            duration: '6 weeks',
            skills: ['Camera', 'Location', 'Push Notifications', 'Local Storage', 'Device APIs'],
            description: 'Access native functionality',
            resources: [
              { name: 'Native Features Guide', type: 'Documentation', platform: 'Platform Docs', url: '#', duration: 'Self-paced' }
            ],
            projects: ['Photo App', 'Maps Integration', 'Notification System'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Advanced & Publishing',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Performance & Optimization',
            duration: '3 weeks',
            skills: ['Performance Optimization', 'Memory Management', 'Battery Optimization', 'App Size'],
            description: 'Optimize app performance',
            resources: [
              { name: 'Performance Best Practices', type: 'Tutorial', platform: 'Platform Docs', url: '#', duration: 'Self-paced' }
            ],
            projects: ['Optimized App', 'Performance Report'],
            completed: false
          },
          {
            title: 'Testing & Publishing',
            duration: '5 weeks',
            skills: ['Testing', 'App Store Guidelines', 'Publishing', 'Analytics', 'Monetization'],
            description: 'Launch your app',
            resources: [
              { name: 'App Store Publishing', type: 'Documentation', platform: 'Apple/Google', url: '#', duration: 'Self-paced' }
            ],
            projects: ['Published App', 'Test Suite', 'Analytics Setup'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Product & Strategy',
    totalDuration: '6-9 months',
    difficulty: 'Advanced',
    phases: [
      {
        name: 'Phase 1: Product Fundamentals',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Product Management Basics',
            duration: '4 weeks',
            skills: ['Product Lifecycle', 'User Stories', 'Roadmapping', 'Prioritization', 'Agile/Scrum'],
            description: 'Core PM concepts',
            resources: [
              { name: 'Product Management Course', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '40 hours' },
              { name: 'Inspired by Marty Cagan', type: 'Book', platform: 'Book', url: '#', duration: 'Self-paced' }
            ],
            projects: ['Product Roadmap', 'User Story Mapping'],
            completed: false
          },
          {
            title: 'User Research & Analytics',
            duration: '4 weeks',
            skills: ['User Research', 'Analytics', 'Data Analysis', 'Customer Interviews', 'Metrics'],
            description: 'Understand users and data',
            resources: [
              { name: 'Product Analytics', type: 'Course', platform: 'Reforge', url: 'https://www.reforge.com/', duration: '30 hours' }
            ],
            projects: ['User Research Report', 'Analytics Dashboard'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: Product Development',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Product Strategy',
            duration: '5 weeks',
            skills: ['Strategy', 'Market Analysis', 'Competitive Analysis', 'Product Vision', 'OKRs'],
            description: 'Define product strategy',
            resources: [
              { name: 'Product Strategy', type: 'Course', platform: 'Reforge', url: 'https://www.reforge.com/', duration: '35 hours' }
            ],
            projects: ['Product Strategy Doc', 'Competitive Analysis'],
            completed: false
          },
          {
            title: 'Execution & Delivery',
            duration: '5 weeks',
            skills: ['Sprint Planning', 'Backlog Management', 'Stakeholder Communication', 'Product Launch'],
            description: 'Execute and deliver',
            resources: [
              { name: 'Agile for PMs', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '20 hours' }
            ],
            projects: ['Sprint Plan', 'Product Launch Plan'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Advanced PM Skills',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Growth & Monetization',
            duration: '5 weeks',
            skills: ['Growth Strategies', 'A/B Testing', 'Monetization', 'Pricing', 'Retention'],
            description: 'Drive product growth',
            resources: [
              { name: 'Product-Led Growth', type: 'Course', platform: 'Reforge', url: 'https://www.reforge.com/', duration: '30 hours' }
            ],
            projects: ['Growth Experiment', 'Monetization Strategy'],
            completed: false
          },
          {
            title: 'Technical Understanding',
            duration: '5 weeks',
            skills: ['APIs', 'Database Basics', 'System Design', 'Technical Trade-offs'],
            description: 'Build technical knowledge',
            resources: [
              { name: 'PM Technical Skills', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '15 hours' }
            ],
            projects: ['Technical Requirement Doc', 'System Design Doc'],
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    category: 'Emerging Tech',
    totalDuration: '6-9 months',
    difficulty: 'Advanced',
    phases: [
      {
        name: 'Phase 1: Blockchain Fundamentals',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Blockchain Basics',
            duration: '4 weeks',
            skills: ['Blockchain Concepts', 'Cryptography', 'Consensus', 'Bitcoin', 'Ethereum'],
            description: 'Understand blockchain technology',
            resources: [
              { name: 'Blockchain Basics', type: 'Course', platform: 'Coursera', url: 'https://www.coursera.org/', duration: '30 hours' },
              { name: 'Mastering Bitcoin', type: 'Book', platform: 'Book', url: '#', duration: 'Self-paced' }
            ],
            projects: ['Simple Blockchain Implementation', 'Cryptocurrency Analysis'],
            completed: false
          },
          {
            title: 'Smart Contract Development',
            duration: '4 weeks',
            skills: ['Solidity', 'Smart Contracts', 'EVM', 'Truffle/Hardhat'],
            description: 'Write smart contracts',
            resources: [
              { name: 'Solidity Course', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '40 hours' },
              { name: 'Solidity Documentation', type: 'Documentation', platform: 'Solidity', url: 'https://docs.soliditylang.org/', duration: 'Self-paced' }
            ],
            projects: ['Token Contract', 'NFT Contract', 'Simple DeFi Protocol'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 2: DApp Development',
        duration: '8-10 weeks',
        milestones: [
          {
            title: 'Web3 Frontend',
            duration: '4 weeks',
            skills: ['Web3.js/Ethers.js', 'React', 'Wallet Integration', 'IPFS'],
            description: 'Build dApp frontends',
            resources: [
              { name: 'Web3 Development', type: 'Course', platform: 'Udemy', url: 'https://www.udemy.com/', duration: '25 hours' }
            ],
            projects: ['NFT Marketplace', 'DeFi Dashboard', 'DAO Interface'],
            completed: false
          },
          {
            title: 'Advanced Blockchain Concepts',
            duration: '6 weeks',
            skills: ['DeFi Protocols', 'DAOs', 'Layer 2', 'Cross-chain', 'Security'],
            description: 'Advanced blockchain development',
            resources: [
              { name: 'DeFi Course', type: 'Course', platform: 'Alchemy University', url: 'https://university.alchemy.com/', duration: '40 hours' }
            ],
            projects: ['DEX', 'Staking Protocol', 'Cross-chain Bridge'],
            completed: false
          }
        ]
      },
      {
        name: 'Phase 3: Production & Security',
        duration: '6-8 weeks',
        milestones: [
          {
            title: 'Smart Contract Security',
            duration: '4 weeks',
            skills: ['Security Auditing', 'Common Vulnerabilities', 'Testing', 'Best Practices'],
            description: 'Secure smart contracts',
            resources: [
              { name: 'Smart Contract Security', type: 'Course', platform: 'Secureum', url: 'https://secureum.substack.com/', duration: '30 hours' }
            ],
            projects: ['Security Audit', 'Test Suite', 'Bug Bounty'],
            completed: false
          },
          {
            title: 'Deployment & Maintenance',
            duration: '4 weeks',
            skills: ['Mainnet Deployment', 'Gas Optimization', 'Monitoring', 'Upgrades'],
            description: 'Deploy and maintain dApps',
            resources: [
              { name: 'Blockchain Deployment', type: 'Tutorial', platform: 'Alchemy', url: 'https://www.alchemy.com/', duration: 'Self-paced' }
            ],
            projects: ['Mainnet Deployment', 'Monitoring Dashboard'],
            completed: false
          }
        ]
      }
    ]
  }
];

// Quick roadmap templates for other careers
export const quickRoadmaps: { [key: string]: string[] } = {
  'software-engineer': ['Learn Programming Language', 'Master Data Structures & Algorithms', 'Build Projects', 'System Design', 'Interview Preparation'],
  'web-developer': ['HTML/CSS/JavaScript', 'Frontend Framework', 'Backend Basics', 'Databases', 'Deploy Projects'],
  'systems-engineer': ['Linux Administration', 'Networking', 'Scripting', 'Virtualization', 'Monitoring Tools'],
  'data-analyst': ['Excel & SQL', 'Python/R for Analysis', 'Data Visualization', 'Statistics', 'Business Intelligence Tools'],
  'ml-engineer': ['Python & Math', 'Machine Learning', 'Deep Learning', 'MLOps', 'Deploy Models'],
  'qa-engineer': ['Testing Fundamentals', 'Automation Tools', 'Programming Basics', 'CI/CD', 'Performance Testing'],
  'cloud-engineer': ['Linux & Networking', 'Cloud Platform (AWS/Azure/GCP)', 'Infrastructure as Code', 'Containers & K8s', 'Monitoring'],
  'ethical-hacker': ['IT Fundamentals', 'Networking & Security', 'Penetration Testing', 'Security Tools', 'Certifications (CEH/OSCP)'],
  'ui-designer': ['Design Principles', 'Design Tools (Figma)', 'User Research', 'Wireframing', 'Portfolio'],
  'ux-designer': ['UX Research', 'Information Architecture', 'Prototyping', 'Usability Testing', 'Portfolio'],
  'product-designer': ['Design Fundamentals', 'UX Research', 'UI Design', 'Prototyping', 'Portfolio'],
  'business-analyst': ['Business Fundamentals', 'Requirements Gathering', 'SQL & Excel', 'Data Analysis', 'Communication Skills'],
  'scrum-master': ['Agile Fundamentals', 'Scrum Framework', 'Facilitation Skills', 'CSM Certification', 'Team Coaching'],
  'seo-specialist': ['SEO Basics', 'Keyword Research', 'On-page SEO', 'Link Building', 'Analytics & Tools'],
  'technical-trainer': ['Subject Matter Expertise', 'Teaching Skills', 'Presentation', 'Curriculum Development', 'Training Tools'],
  'freelance-developer': ['Master Tech Stack', 'Build Portfolio', 'Client Communication', 'Business Skills', 'Marketing'],
  'tech-content-creator': ['Choose Niche', 'Content Creation', 'Video/Writing Skills', 'Social Media', 'Monetization']
};
