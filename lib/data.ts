export type ProjectPreview = "aps" | "self-survey" | "default";

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface JourneyItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  description?: string;
  highlights?: string[];
  projects?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tags: string[];
  highlight: boolean;
  featured?: boolean;
  year: string;
  role: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshots?: ProjectScreenshot[];
  frontend?: {
    stack: string[];
    modules: string[];
  };
  backend?: {
    stack: string[];
    modules: string[];
  };
  preview: ProjectPreview;
}

export const siteConfig = {
  name: "Sudhir Gomase",
  title: "Sudhir Gomase | Backend Developer",
  description:
    "Backend Developer building scalable APIs, microservices, and cloud-native systems — crafted with Node.js, Fastify, SQL, and AWS.",
  email: "sudhirgomase2109@gmail.com",
  phone: "+91 8108320614",
  location: "Mumbai, India",
  github: "https://github.com/SudhirGomase",
  linkedin: "https://linkedin.com/in/sudhir-gomase-95210b201",
  /** Curriculum vitae PDF */
  cv: "/Resume.pdf",
};

export const typingPhrases = [
  "Fastify APIs at scale",
  "Microservices on AWS",
  "SQL tuned to the millisecond",
  "Redis-backed performance",
];

/** Single source of truth for the skills marquee — no duplicates across groups */
export const techStackGroups = [
  {
    label: "Backend",
    items: ["Node.js", "Fastify", "TypeScript", "REST APIs", "Microservices", "JWT Auth"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "Redis", "Prisma", "Knex.js", "BullMQ"],
  },
  {
    label: "Cloud & Tools",
    items: ["AWS", "Docker", "Swagger", "Git", "CI/CD"],
  },
] as const;

export const aboutContent = {
  bio: "I'm a Backend Developer at WE-Matter in Mumbai, focused on building reliable APIs, microservices, and data-heavy platforms. I turn complex business logic into clean, scalable systems — from HR performance tools to enterprise survey analytics.",
  highlights: [
    { value: "2+ yrs", label: "Production backend experience" },
    { value: "3", label: "Enterprise platforms shipped" },
    { value: "30%", label: "Average API speed improvement" },
    { value: "Mumbai", label: "Based in India · Open to remote" },
  ],
};

export const professionalJourney: JourneyItem[] = [
  {
    id: "we-matter",
    period: "Jan 2024 – Present",
    title: "Software Developer",
    organization: "WE-Matter",
    location: "Mumbai, India",
    highlights: [
      "Architected scalable backend system using Node.js, Fastify, and SQL",
      "Improved API response time by 30% with Redis caching",
      "Reduced runtime errors by 35% through optimization",
      "Integrated enterprise HR systems including SAP SuccessFactors",
      "Containerized and deployed services using Docker on AWS",
    ],
    projects: [
      "Survey Management Portal",
      "Agile Performance System (APS)",
      "Analytics Dashboard Module",
    ],
  },
  {
    id: "tot-consulting",
    period: "Jun 2023 – Dec 2023",
    title: "Software Developer Intern",
    organization: "TheOther 2 Thirds Consulting LLP",
    location: "Mumbai, India",
    highlights: [
      "Developed backend functionality using PHP and SQL",
      "Optimized backend code reducing application load time by 20%",
      "Reduced production bugs by 20%",
      "Maintained 95% adherence to coding best practices",
    ],
    projects: ["Custom Self-Survey Application"],
  },
];

export const educationJourney: JourneyItem[] = [
  {
    id: "mca-spit",
    period: "2021 – 2023",
    title: "Master of Computer Applications (MCA)",
    organization: "Sardar Patel Institute of Technology (SPIT)",
    location: "Mumbai, India",
    highlights: [
      "Focus on software engineering, databases, and application development",
      "Coursework in data structures, DBMS, operating systems, and cloud concepts",
    ],
  },
  {
    id: "bsc-it",
    period: "2018 – 2021",
    title: "Bachelor of Science — Information Technology",
    organization: "Patkar College of Arts & Science · V.R. Varde College",
    location: "Mumbai, India",
    highlights: [
      "Foundation in programming, networking, and information systems",
      "Built early projects in web development and database-driven applications",
    ],
  },
];

export const pillars = [
  {
    number: "01",
    title: "Scalability",
    description:
      "Architected modular backend systems with 25% reduced complexity. Designed RESTful APIs improving system interoperability by 40%.",
    metric: 40,
    suffix: "%",
    label: "API Interoperability",
  },
  {
    number: "02",
    title: "Security",
    description:
      "Implemented RBAC and secure API endpoints across enterprise HR platforms. Built authentication layers for multi-tenant survey systems.",
    metric: 99,
    suffix: ".9%",
    label: "Uptime Target",
  },
  {
    number: "03",
    title: "Performance",
    description:
      "Improved API response times by 30% with Redis caching. Optimized SQL queries reducing runtime errors by 35%.",
    metric: 35,
    suffix: "%",
    label: "Error Reduction",
  },
  {
    number: "04",
    title: "AI Integration",
    description:
      "Integrated enterprise HR systems including SAP SuccessFactors. Built engagement scoring engines for AI-driven analytics dashboards.",
    metric: 30,
    suffix: "%",
    label: "Faster Response",
  },
];

