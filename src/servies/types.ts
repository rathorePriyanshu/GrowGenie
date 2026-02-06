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

export interface QuizResult {
  recommendedStream: "Science" | "Commerce" | "Arts";
  topskills: string[];
  careers: { title: string; description?: string }[];
  aiFeedback: string;
}

export interface CareerRoadmap {
  title: string;
  steps: string[];
}

export interface CareerColleges {
  name: string;
  description: string;
}

export interface CareerData {
  title: string;
  description: string;
  stream: "Science" | "Commerce" | "Arts";
  avgSalary: string;
  topColleges: CareerColleges[];
  roadmap: CareerRoadmap[];
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
