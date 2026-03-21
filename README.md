#  GrowGenie

## Description

GrowGenie is a full-stack MERN application designed to help students in Class 10 and 12 explore career paths based on their interests, academic stream, and personal preferences. The platform provides a structured approach to career discovery by combining guided exploration, AI-driven recommendations, and personalized learning roadmaps.

Students can browse careers based on their selected stream and take an interactive quiz that evaluates their preferences. Based on the responses, the system uses AI models to recommend suitable career options along with detailed guidance. Additionally, users can generate career-specific roadmaps to understand the step-by-step path required to achieve their goals.

The application includes a personalized dashboard where authenticated users can save and revisit their quiz results and generated roadmaps. The project focuses on integrating AI-driven decision support with a scalable full-stack architecture and a smooth user experience.

---

## Features

### 🎯 Stream-Based Career Exploration

Browse career options tailored to selected academic streams (Science, Commerce, Arts).

### 🧠 AI-Powered Career Recommendations

Get personalized career suggestions based on quiz responses using LLMs.

### 📝 Interactive Career Quiz

Answer structured questions to evaluate interests and preferences.

### 🛣️ AI-Generated Career Roadmaps

Generate step-by-step learning and career paths for selected roles.

### 💾 User Dashboard

Save and manage generated roadmaps and quiz results.

### 🔐 Advanced Authentication System

* Email-based flow with OTP verification
* Conditional login/signup based on user existence
* Google authentication integration
* Secure password reset functionality

### 🧭 Guided Tour Experience

Interactive onboarding to help users navigate the platform.

---


## Demo Screenshots

### AuthPage
<img width="1919" height="927" alt="Screenshot 2026-03-21 183906" src="https://github.com/user-attachments/assets/0ad63e7d-d4af-4771-9614-0130627c8ef7" />

### HomePage
<img width="1916" height="924" alt="Screenshot 2026-03-21 183957" src="https://github.com/user-attachments/assets/98dced3e-12cb-4eb6-9bff-5d475d0041ee" />

### Stream Selection 
<img width="1918" height="926" alt="Screenshot 2026-03-21 184014" src="https://github.com/user-attachments/assets/2e80b80c-5a41-41b9-b243-817152d02465" />

### Quiz
<img width="1919" height="924" alt="Screenshot 2026-03-21 184036" src="https://github.com/user-attachments/assets/3055fe3f-c4d5-4441-bd00-0ea664d9b214" />

### Feedback 
<img width="1919" height="925" alt="Screenshot 2026-03-21 184125" src="https://github.com/user-attachments/assets/06d344d3-061f-4bb7-9376-57be5c134223" />

### Roadmap
<img width="1918" height="929" alt="Screenshot 2026-03-21 184213" src="https://github.com/user-attachments/assets/6cee3037-6004-4311-8c77-f0ba078f081d" />

### Profile/dashboard
<img width="1918" height="926" alt="Screenshot 2026-03-21 184232" src="https://github.com/user-attachments/assets/bbd1180c-96a2-4ecb-8eeb-359e3f8f5a4a" />

### All Careers
<img width="1919" height="925" alt="Screenshot 2026-03-21 184256" src="https://github.com/user-attachments/assets/fa247280-2776-4deb-9950-5b54c7b4816e" />

---

## Technology Stack

### Frontend

* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* Custom Email + OTP flow
* Google OAuth

### AI Integration

* Qwen3 (Primary career recommendation & reasoning)
* Qwen2.5 (Career suggestions & roadmap generation)

---

## Technical Highlights

* Designed a multi-step authentication flow with dynamic routing based on user state
* Integrated multiple LLMs for different responsibilities (reasoning, suggestions, roadmap generation)
* Built a personalized persistence layer for storing user-specific career data
* Implemented AI-driven decision logic based on structured quiz inputs
* Created a guided onboarding system to improve user experience

---