export const projects: Project[] = [
  {
    id: "aps",
    title: "Agile Performance System (APS)",
    subtitle: "Enterprise performance management platform",
    description:
      "Full-stack performance management system for KPIs, goals, appraisals, and executive dashboards — serving CEO, CFO, CHRO, and operations leaders.",
    longDescription:
      "Built as part of WE-Matter's internal Agile Performance Management platform. APS connects goal tracking, employee appraisals, bell-curve rating, and role-based dashboards into a single multi-tenant system used across enterprise accounts.",
    tags: ["Enterprise HR", "Multi-tenant", "RBAC", "Executive dashboards"],
    highlight: true,
    featured: true,
    year: "Ongoing",
    role: "Backend Developer — WE-Matter",
    liveUrl: "https://aps.we-matter.com/login",
    preview: "aps",
    screenshots: [
      { src: "/projects/aps-login.png", caption: "Secure sign-in — User & Admin roles" },
      { src: "/projects/aps-overview.png", caption: "Employee overview — KPIs, goals & tasks" },
      { src: "/projects/aps-appraisal.png", caption: "My Appraisal — competencies, KPIs & bell curve" },
      { src: "/projects/aps-team-goals.png", caption: "Team goals & tasks management" },
    ],
    features: [
      "Goal & task management with templates and work logs",
      "Employee appraisal cycles with competencies & bell-curve",
      "RBAC with permission management & access control",
      "Executive dashboards — CEO, CFO, CHRO, Sales, Operations",
      "Org hierarchy, grades, departments & employee management",
      "Automated deadline reminders via BullMQ job queues",
      "Multi-account client admin with custom app design",
      "Swagger-documented REST APIs with JWT authentication",
    ],
    frontend: {
      stack: ["React", "TypeScript", "Redux Toolkit", "React Router"],
      modules: [
        "Goals & Appraisals UI",
        "Multi-dashboard client views",
        "Employee & role management",
        "Appraisal settings — ratings, questionnaires, bell-curve",
        "Sales & operations dashboard components",
      ],
    },
    backend: {
      stack: ["Node.js", "Fastify", "Prisma", "MySQL", "Redis", "BullMQ"],
      modules: [
        "GoalRoutes & AppraisalRoutes",
        "EmployeeHierarchy & OrganizationalUnit",
        "CEODashboard / CFODashboard / CHRODashboard",
        "SalesDashboard & OperationManufacturing",
        "NotificationRoutes & FeatureSettingRoutes",
        "Auth-service microservice (JWT)",
      ],
    },
  },
  {
    id: "self-survey",
    title: "Self-Survey Platform",
    subtitle: "Multi-tenant employee engagement survey system",
    description:
      "Enterprise survey platform supporting 360° feedback, kiosk mode, HRIS mapping, scorecards, and automated email scheduling — built on Fastify with React.",
    longDescription:
      "Evolved from a PHP-based survey tool into a modern Fastify + React platform. Handles survey creation, recipient mapping, multi-language support, analytics exports, and super-admin multi-company management.",
    tags: ["360° Feedback", "Kiosk mode", "HRIS mapping", "Multi-language"],
    highlight: true,
    featured: true,
    year: "Ongoing",
    role: "Backend Developer — WE-Matter",
    liveUrl: "https://admin.we-matter.com/",
    preview: "self-survey",
    screenshots: [
      { src: "/projects/self-survey-login.png", caption: "Survey portal login" },
      { src: "/projects/self-survey-company-detail.png", caption: "Company setup — modules & survey types" },
      { src: "/projects/self-survey-questions.png", caption: "Survey creation — question management" },
      { src: "/projects/self-survey-hris.png", caption: "HRIS data — employee upload & mapping" },
    ],
    features: [
      "360° survey module with custom question options",
      "Survey kiosk mode for on-site data collection",
      "HRIS data mapping & auto-mapping for recipients",
      "Scorecard settings with driver/theme mapping",
      "Automated email scheduler with cron jobs",
      "Multi-language support via Google Translate API",
      "PPT & Excel report generation (Puppeteer, pptxgenjs)",
      "Super-admin, admin & client role-based portals",
    ],
    frontend: {
      stack: ["React", "TypeScript", "Redux", "React Query", "SCSS"],
      modules: [
        "Survey creation wizard (multi-step)",
        "360° recipient & question management",
        "Scorecard & master mapping settings",
        "Super-admin company & survey editor",
        "Survey kiosk page & HRIS integration UI",
      ],
    },
    backend: {
      stack: ["Node.js", "Fastify", "Knex.js", "MySQL", "Redis", "BullMQ", "Bull Board"],
      modules: [
        "Survey service — 16K+ lines of business logic",
        "Account & user management APIs",
        "HRIS mapping & kiosk attribute services",
        "Email templates & SendGrid integration",
        "CSV/Excel export & statistics engine",
        "Job queue processing with BullMQ workers",
      ],
    },
  },
  {
    id: "analytics",
    title: "Analytics Dashboard Module",
    subtitle: "Employee engagement & survey analytics platform",
    description:
      "Full-stack analytics dashboard for survey insights — trend lines, predictive analysis, heat maps, open-ended NLP, and driver diagnostics with real-time engagement scoring.",
    longDescription:
      "Built as part of WE-Matter's survey analytics suite. Delivers executive-ready dashboards with multi-filter demographics, predictive performance & attrition models, diagnostic scatter plots, and exportable heat map reports — powered by optimized Knex.js queries.",
    tags: ["Engagement scoring", "Predictive analytics", "Heat maps", "NLP insights"],
    highlight: true,
    featured: true,
    year: "Ongoing",
    role: "Backend Developer — WE-Matter",
    liveUrl: "https://portal.we-matter.com/",
    preview: "default",
    screenshots: [
      { src: "/projects/analytics-login.png", caption: "Dashboard login — organization SSO" },
      { src: "/projects/analytics-trends.png", caption: "Trend line — performance, attrition & engagement" },
      { src: "/projects/analytics-predictive.png", caption: "Predictive & diagnostic analysis" },
      { src: "/projects/analytics-open-ended.png", caption: "Open-ended question — phrase cloud & comments" },
      { src: "/projects/analytics-heatmap.png", caption: "Heat map & driver analysis by department" },
    ],
    features: [
      "Trend line charts — performance, attrition & engagement over time",
      "Predictive analysis — performance distribution & attrition risk",
      "Diagnostic scatter plots with driver impact scoring",
      "Open-ended NLP — phrase cloud, sentiment & comment explorer",
      "Heat map with demographic filters & color-coded benchmarks",
      "Driver analysis with compare mode & benchmark overlays",
      "Multi-filter sidebar — department, gender, location & more",
      "Knex.js optimized queries for sub-second dashboard loads",
    ],
    frontend: {
      stack: ["React", "TypeScript", "Chart.js", "SCSS"],
      modules: [
        "Trend line & engagement KPI cards",
        "Donut charts & diagnostic quadrant plots",
        "Heat map table with delta/swap views",
        "Open-ended phrase cloud & comment panels",
      ],
    },
    backend: {
      stack: ["Node.js", "Fastify", "Knex.js", "MySQL", "Redis"],
      modules: [
        "Engagement scoring engine",
        "Predictive performance & attrition APIs",
        "Heat map & driver analysis endpoints",
        "Open-ended text aggregation & export",
      ],
    },
  },
];

