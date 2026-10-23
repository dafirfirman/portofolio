export interface Project {
  id: string;
  title: {
    id: string;
    en: string;
  };
  category: string;
  shortDescription: {
    id: string;
    en: string;
  };
  image: string;
  overview: {
    id: string;
    en: string;
  };
  problemStatement: {
    id: string;
    en: string;
  };
  proposedSolution: {
    id: string;
    en: string;
  };
  keyFeatures: {
    id: string[];
    en: string[];
  };
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  journalName: string;
  year: string;
  publisher?: string;
  authors: string;
  abstract: {
    id: string;
    en: string;
  };
  scholarUrl: string;
  doi?: string;
  topics: string[];
}

export const projectsData: Project[] = [
  {
    id: "techacademy",
    title: {
      id: "TechAcademy - Platform Belajar Koding & AI",
      en: "TechAcademy - Coding & AI Learning Platform"
    },
    category: "Web Application",
    shortDescription: {
      id: "Platform edukasi online interaktif untuk belajar koding, AI, cybersecurity, dan pengembangan web dari nol.",
      en: "Interactive online education platform for learning coding, AI, cybersecurity, and web development from scratch."
    },
    image: "/techacademy.png",
    overview: {
      id: "TechAcademy menyediakan ekosistem belajar teknologi interaktif dengan kurikulum praktis berbasis proyek nyata untuk membimbing pelajar dari tingkat pemula hingga siap berkarir.",
      en: "TechAcademy provides an interactive tech learning ecosystem with practical real-world project-based curricula to guide learners from beginner to career-ready."
    },
    problemStatement: {
      id: "Banyak pemula kesulitan menemukan platform belajar terstruktur dengan materi modern seputar AI dan cybersecurity.",
      en: "Many beginners struggle to find structured learning platforms with modern materials on AI and cybersecurity."
    },
    proposedSolution: {
      id: "Mengembangkan web platform interaktif berkinerja tinggi menggunakan Next.js dan Tailwind CSS.",
      en: "Developed a high-performance interactive web platform using Next.js and Tailwind CSS."
    },
    keyFeatures: {
      id: [
        "Katalog Kursus & Jalur Belajar Interaktif",
        "Kurikulum Berbasis Proyek Nyata",
        "Modul Coding, AI, & Cybersecurity",
        "Desain Responsif & UI/UX Modern"
      ],
      en: [
        "Interactive Course Catalog & Learning Paths",
        "Real-World Project-Based Curriculum",
        "Coding, AI, & Cybersecurity Modules",
        "Responsive Design & Modern UI/UX"
      ]
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://tech-academy-ibut-git-main-mr-coding.vercel.app",
    githubUrl: "https://github.com/dafirfirman/tech-academy"
  },
  {
    id: "swimpro",
    title: {
      id: "SwimPro Mobile",
      en: "SwimPro Mobile"
    },
    category: "Mobile Applications",
    shortDescription: {
      id: "Konsep aplikasi mobile yang dirancang untuk mendukung aktivitas renang melalui pelacakan latihan terstruktur.",
      en: "A mobile application concept designed to support swimming-related activities through structured training tracking."
    },
    image: "/swimpro.png",
    overview: {
      id: "SwimPro adalah aplikasi mobile interaktif yang membantu perenang mencatat metrik latihan harian, penghitung gaya, dan waktu putaran.",
      en: "SwimPro is an interactive mobile client designed to assist swimmers in logging daily training metrics, stroke counters, and lap times."
    },
    problemStatement: {
      id: "Perenang sering kali kekurangan antarmuka mobile offline-first yang khusus untuk melacak latihan di air dan waktu split performa.",
      en: "Swimmers often lack dedicated offline-first mobile interfaces to track water-based workouts and performance split times."
    },
    proposedSolution: {
      id: "Mengembangkan aplikasi Flutter lintas platform dengan caching SQLite lokal dan sinkronisasi backend yang mulus via REST API.",
      en: "Developed a cross-platform Flutter application with local SQLite caching and seamless backend sync via REST APIs."
    },
    keyFeatures: {
      id: [
        "Analisis & Riwayat Latihan",
        "Pelacakan Waktu Split",
        "Sinkronisasi Data Offline-First",
        "UI Gelap yang Bersih"
      ],
      en: [
        "Workout Analytics & Logs",
        "Split Time Tracking",
        "Offline First Data Sync",
        "Clean Dark UI"
      ]
    },
    technologies: ["Flutter", "Dart", "REST APIs", "Provider"]
  },
  {
    id: "active4c",
    title: {
      id: "Platform Active4C",
      en: "Active4C Platform"
    },
    category: "Mobile Applications",
    shortDescription: {
      id: "Proyek aplikasi mobile yang berfokus pada penyediaan manajemen aktivitas yang mudah dan menarik bagi pengguna.",
      en: "A mobile application project focused on providing convenient and engaging activity management for users."
    },
    image: "/active4c.png",
    overview: {
      id: "Active4C menyampaikan pembaruan konten dinamis dan pelacakan jadwal pribadi bagi peserta kegiatan komunitas.",
      en: "Active4C delivers dynamic content updates and personal schedule tracking for community activity participants."
    },
    problemStatement: {
      id: "Pengelolaan metrik aktivitas berkelanjutan memerlukan klien mobile lintas platform yang intuitif dengan pembaruan waktu nyata.",
      en: "Managing continuous activity metrics required an intuitive cross-platform mobile client with real-time updates."
    },
    proposedSolution: {
      id: "Membuat antarmuka mobile Flutter modern yang terintegrasi dengan manajemen state dinamis dan endpoint API.",
      en: "Created a modern Flutter mobile interface integrated with dynamic state management and API endpoints."
    },
    keyFeatures: {
      id: [
        "Profil Pengguna",
        "Dashboard Aktivitas",
        "Notifikasi Push Waktu Nyata",
        "Grafik Kustom"
      ],
      en: [
        "User Profiles",
        "Activity Dashboard",
        "Real-time Push Notifications",
        "Custom Charts"
      ]
    },
    technologies: ["Flutter", "Dart", "API Integration", "GetX"]
  },
  {
    id: "barberon",
    title: {
      id: "Aplikasi Layanan BarberOn",
      en: "BarberOn Service App"
    },
    category: "Full-Stack",
    shortDescription: {
      id: "Konsep aplikasi layanan yang dirancang untuk menyederhanakan pencarian layanan barbershop, alur reservasi, dan manajemen pelanggan.",
      en: "A service application concept designed to simplify barber service discovery, appointment workflows, and customer management."
    },
    image: "/barberon.png",
    overview: {
      id: "BarberOn menghubungkan pelanggan dengan layanan barbershop lokal melalui pemesanan slot otomatis dan manajemen antrean.",
      en: "BarberOn connects customers with local barber services through automated slot bookings and queue management."
    },
    problemStatement: {
      id: "Antrean fisik dan janji temu berbasis telepon menyebabkan konflik penjadwalan dan hilangnya kapasitas layanan.",
      en: "Physical queues and phone-based appointments lead to scheduling conflicts and lost service capacity."
    },
    proposedSolution: {
      id: "Membangun solusi full-stack yang menampilkan aplikasi mobile Flutter untuk klien dan dashboard backend PHP/MySQL untuk pemilik toko.",
      en: "Built a full-stack solution featuring a Flutter mobile app for clients and a PHP/MySQL backend dashboard for shop owners."
    },
    keyFeatures: {
      id: [
        "Sistem Reservasi Slot",
        "Katalog Layanan & Harga",
        "Status Antrean Barber",
        "Dashboard Admin"
      ],
      en: [
        "Slot Reservation System",
        "Service & Price Catalog",
        "Barber Queue Status",
        "Admin Dashboard"
      ]
    },
    technologies: ["Flutter", "PHP", "MySQL", "REST APIs"]
  }
];

export const publicationsData: Publication[] = [
  {
    id: "haircutting-service-paper",
    title: "Design and Development of Hair Cutting Service Search and Call Application Using Android-Based Waterfall Method",
    journalName: "Google Scholar Publication",
    year: "2026",
    authors: "Firman Damai Zebua",
    abstract: {
      id: "Penelitian mengenai perancangan dan pengembangan aplikasi berbasis Android untuk pencarian serta pemesanan layanan jasa potong rambut menggunakan metode SDLC Waterfall.",
      en: "Research on the design and development of an Android-based mobile application for searching and booking hair-cutting services using the Waterfall SDLC method."
    },
    scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=id&user=Xk9HNcsAAAAJ&citation_for_view=Xk9HNcsAAAAJ:u-x6o8ySG0sC",
    topics: ["Android", "Waterfall Method", "Mobile Application", "Service System"]
  }
];