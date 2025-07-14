// Mock data for Bangladesh Olympiadians Hub

export const subjects = [
  {
    id: 'physics',
    name: 'Physics Hub',
    icon: '⚡',
    color: 'from-green-400 to-emerald-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    memberCount: 1247,
    description: 'Master the fundamental laws of nature through problem-solving',
    whatsappLink: 'https://chat.whatsapp.com/physics-hub',
    topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics']
  },
  {
    id: 'chemistry',
    name: 'Chemistry Hub',
    icon: '🧪',
    color: 'from-emerald-400 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
    memberCount: 982,
    description: 'Explore molecular interactions and chemical processes',
    whatsappLink: 'https://chat.whatsapp.com/chemistry-hub',
    topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry']
  },
  {
    id: 'biology',
    name: 'Biology Hub',
    icon: '🧬',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
    memberCount: 1156,
    description: 'Discover the intricate world of living organisms',
    whatsappLink: 'https://chat.whatsapp.com/biology-hub',
    topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Molecular Biology']
  },
  {
    id: 'astronomy',
    name: 'Astronomy Hub',
    icon: '🌌',
    color: 'from-teal-400 to-green-600',
    bgColor: 'bg-gradient-to-br from-teal-50 to-green-50',
    memberCount: 743,
    description: 'Journey through the cosmos and celestial phenomena',
    whatsappLink: 'https://chat.whatsapp.com/astronomy-hub',
    topics: ['Stellar Physics', 'Planetary Science', 'Cosmology', 'Observational Astronomy']
  },
  {
    id: 'mathematics',
    name: 'Mathematics Hub',
    icon: '📐',
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    memberCount: 1534,
    description: 'Solve complex mathematical problems and theorems',
    whatsappLink: 'https://chat.whatsapp.com/mathematics-hub',
    topics: ['Algebra', 'Geometry', 'Calculus', 'Number Theory', 'Combinatorics']
  },
  {
    id: 'computer',
    name: 'Computer Science Hub',
    icon: '💻',
    color: 'from-emerald-500 to-green-700',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
    memberCount: 891,
    description: 'Master algorithms and computational thinking',
    whatsappLink: 'https://chat.whatsapp.com/computer-hub',
    topics: ['Data Structures', 'Algorithms', 'Programming', 'Graph Theory']
  }
];

export const practiceProblems = [
  {
    id: 1,
    subject: 'physics',
    title: 'Projectile Motion Challenge',
    difficulty: 'Medium',
    question: 'A ball is thrown at an angle of 45° with an initial velocity of 20 m/s. Calculate the maximum height reached and the range of the projectile. (g = 10 m/s²)',
    options: [
      'Height: 10m, Range: 40m',
      'Height: 5m, Range: 40m',
      'Height: 10m, Range: 20m',
      'Height: 5m, Range: 20m'
    ],
    correctAnswer: 0,
    explanation: 'For projectile motion at 45°: Height = v²sin²θ/(2g) = 20²×(1/√2)²/(2×10) = 10m, Range = v²sin(2θ)/g = 20²×1/10 = 40m',
    points: 10
  },
  {
    id: 2,
    subject: 'chemistry',
    title: 'Stoichiometry Problem',
    difficulty: 'Easy',
    question: 'How many moles of H₂O are produced when 2 moles of H₂ react with 1 mole of O₂?',
    options: ['1 mole', '2 moles', '3 moles', '4 moles'],
    correctAnswer: 1,
    explanation: 'From the balanced equation 2H₂ + O₂ → 2H₂O, 2 moles of H₂ produce 2 moles of H₂O',
    points: 5
  },
  {
    id: 3,
    subject: 'biology',
    title: 'DNA Replication',
    difficulty: 'Hard',
    question: 'Which enzyme is responsible for joining Okazaki fragments during DNA replication?',
    options: ['DNA Helicase', 'DNA Ligase', 'DNA Polymerase', 'DNA Primase'],
    correctAnswer: 1,
    explanation: 'DNA Ligase joins the Okazaki fragments on the lagging strand to form a continuous DNA strand',
    points: 15
  }
];

export const competitions = [
  {
    id: 1,
    title: 'Bangladesh Physics Olympiad Mock Test',
    subject: 'physics',
    duration: 180,
    questions: 30,
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    participants: 156,
    status: 'upcoming',
    prize: 'Certificate + Merit Badge'
  },
  {
    id: 2,
    title: 'International Chemistry Challenge',
    subject: 'chemistry',
    duration: 120,
    questions: 25,
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    participants: 203,
    status: 'live',
    prize: 'Cash Prize + Certificate'
  },
  {
    id: 3,
    title: 'Biology Olympiad Qualifier',
    subject: 'biology',
    duration: 150,
    questions: 40,
    startDate: '2025-01-10',
    endDate: '2025-01-12',
    participants: 178,
    status: 'completed',
    prize: 'Qualification Certificate'
  }
];

export const achievements = [
  {
    id: 1,
    studentName: 'Fahim Rahman',
    achievement: 'Gold Medal - International Physics Olympiad',
    year: '2024',
    image: '/api/placeholder/100/100'
  },
  {
    id: 2,
    studentName: 'Nusrat Jahan',
    achievement: 'Silver Medal - Asian Chemistry Olympiad',
    year: '2024',
    image: '/api/placeholder/100/100'
  },
  {
    id: 3,
    studentName: 'Rakib Hasan',
    achievement: 'Bronze Medal - International Biology Olympiad',
    year: '2023',
    image: '/api/placeholder/100/100'
  }
];

export const stats = {
  totalMembers: 6753,
  totalProblems: 2847,
  completedCompetitions: 45,
  successRate: 78
};

export const testimonials = [
  {
    id: 1,
    name: 'Sadia Islam',
    role: 'Physics Olympiad Winner',
    text: 'Bangladesh Olympiadians Hub transformed my problem-solving skills. The interactive practice sessions and competitive environment helped me achieve my dreams.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 2,
    name: 'Mehedi Hasan',
    role: 'Chemistry Olympiad Participant',
    text: 'The WhatsApp community support and quality problems available here are unmatched. Highly recommend for any serious olympiad aspirant.',
    rating: 5,
    image: '/api/placeholder/80/80'
  }
];