export const personalProjects: Project[] = [
  {
    id: "secure-file-sharing",
    title: "Securing And Sharing Files",
    subtitle: "Encrypted file transfer & management web app",
    description:
      "Web application for secure file transfer — addressing hacking risks, transmission delays, and data corruption during sharing.",
    longDescription:
      "Built utilities for encryption, decryption, split & join (large files), and file comparison. Uses RSA public/private key cryptography so encrypted data stays protected even if intercepted in transit.",
    tags: ["RSA encryption", "File security", "Split & join", "Java web app"],
    highlight: false,
    featured: false,
    year: "Oct 2020 – Feb 2021",
    role: "Academic project",
    githubUrl: "https://github.com/SudhirGomase",
    preview: "default",
    features: [
      "Encrypt and decrypt text files with RSA algorithm",
      "Send secured files via registered email accounts",
      "Split and merge large text files for easier transfer",
      "Compare files to verify integrity after transfer",
      "JSP + Bootstrap UI on Apache Tomcat 7.0",
    ],
    frontend: {
      stack: ["JSP", "Bootstrap", "HTML"],
      modules: ["File upload & encryption UI", "Split / join workflows", "Email registration flow"],
    },
    backend: {
      stack: ["Java", "MySQL", "Apache Tomcat 7.0"],
      modules: ["RSA encryption engine", "File split & merge logic", "File comparison module"],
    },
  },
  {
    id: "blog-maker",
    title: "Blog Maker",
    subtitle: "Online blogging platform for personal & brand presence",
    description:
      "Platform for users to create blogs, share expertise, and build an online presence with personal stories and high-quality content.",
    longDescription:
      "Designed for individuals and businesses to publish articles, increase brand visibility, and build reader loyalty — supporting the shift from print journals to online publishing.",
    tags: ["Blogging", "Content platform", "Java EE", "MySQL"],
    highlight: false,
    featured: false,
    year: "Sep 2021 – Oct 2021",
    role: "Academic project",
    githubUrl: "https://github.com/SudhirGomase",
    preview: "default",
    features: [
      "Create and publish blog posts with rich content",
      "User accounts for authors and readers",
      "Bootstrap-based responsive front-end",
      "MySQL-backed content storage",
      "Deployed on GlassFish application server",
    ],
    frontend: {
      stack: ["HTML", "Bootstrap", "CSS"],
      modules: ["Blog editor & listing pages", "Author profile views", "Responsive layout"],
    },
    backend: {
      stack: ["Java", "MySQL", "GlassFish Server"],
      modules: ["Post & user management", "Authentication", "Content persistence layer"],
    },
  },
];

export const stats = {
  yearsExperience: 2,
  performanceImprovement: 30,
  errorReduction: 35,
};
