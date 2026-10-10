export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  keyFeatures: string[];
  technologies: string[];
}

export const projectsData: Project[] = [
  {
    id: "swimpro",
    title: "SwimPro Mobile",
    category: "Mobile Applications",
    shortDescription: "A mobile application concept designed to support swimming-related activities through structured training tracking.",
    image: "/swimpro.png",
    overview: "SwimPro is an interactive mobile client designed to assist swimmers in logging daily training metrics, stroke counters, and lap times.",
    problemStatement: "Swimmers often lack dedicated offline-first mobile interfaces to track water-based workouts and performance split times.",
    proposedSolution: "Developed a cross-platform Flutter application with local SQLite caching and seamless backend sync via REST APIs.",
    keyFeatures: ["Workout Analytics & Logs", "Split Time Tracking", "Offline First Data Sync", "Clean Dark UI"],
    technologies: ["Flutter", "Dart", "REST APIs", "Provider"]
  },
  {
    id: "active4c",
    title: "Active4C Platform",
    category: "Mobile Applications",
    shortDescription: "A mobile application project focused on providing convenient and engaging activity management for users.",
    image: "/active4c.png",
    overview: "Active4C delivers dynamic content updates and personal schedule tracking for community activity participants.",
    problemStatement: "Managing continuous activity metrics required an intuitive cross-platform mobile client with real-time updates.",
    proposedSolution: "Created a modern Flutter mobile interface integrated with dynamic state management and API endpoints.",
    keyFeatures: ["User Profiles", "Activity Dashboard", "Real-time Push Notifications", "Custom Charts"],
    technologies: ["Flutter", "Dart", "API Integration", "GetX"]
  },
  {
    id: "barberon",
    title: "BarberOn Service App",
    category: "Full-Stack",
    shortDescription: "A service application concept designed to simplify barber service discovery, appointment workflows, and customer management.",
    image: "/barberon.png",
    overview: "BarberOn connects customers with local barber services through automated slot bookings and queue management.",
    problemStatement: "Physical queues and phone-based appointments lead to scheduling conflicts and lost service capacity.",
    proposedSolution: "Built a full-stack solution featuring a Flutter mobile app for clients and a PHP/MySQL backend dashboard for shop owners.",
    keyFeatures: ["Slot Reservation System", "Service & Price Catalog", "Barber Queue Status", "Admin Dashboard"],
    technologies: ["Flutter", "PHP", "MySQL", "REST APIs"]
  },
  {
    id: "ddos-ml-detection",
    title: "DDoS Mitigation & ML System",
    category: "Web Development",
    shortDescription: "Network traffic analytics and DDoS intrusion detection web application using machine learning models.",
    image: "/ddos.png",
    overview: "A research-focused web dashboard evaluating network traffic datasets (CICDDoS2019/CICIDS2017) to classify potential DDoS attacks.",
    problemStatement: "Traditional rule-based firewalls struggle to detect novel application-layer volumetric DDoS attacks in real time.",
    proposedSolution: "Implemented Python classification models (Random Forest, KNN, LSTM) exposed via web interface for live packet inspection.",
    keyFeatures: ["Real-time Traffic Classifier", "Feature Importance Charts", "Confusion Matrix Visualization", "Model Evaluation Metrics"],
    technologies: ["Python", "Next.js", "TypeScript", "Tailwind CSS", "Scikit-Learn"]
  }
];