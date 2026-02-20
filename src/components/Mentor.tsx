import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Send, Bot, User, ArrowLeft, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ProfileData {
  name: string;
  technicalSkills: string;
  interests: string;
  careerGoals: string;
  degree?: string;
  experience?: string;
}

export function Mentor() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      navigate('/setup');
      return;
    }

    const profileData: ProfileData = JSON.parse(storedProfile);
    setProfile(profileData);

    // Natural welcome message
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: `Hey ${profileData.name}! 👋\n\nI'm so glad you're here. Think of me as your career buddy who's been around the tech block a few times. I've looked at your profile, and honestly? You've got some solid stuff going on.\n\nI'm here to chat about whatever's on your mind - whether that's "am I on the right path?", "what should I learn next?", or even "is this whole tech thing for me?" No judgment, just real talk.\n\nSo... what's up? What's been on your mind lately?`,
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Smart response generator with natural conversation
  const generateNaturalResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    const userName = profile?.name || 'there';
    const skills = profile?.technicalSkills?.split(',').map(s => s.trim()) || [];
    const mainSkills = skills.slice(0, 3).join(', ');
    
    // Add context tracking
    const lastContext = conversationContext[conversationContext.length - 1] || '';

    // Greeting responses
    if (lower.match(/^(hi|hello|hey|sup|wassup|yo)/)) {
      const greetings = [
        `Hey! Good to hear from you. What's on your mind?`,
        `Hi ${userName}! What can I help you with today?`,
        `Hey there! Ready to talk about your career? What's up?`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Gratitude responses
    if (lower.match(/(thank|thanks|thx|appreciate)/)) {
      const thanks = [
        `You're so welcome! Anytime you need to chat, I'm here. 😊`,
        `Of course! That's what I'm here for. Any other questions?`,
        `Happy to help! Feel free to ask me anything else.`,
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }

    // Feeling overwhelmed/confused/stressed
    if (lower.match(/(overwhelm|confus|lost|stuck|stress|anxious|scared|worry|don't know)/)) {
      return `Hey, I totally get it ${userName}. The tech world can feel like drinking from a firehose sometimes, right?\n\nHere's the thing though - every single developer you admire felt exactly like this at some point. Even the ones making six figures at Google started somewhere, feeling just as confused.\n\nLet me ask you this: what's the ONE thing stressing you out the most right now? Is it picking the right path? Keeping up with all the tech? Landing that first job? Let's tackle it together, one step at a time.`;
    }

    // Career path questions
    if (lower.match(/(career path|which career|what path|which field|what should i do|which direction|career choice)/)) {
      return `Okay, so you're thinking about career paths. Smart move to figure this out early!\n\nLooking at your skills in ${mainSkills}, honestly, you've got options. But here's what I'd say - don't just pick what pays the most or what's "hot" right now. Think about what you actually enjoy doing.\n\nDo you light up when you're making things look beautiful? Frontend might be your jam. Love solving logical puzzles and making systems work? Backend could be perfect. Want the whole picture? Full stack is calling.\n\nWhat gets YOU excited? When you're working on stuff, what part makes you lose track of time?`;
    }

    // Learning/study questions
    if (lower.match(/(how to learn|where to start|study|learn|roadmap|begin|starting out)/)) {
      return `Alright, so you wanna know where to start. Love the initiative!\n\nHere's my honest take: forget about learning 50 technologies. Start with the fundamentals - HTML, CSS, JavaScript - and actually build stuff. Not tutorial hell stuff, I mean YOUR ideas.\n\nThink of something you'd actually use. A workout tracker? A recipe app? A game? Build it. Break it. Fix it. That's how you really learn.\n\nOnce you're comfortable there (like 2-3 months), pick ONE framework - React's a safe bet in 2026 - and rebuild your project with it. See the difference? That's real learning.\n\nWhat interests you enough that you'd want to build something around it?`;
    }

    // React/Framework questions
    if (lower.match(/(react|angular|vue|framework|frontend framework)/)) {
      const framework = lower.includes('angular') ? 'Angular' : lower.includes('vue') ? 'Vue' : 'React';
      return `Ah, ${framework}! Good choice to think about.\n\n${framework === 'React' ? "React's huge right now - probably the safest bet for job hunting. Plus, once you know React, Next.js is right there waiting, which is basically React with superpowers." : framework === 'Angular' ? "Angular's solid, especially for enterprise jobs. It's more opinionated than React, which honestly can be nice - less decision fatigue." : "Vue is beautiful, seriously. It's like they took the best parts of React and Angular and made it actually enjoyable to write."}\n\nBut here's the real talk - the framework matters less than you think. Once you understand one, picking up others isn't that hard. They're all just different ways to do the same thing.\n\nHave you built anything with vanilla JavaScript yet? That's honestly more important than jumping into frameworks.`;
    }

    // Backend questions
    if (lower.match(/(backend|server|api|database|node|python backend|django|express)/)) {
      return `Backend, nice! That's where the real magic happens if you ask me.\n\nSo here's the deal - if you already know JavaScript, Node.js is the path of least resistance. Express is dead simple to start with. But if you're into Python, Django or Flask are solid choices too.\n\nThe key things to wrap your head around:\n- REST APIs (how frontend and backend talk)\n- Databases (SQL first - PostgreSQL is my go-to)\n- Authentication (JWT, sessions, all that)\n- Deployment (Heroku for learning, AWS later)\n\nStart with a simple CRUD app. Like a blog or todo list with a database. Boring? Maybe. But you'll learn 80% of what you need.\n\nWhat are you more comfortable with - JavaScript or Python?`;
    }

    // Projects questions
    if (lower.match(/(project|portfolio|build|what to make|ideas)/)) {
      return `Projects! Now we're talking. This is honestly more valuable than any course.\n\nLook, don't build another todo app or weather app unless you're just starting out. Build something that solves a problem YOU have. What annoys you? What do you wish existed?\n\nSome ideas based on your skills:\n${skills.some(s => s.toLowerCase().includes('react')) ? '- A habit tracker with streak counts and data visualization\n' : ''}${skills.some(s => s.toLowerCase().includes('python')) ? '- A web scraper that finds job postings from multiple sites\n' : ''}- A personal finance tracker that actually makes sense\n- A study group organizer for your college\n- A portfolio site that stands out (not a template!)\n\nThe best project is one you'll actually finish. What's a problem you deal with regularly that tech could solve?`;
    }

    // Interview/Job questions  
    if (lower.match(/(interview|job|apply|resume|hire|recruiter|offer|salary|get hired)/)) {
      return `Job hunt time! This is where things get real, I know.\n\nHonestly ${userName}, the job search is a numbers game mixed with smart strategy. Here's what actually works:\n\n**For your resume:** Show, don't tell. Instead of "Proficient in React" say "Built a real-time chat app with React serving 100+ users." See the difference?\n\n**For applications:** Quality > quantity. 10 personalized applications beat 100 generic ones. Research the company, mention something specific in your cover letter.\n\n**For interviews:** Practice out loud. Seriously, talk to yourself in the mirror. It feels weird but it works. And for coding interviews? LeetCode medium problems, 2 a day.\n\n${lower.includes('salary') ? `\nOn salary - don't sell yourself short, but be realistic. For freshers in India, ₹4-6 LPA is typical at good companies, ₹8-15 LPA at top tier. Always negotiate though!` : ''}\n\nWhat part of the job search stresses you out most?`;
    }

    // Salary specific
    if (lower.match(/(salary|pay|money|compensation|package|ctc|lpa)/)) {
      return `Alright, let's talk money. Real numbers, no BS.\n\nFor freshers in India right now:\n- Service companies (TCS, Infosys): ₹3-4 LPA\n- Good product companies: ₹6-12 LPA\n- Top tier (Microsoft, Google, Amazon): ₹15-25 LPA\n- Hot startups: ₹8-15 LPA (sometimes with equity)\n\nIn the US, entry level is typically $60-90k, which sounds amazing until you factor in the cost of living.\n\nHere's what actually matters though: your first salary isn't your forever salary. If you're learning and growing, you can jump 50-100% in 2-3 years. I've seen it happen over and over.\n\nFocus on getting into a place where you'll learn a ton. The money follows skills, I promise. What's your target?`;
    }

    // Skills/Technologies
    if (lower.match(/(should i learn|what technology|which skill|what to study next|learn next)/)) {
      return `Okay so you want to know what's worth learning. Let me be real with you.\n\nThe fundamentals never go out of style: JavaScript, Git, how the internet works, data structures, SQL. Master these and you're golden.\n\nFor specific tech in 2026:\n- TypeScript (just better JavaScript)\n- React/Next.js (frontend standard)\n- Node.js or Python (backend basics)\n- PostgreSQL (database you should know)\n- Docker (eventually, not urgent)\n- AWS basics (cloud isn't optional anymore)\n\nBut honestly? Don't chase every shiny framework. Get GOOD at one stack, then expand. I'd rather hire someone who's a React expert than someone who's touched 10 frameworks.\n\nBased on your current skills (${mainSkills}), what direction interests you?`;
    }

    // Specific tech: TypeScript
    if (lower.match(/typescript|ts/)) {
      return `TypeScript! Good thinking - it's basically JavaScript's cooler sibling.\n\nHere's why it's worth learning: catching bugs before your code even runs is amazing. Plus, more and more companies are using it, especially the ones with better engineering cultures.\n\nThe learning curve isn't bad if you already know JavaScript. Give yourself a week of TypeScript and you'll wonder how you lived without it. The VS Code autocomplete alone is worth it.\n\nStart with your next project in TS. Trust me, after the initial "ugh, types" phase, you'll be hooked. Have you worked with JavaScript much yet?`;
    }

    // Specific tech: Git
    if (lower.match(/git|github|version control/)) {
      return `Git! Yes! This is one of those unsexy skills that'll save your butt constantly.\n\nYou don't need to be a Git wizard, but know these:\n- clone, add, commit, push (the basics)\n- branches (feature branches are your friend)\n- pull requests (how teams actually work)\n- merge conflicts (they happen, don't panic)\n\nGitHub is your portfolio now. Recruiters will check it. So make it look alive - consistent commits, good READMEs, organized repos.\n\nHave you pushed any projects to GitHub yet? That's honestly the best way to learn.`;
    }

    // Imposter syndrome
    if (lower.match(/(imposter|not good enough|doubt|fake|don't belong|not smart|can't code)/)) {
      return `Whoa, okay. Let me stop you right there, ${userName}.\n\nThat voice telling you you're not good enough? It's lying. You know how I know? Because you're here, asking questions, trying to improve. That's literally what makes a good developer.\n\nI've worked with developers at top companies who still Google basic syntax. Everyone feels like an imposter sometimes. The difference between them and people who give up? They keep going anyway.\n\nYou don't need to know everything. You need to know how to figure things out. And clearly, you do - you're talking to me, right?\n\nWhat specifically made you feel this way? Let's talk about it.`;
    }

    // Time management / Balancing
    if (lower.match(/(time|balance|manage|busy|college|studies)/)) {
      return `Ah, the eternal struggle - balancing everything. I feel you.\n\nHere's what actually works: consistency beats intensity. 1-2 hours every day is way better than 10 hours on Sunday. Your brain needs time to process stuff anyway.\n\nMy suggestion? Find your dead time. Commute? Listen to tech podcasts. Waiting between classes? Read documentation. Before bed? Watch a 20-minute tutorial.\n\nAnd honestly, don't try to do everything. Pick ONE thing to learn, ONE project to build. Finish it. Then move on. Jack of all trades, master of none isn't a flex in tech.\n\nWhat's eating up most of your time right now?`;
    }

    // Networking/Community
    if (lower.match(/(network|community|connect|linkedin|twitter|friends)/)) {
      return `Networking! This is so underrated, honestly.\n\nYour network literally becomes your net worth in tech. Not even kidding. My last three jobs came from people I knew, not applications.\n\nHere's how to do it without being weird:\n- LinkedIn: Post about what you're learning, engage with others\n- Twitter: Follow devs you admire, share your work\n- Discord/Slack communities: Help others, ask questions\n- Local meetups: Scary but worth it\n\nDon't just collect connections. Actually engage. Comment on posts. Share useful stuff. Help people.\n\nAre you active on any platforms? If not, LinkedIn is the easiest place to start.`;
    }

    // Freelancing
    if (lower.match(/(freelanc|client|upwork|fiverr|side hustle|earn money)/)) {
      return `Freelancing! This can be a great way to earn while you learn.\n\nReal talk though - it's harder than it looks. Finding clients, managing expectations, dealing with scope creep... it's a whole skillset. But it's doable.\n\nIf you're starting out:\n- Build a simple portfolio site\n- Start with small projects (₹5-10k range)\n- Under-promise, over-deliver\n- Document everything in writing\n- Get testimonials\n\nUpwork and Fiverr are saturated now, so you need to stand out. Specialized skills help - "React developer" vs just "web developer."\n\nOr find local businesses - they need websites and don't know where to start. What services could you realistically offer right now?`;
    }

    // Open source
    if (lower.match(/(open source|contribute|github contrib|oss)/)) {
      return `Open source! This is such a smart move for your career.\n\nContributing to open source basically proves you can work in a real codebase, collaborate with others, and write production-level code. Plus, it's on your GitHub forever.\n\nHow to start:\n1. Find a project you actually USE\n2. Look for "good first issue" labels\n3. Start with docs or tiny bug fixes\n4. Read the contribution guidelines carefully\n5. Don't be scared of rejection - it's normal\n\nSome beginner-friendly projects: freeCodeCamp, first-contributions, up-for-grabs. Or find any project you like and fix a typo in the docs - seriously, that counts!\n\nHave you found any projects you're interested in contributing to?`;
    }

    // College/Degree relevance
    if (lower.match(/(college|degree|cs degree|education|university|academic)/)) {
      return `The college question. Okay, honest answer:\n\nDoes it matter? Less than you think, more than some people claim. A CS degree opens doors easier, especially at big companies. But plenty of successful devs are self-taught.\n\nWhat matters MORE than the degree:\n- Your portfolio of real projects\n- Your ability to solve problems\n- How you communicate and learn\n- Contributions to open source\n\n${profile?.degree ? `You're doing ${profile.degree}, which is solid. Make the most of it - do internships, build projects, network with professors and seniors.` : ''}\n\nThe degree gets you past HR filters. Your skills get you the job. Focus on both. Are you currently in college or thinking about going?`;
    }

    // Mentorship
    if (lower.match(/(mentor|guidance|advice|help me|stuck)/)) {
      return `Hey, that's literally what I'm here for! And honestly, asking for help is a strength, not a weakness.\n\nMentorship can be formal or informal. Some ideas:\n- Find senior devs on LinkedIn and ask for 15-min coffee chats\n- Join Discord communities in your tech stack\n- Attend local meetups (scary, I know, but worth it)\n- Follow dev bloggers and engage with their content\n- Reddit communities like r/webdev are helpful\n\nBest mentorship happens when you're specific. "How do I become a developer?" is hard to answer. "I built X but I'm stuck on Y" gets you real help.\n\nWhat specific area do you need guidance on right now? Let's dig into it.`;
    }

    // About me/Who are you
    if (lower.match(/(who are you|what are you|about you|your experience)/)) {
      return `Ha, good question! I'm basically a career mentor built to help folks like you navigate the tech world.\n\nThink of me as that friend who's been in tech for a while and genuinely wants to see you succeed. No corporate BS, no selling courses, just real advice.\n\nI'm here to:\n- Help you figure out your path\n- Give you honest feedback\n- Break down complex topics\n- Be your sounding board\n- Keep you motivated when it gets tough\n\nI remember what it was like starting out - everything's confusing and everyone seems to know more than you. Spoiler: they don't, they just got better at faking it 😄\n\nNow, enough about me. What do YOU want to work on?`;
    }

    // Can't find a job / Rejection
    if (lower.match(/(can't find job|no job|rejection|not getting|failed interview|didn't get)/)) {
      return `Oof, rejection hurts. I'm sorry you're going through this ${userName}.\n\nBut here's the thing - job hunting, especially your first tech job, is BRUTAL. The average person applies to 100+ places. Those are real numbers. So if you've got rejections, you're literally just doing what everyone else does.\n\nLet me ask you:\n- How many places have you applied? (If less than 50, keep going)\n- Is your portfolio live and looking good?\n- Are you applying to the right level? (Don't aim for Senior roles)\n- Is your resume ATS-friendly? (no fancy designs, use keywords)\n\nEach rejection is data. What went wrong? Fix it. Apply again. I know it's exhausting, but this is temporary. You WILL land something.\n\nWant to talk about what's been happening in your interviews?`;
    }

    // Remote work
    if (lower.match(/(remote|work from home|wfh)/)) {
      return `Remote work! It's pretty much the norm now in tech, which is awesome.\n\nFor landing remote jobs:\n- Highlight any remote experience (even college projects)\n- Emphasize communication skills\n- Show you can work independently\n- Time zone matters - mention flexibility\n\nSites to check:\n- RemoteOK\n- We Work Remotely\n- AngelList (filter for remote)\n- Even LinkedIn has remote filters now\n\nOne heads up though - remote can be lonely. You need discipline and you need to actively communicate. But if you're self-motivated? It's the dream.\n\nAre you specifically looking for remote opportunities?`;
    }

    // Data structures & Algorithms
    if (lower.match(/(dsa|data structure|algorithm|leetcode|coding problem)/)) {
      return `DSA - the necessary evil of tech interviews, right?\n\nLook, I'll be honest. Most of your job won't be solving binary tree problems. But will you need to pass DSA interviews? Yeah, probably.\n\nThe good news: you don't need to be a competitive programmer. You need to be comfortable with:\n- Arrays, Strings (most common)\n- Hash Maps (your best friend)\n- Linked Lists, Stacks, Queues (basics)\n- Trees (especially Binary Trees)\n- Basic sorting, searching\n- Some common patterns (two pointers, sliding window)\n\nDo 2-3 problems a day. LeetCode Easy/Medium. Don't just solve - understand WHY that solution works.\n\nAnd honestly? Practice explaining your thought process out loud. That's what kills most people in interviews, not the actual coding.\n\nWhere are you at with DSA right now?`;
    }

    // Bootcamp questions
    if (lower.match(/(bootcamp|course|udemy|coursera|paid course)/)) {
      return `Bootcamps and courses - let's talk about it.\n\nHere's my take: they CAN be worth it, but they're not magic. I've seen self-taught devs outperform bootcamp grads, and vice versa. It's really about what YOU put in.\n\nPros:\n- Structured curriculum\n- Accountability\n- Networking with cohort\n- Some have job placement help\n\nCons:\n- Expensive (₹50k-2L+ for good ones)\n- Fast-paced (can be overwhelming)\n- No guaranteed job\n\nIf you're disciplined, you can learn everything free online - freeCodeCamp, The Odin Project, YouTube. For paid, Udemy courses (when on sale) are like ₹500 and honestly great value.\n\nDon't pay for a course thinking it'll get you a job. Pay for it if you need structure and accountability. Are you considering a specific bootcamp?`;
    }

    // Age concerns
    if (lower.match(/(too old|too late|age|start late|25|26|27|28|29|30)/)) {
      return `Too old? Are you serious right now? ${userName}, that's not a thing.\n\nI've seen people switch to tech at 35, 40, even 50. You know what they all had? Determination and a willingness to learn. That's it.\n\nActually, being older often helps:\n- Better discipline and work ethic\n- Clearer career goals\n- Real-world problem-solving experience\n- Better communication skills\n\nTech moves fast, yeah. But that means experience from 5 years ago is often outdated anyway. Everyone's constantly learning. You're not behind - you're just getting started.\n\nThe best time to start was yesterday. The second best time? Right now. What's holding you back besides the age thing?`;
    }

    // Comparison with others
    if (lower.match(/(others are better|everyone else|compare|behind|peers|classmates)/)) {
      return `Okay, stop comparing yourself to others. Seriously, it's the fastest way to kill your motivation.\n\nYou're seeing everyone else's highlights, not their struggles. That person who "just landed a Google internship"? They probably failed 20 interviews you didn't see. That "genius" in your class? They've been coding since age 12.\n\nYou're on YOUR timeline. The only person you should compare yourself to is who you were yesterday.\n\nHere's what to do instead:\n- Track YOUR progress (journal it)\n- Celebrate YOUR wins, even small ones\n- Learn from others, don't compare to them\n- Focus on YOUR goals, not theirs\n\nYou've got skills in ${mainSkills}. That's YOUR foundation. Build on it at YOUR pace. What progress have YOU made recently that you're proud of?`;
    }

    // General encouragement/motivation
    if (lower.match(/(motivat|inspir|encourag|give up|quit)/)) {
      return `Hey ${userName}, I'm really glad you reached out.\n\nLook, the fact that you're here, asking questions, trying to grow - that already puts you ahead. Most people don't even try.\n\nSome real talk: this journey isn't a straight line. You'll have days where everything clicks and days where you feel like you don't know anything. That's NORMAL. Every single developer goes through it.\n\nWhat keeps people going?\n- Celebrating small wins (finished a tutorial? That's a win!)\n- Taking breaks (seriously, rest matters)\n- Connecting with other learners (you're not alone)\n- Remembering why you started\n\nYou've already got skills in ${mainSkills}. That's not nothing. You're not starting from zero.\n\nWhat made you interested in tech in the first place? Let's reconnect with that.`;
    }

    // Context-aware follow-ups
    if (lastContext === 'career_path') {
      return `So, thinking more about the career path discussion we had?\n\nRemember, there's no wrong choice here. Frontend, backend, full stack - they all lead to great careers. The key is picking one and getting good at it.\n\nWhat specific area are you leaning towards? Or are you still deciding?`;
    }

    // Default conversational responses
    const defaultResponses = [
      `That's an interesting question! Could you tell me more about what you're trying to figure out?\n\nI can help with:\n- Career paths and what to learn\n- Building your portfolio\n- Job search strategies\n- Interview prep\n- Overcoming challenges\n- General tech advice\n\nWhat's specifically on your mind?`,
      
      `Hmm, I want to make sure I understand what you're asking. Could you rephrase that?\n\nMeanwhile, based on your profile (skills in ${mainSkills}), here's something I've been thinking - have you considered building a project that combines those skills? That's usually the best next step.\n\nWhat are you working on right now?`,
      
      `I'm not quite sure what you mean, but I'm here to help! Let me ask you this:\n\nWhat's your biggest challenge right now? Is it:\n- Figuring out what to learn?\n- Building a portfolio?\n- Getting interviews?\n- Technical concepts?\n- Staying motivated?\n\nTell me what's actually keeping you up at night, and let's tackle it.`,
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate natural typing delay
    const typingDelay = Math.min(1000 + currentInput.length * 20, 3000);
    
    setTimeout(() => {
      const response = generateNaturalResponse(currentInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);

      // Update context for follow-ups
      if (currentInput.toLowerCase().includes('career path')) {
        setConversationContext(prev => [...prev, 'career_path']);
      }
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'What career path should I choose?',
    'How do I prepare for interviews?',
    'What projects should I build?',
    'I feel overwhelmed, help!',
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-5xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-lg p-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900 dark:text-white">AI Career Mentor</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Always here to help
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-in slide-in-from-bottom duration-300 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-2xl p-4 rounded-2xl transition-all hover:scale-[1.01] ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-600 dark:to-indigo-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg border border-gray-100 dark:border-gray-700'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === 'user'
                      ? 'text-indigo-200 dark:text-indigo-300'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-in slide-in-from-bottom">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex gap-1.5">
                  <div
                    className="w-2.5 h-2.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms', animationDuration: '1s' }}
                  />
                  <div
                    className="w-2.5 h-2.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: '200ms', animationDuration: '1s' }}
                  />
                  <div
                    className="w-2.5 h-2.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: '400ms', animationDuration: '1s' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
                >
                  {question}
                </button>
              ))}\n            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 transition-colors shadow-lg">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about your career..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none transition-all"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-600 dark:to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            💡 Real career advice from someone who's been there. No API needed, always available!
          </p>
        </div>
      </div>
    </div>
  );
}
