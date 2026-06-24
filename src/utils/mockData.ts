// ==========================================
// PORTFOLIO DATA — K. Guru Charan
// ==========================================

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  github: string;
  demo: string;
  gradient: string;
  icon: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  icon: string;
}

export const PROFILE = {
  name: "K. Guru Charan",
  title: "AI/ML Engineer",
  subtitle: "Data Analytics Enthusiast",
  tagline:
    "Building intelligent systems using Machine Learning, Data Analytics, Computer Vision, and AI-powered solutions.",
  cgpa: "9.22",
  specialization: "AI & Machine Learning",
  degree: "B.Tech (Final Year)",
  email: "guruc3388@gmail.com",
  linkedin: "https://linkedin.com/in/kgurucharan",
  github: "https://github.com/guruc267",
  resume: "/resume.pdf",
};

export const PROJECTS: Project[] = [
  {
    id: "crop-monitoring",
    title: "Crop Monitoring Using Satellite Imagery",
    tagline: "Precision Agriculture with AI",
    description:
      "Developed an AI-driven crop health monitoring system leveraging satellite imagery and NDVI analysis.",
    techStack: ["Python", "Random Forest", "NDVI", "Satellite Imagery", "OpenCV"],
    metrics: [
      { label: "Accuracy", value: "94.2%" },
      { label: "Data Points", value: "5,000+" },
      { label: "Algorithm", value: "Random Forest" },
      { label: "Data Source", value: "Sentinel-2" },
    ],
    github: "https://github.com/guruc267/Crop-Monitoring-using-Satellite-Imagery",
    demo: "#",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    icon: "🛰️",
  },
  {
    id: "gdp360",
    title: "GDP360 Analytics Dashboard",
    tagline: "Interactive Economic Intelligence",
    description:
      "Designed and built an interactive GDP analytics dashboard integrating SQL, Alteryx ETL, and Power BI.",
    techStack: ["SQL", "Alteryx", "Power BI", "ETL", "Data Modeling"],
    metrics: [
      { label: "Countries", value: "195" },
      { label: "Data Points", value: "50K+" },
      { label: "Pipeline", value: "Alteryx ETL" },
      { label: "Visualization", value: "Power BI" },
    ],
    github: "https://github.com/guruc267/GDP-Trend-and-Growth-Spike-Detector",
    demo: "#",
    gradient: "from-blue-500/20 to-purple-500/20",
    icon: "📊",
  },
  {
    id: "ginger-detection",
    title: "Ginger Adulteration Detection",
    tagline: "Computer Vision for Food Safety",
    description:
      "Built a computer vision system to detect adulteration in ginger samples using image processing and SVM.",
    techStack: ["Python", "OpenCV", "Scikit-Learn", "Image Processing", "SVM"],
    metrics: [
      { label: "Accuracy", value: "91.5%" },
      { label: "Samples", value: "1,200+" },
      { label: "Technique", value: "Computer Vision" },
      { label: "Classifier", value: "SVM" },
    ],
    github: "https://github.com/guruc267/Fake-Image-Detection",
    demo: "#",
    gradient: "from-orange-500/20 to-yellow-500/20",
    icon: "🔬",
  },
  {
    id: "blinkit-analytics",
    title: "Blinkit Grocery Sales Prediction",
    tagline: "Predictive Analytics for Retail",
    description:
      "Developed ML models to predict grocery sales comparing XGBoost and Random Forest regressors.",
    techStack: ["Python", "XGBoost", "Random Forest", "Pandas", "NumPy"],
    metrics: [
      { label: "XGBoost R²", value: "0.738" },
      { label: "RF R²", value: "0.503" },
      { label: "Features", value: "12" },
      { label: "Dataset", value: "8,500+ rows" },
    ],
    github: "https://github.com/guruc267/Customer-Churn-Prediction",
    demo: "#",
    gradient: "from-yellow-500/20 to-green-500/20",
    icon: "🛒",
  },
  {
    id: "chitti-ai",
    title: "Chitti AI Chatbot",
    tagline: "Conversational AI Assistant",
    description:
      "Created an intelligent chatbot with NLP capabilities for automated query resolution.",
    techStack: ["Python", "NLP", "TF-IDF", "Flask", "REST API"],
    metrics: [
      { label: "Intents", value: "50+" },
      { label: "Accuracy", value: "88%" },
      { label: "Response Time", value: "<200ms" },
      { label: "Framework", value: "Flask" },
    ],
    github: "https://github.com/guruc267/Friend-Bot",
    demo: "#",
    gradient: "from-purple-500/20 to-pink-500/20",
    icon: "🤖",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services",
    year: "2024",
    icon: "☁️",
  },
  {
    title: "Data Analytics & Visualization",
    issuer: "Accenture",
    year: "2024",
    icon: "📈",
  },
  {
    title: "Cyber Security Virtual Program",
    issuer: "ANZ",
    year: "2023",
    icon: "🔒",
  },
  {
    title: "Image Processing with MATLAB",
    issuer: "MathWorks",
    year: "2023",
    icon: "🖼️",
  },
];
