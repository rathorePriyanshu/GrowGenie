export interface QuizOption {
  id: string;
  text: string;
  stream: "Science" | "Commerce" | "Arts";
  skills: string[];
}

export interface QuizQuestion {
  id: string;
  classLevel: "10" | "12";
  question: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
}

export interface CareerInfo {
  career_id: string;
  career_name: string;
  career_source: string;
}

export interface QuizResult {
  recommendedStream: "Science" | "Commerce" | "Arts";
  topskills: string[];
  aiFeedback: string;
  careerInfo: CareerInfo[];
}

export interface CareerData {
  career_id: string;
  title: string;
  description: string;
  stream: "Science" | "Commerce" | "Arts";
  avgSalary: string;
  source: string;
  img: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CheckAuthData {
  email: string;
}

export interface OTPData {
  otp: string[];
}

export interface SignupData {
  email: string;
  name: string;
  password: string;
  confirmpassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

interface RoadmapContent {
  career_name: string;

  overview: {
    description: string;
    difficulty: string;
    time_required: string;
    salary_range: string;
  };

  steps: {
    step_number: number;
    title: string;
    description: string;
  }[];

  skills: {
    category: string;
    items: string[];
  }[];

  projects: {
    level: "Beginner" | "Intermediate" | "Advanced";
    title: string;
    description: string;
  }[];

  exams: string[];

  colleges: string[];

  salary_growth: {
    role: string;
    experience: string;
    salary_range: string;
  }[];

  future_scope: string;
}

export interface Roadmap {
  _id: string;
  career_id: string;
  career_name: string;
  career_source: string;
  country: string;
  version: number;
  roadmap_json: RoadmapContent;
  generatedBy: string;
}

export interface savedRoadmaps {
  roadmap_id: string;
  career_id: string;
  career_name: string;
  country: string;
  version: number;
  savedAt: string;
}
