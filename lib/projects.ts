export interface Project {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  featured: boolean
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'F1 Predictor',
    category: 'software',
    description:
      'A predictive F1 race winner app using 70+ years of historical data and advanced machine learning models for 85% prediction accuracy. Processes 1,000+ data points per race, analyzing factors like driver form, car performance, and track familiarity. Deploys on AWS/GCP with 99.9% uptime.',
    technologies: ['Python', 'Machine Learning', 'Streamlit', 'AWS', 'GCP', 'F1 API'],
    featured: true,
    githubUrl: 'https://github.com/aaryapatel09/f1-race-winner-predictor',
  },
  {
    id: '2',
    title: 'American Sign Language (ASL) Translator',
    category: 'software',
    description:
      'A real-time ASL translator built with Convolutional Neural Networks (CNNs) for gesture recognition and TensorFlow for model training. Processes webcam inputs to detect and translate ASL alphabet signs (A-Z) into text with high accuracy.',
    technologies: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Flask', 'Computer Vision'],
    featured: true,
    githubUrl: 'https://github.com/aaryapatel09/sign-language-translator',
  },
  {
    id: '3',
    title: 'DrunkTester2.0',
    category: 'software',
    description:
      'An advanced web application utilizing CNNs for facial recognition and spectrogram analysis combined with the Levenshtein distance algorithm for speech pattern detection. Designed to assess sobriety in real-time to prevent drunk driving through ML-powered evaluation.',
    technologies: ['Python', 'Machine Learning', 'CNN', 'Computer Vision', 'Web Development'],
    featured: true,
    githubUrl: 'https://github.com/aaryapatel09/DrunkTester2.0',
  },
  {
    id: '4',
    title: 'Smart Health Assistant',
    category: 'software',
    description:
      'A lightweight, web-based application offering quick health insights and personalized recommendations based on user-provided metrics like BMI, blood pressure, and cholesterol levels. Features clean, responsive design powered by Material Design principles.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Material Design', 'Responsive Web Design'],
    featured: false,
    githubUrl: 'https://github.com/aaryapatel09/smart-health-assistant',
  },
  {
    id: '5',
    title: 'Data Analytics Platform',
    category: 'software',
    description:
      'Analytics platform integrating YouTube and Twitter data via APIs to track performance and competitive intelligence. Features interactive dashboards, Google Gemini AI for natural language querying, and automated social listening tools.',
    technologies: ['Python', 'Streamlit', 'Plotly', 'Google Gemini AI', 'REST APIs', 'ETL', 'NLP'],
    featured: false,
    githubUrl: 'https://github.com/aaryapatel09',
  },
  {
    id: '6',
    title: 'AI Healthcare Tool - NYAS',
    category: 'software',
    description:
      'AI-driven healthcare tool developed at The New York Academy of Sciences to address biases in medical diagnosis and treatment. Features ethical AI filters, user interfaces for healthcare professionals, and unbiased data processing.',
    technologies: ['Python', 'Machine Learning', 'AI', 'Healthcare Technology', 'Ethical AI'],
    featured: false,
    githubUrl: 'https://github.com/aaryapatel09',
  },
]
