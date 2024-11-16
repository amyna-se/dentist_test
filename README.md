Here’s a structured and comprehensive overview of the key sections to include in your **README.md** file, summarizing the most important aspects of the application:

---

# NeuroStep - Gamified Neurodiversity Learning Platform

**NeuroStep** is a modern web application that provides interactive, game-based learning experiences about neurodiversity, focusing on Autism and ADHD. The platform includes features for user management, course creation, gamified quizzes, progress tracking, and community engagement.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Folder Structure](#folder-structure)
5. [Key Components](#key-components)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Gamified Learning**:
  - Courses and quizzes designed like games with XP, progress tracking, and achievements.
- **Role-Based Access**:
  - User roles: `patient`, `staff`, and `admin`, with customized permissions and dashboards.
- **Course Management**:
  - Admins can create, edit, and manage courses and quizzes.
- **User Management**:
  - Admins can add, update, and assign roles to users.
- **Onboarding Experience**:
  - New users are introduced to the platform through an interactive onboarding process.
- **Responsive Design**:
  - Fully functional on desktop and mobile devices.
- **Accessibility and Engagement**:
  - Includes animations, hover effects, and a community-centric focus.

---

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neurostep.git
   ```
2. Navigate to the project directory:
   ```bash
   cd neurostep
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:3000`.

---

## Getting Started

### Admin Dashboard

- Accessible at `/admin/dashboard`.
- Features:
  - Add/Edit Courses
  - Manage Users
  - Monitor Learning Paths

### User Dashboard

- Accessible at `/dashboard`.
- Features:
  - View progress
  - Start quizzes
  - Track XP and achievements

### Onboarding

- New users are guided through an interactive onboarding process after account creation.

---

## Folder Structure

````plaintext
📂 dentist_test_extracted/
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tailwind.config.js
├── 📄 vite.config.ts
├── 📄 tsconfig.json
├── 📄 tsconfig.app.json
├── 📄 tsconfig.node.json
├── 📄 postcss.config.js
├── 📄 robots.txt
├── 📄 sitemap.xml
├── 📂 public/
│   ├── 📄 logo.svg
├── 📂 src/
│   ├── 📄 App.tsx
│   ├── 📄 main.tsx
│   ├── 📄 routes.tsx
│   ├── 📄 index.css
│   ├── 📂 components/
│   │   ├── 📄 Navbar.tsx
│   │   ├── 📄 Footer.tsx
│   │   ├── 📂 Admin/
│   │   │   ├── 📄 AdminChart.tsx
│   │   │   ├── 📄 AdminMetricCard.tsx
│   │   │   ├── 📄 AdminUserTable.tsx
│   │   │   ├── 📄 CourseEditor.tsx
│   │   │   ├── 📄 FormFieldEditor.tsx
│   │   │   ├── 📄 LearningPathEditor.tsx
│   │   │   ├── 📄 ModuleCard.tsx
│   │   │   ├── 📄 ModuleEditor.tsx
│   │   │   ├── 📄 OnboardingEditor.tsx
│   │   │   ├── 📄 QuestionEditor.tsx
│   │   │   ├── 📄 UserManager.tsx
│   │   ├── 📂 Quiz/
│   │   │   ├── 📄 InfoCard.tsx
│   │   │   ├── 📄 QuizCard.tsx
│   │   │   ├── 📄 QuizComplete.tsx
│   │   │   ├── 📄 QuizProgress.tsx
│   │   │   ├── 📄 TextInputQuestion.tsx
│   │   ├── 📂 Dashboard/
│   │   │   ├── 📄 PerformanceMetrics.tsx
│   │   │   ├── 📄 UserSettings.tsx
│   │   ├── 📂 Onboarding/
│   │   │   ├── 📄 DrAttention.tsx
│   │   │   ├── 📄 FormStep.tsx
│   │   │   ├── 📄 OnboardingLayout.tsx
│   │   ├── 📂 Stats/
│   │   │   ├── 📄 StatCard.tsx
│   │   │   ├── 📄 StatGroup.tsx
│   │   │   ├── 📄 UserStats.tsx
│   │   ├── 📂 Auth/
│   │   │   ├── 📄 EmailVerification.tsx
│   │   │   ├── 📄 SocialLogin.tsx
│   │   ├── 📂 Badges/
│   │   │   ├── 📄 BadgeDisplay.tsx
│   │   │   ├── 📄 BadgeGrid.tsx
│   │   │   ├── 📄 BadgeNotification.tsx
│   │   ├── 📂 Calendar/
│   │   │   ├── 📄 BookingCalendar.tsx
│   │   ├── 📂 Membership/
│   │   │   ├── 📄 MembershipCard.tsx
│   │   ├── 📂 Learning/
│   │   │   ├── 📄 ComboStreak.tsx
│   │   │   ├── 📄 DailyChallenge.tsx
│   │   ├── 📂 Donation/
│   │   │   ├── 📄 DonationCard.tsx
│   │   ├── 📄 AdminRoute.tsx
│   │   ├── 📄 ProtectedRoute.tsx
├── 📂 config/
│   ├── 📄 analytics.ts
│   ├── 📄 constants.ts
│   ├── 📄 firebase.ts
├── 📂 data/
│   ├── 📄 quizData.ts
│   ├── 📄 exampleData.ts
├── 📂 i18n/
│   ├── 📄 index.ts
│   ├── 📂 locales/
│   │   ├── 📄 en.json
│   │   ├── 📄 sv.json
├── 📂 lib/
│   ├── 📄 analytics.ts
├── 📂 locales/
│   ├── 📄 en.json
│   ├── 📄 sv.json
├── 📂 pages/
│   ├── 📄 Home.tsx
│   ├── 📄 Dashboard.tsx
│   ├── 📄 About.tsx
│   ├── 📄 Contact.tsx
│   ├── 📄 AdminDashboard.tsx
│   ├── 📄 Auth.tsx
│   ├── 📄 Onboarding.tsx
│   ├── 📄 Quiz.tsx
│   ├── 📄 LearningPaths.tsx
│   ├── 📄 Compliance.tsx
│   ├── 📄 Scheduling.tsx
│   ├── 📄 Resources.tsx
│   ├── 📄 Reports.tsx
│   ├── 📄 Shop.tsx
│   ├── 📄 Support.tsx
├── 📂 stores/
│   ├── 📄 auth.ts
│   ├── 📄 users.ts
│   ├── 📄 courses.ts
│   ├── 📄 achievements.ts
│   ├── 📄 learning.ts
│   ├── 📄 onboarding.ts
│   ├── 📄 quiz.ts
│   ├── 📂 modules/
│   │   ├── 📄 assessments.ts
│   │   ├── 📄 badges.ts
│   │   ├── 📄 certifications.ts
│   │   ├── 📄 clinicalProcedures.ts
│   │   ├── 📄 compliance.ts
│   │   ├── 📄 index.ts
│   │   ├── 📄 learningPaths.ts
│   │   ├── 📄 patientEducation.ts
│   │   ├── 📄 reporting.ts
│   │   ├── 📄 resources.ts
│   │   ├── 📄 scheduling.ts
├── 📂 types/
│   ├── 📄 user.ts
│   ├── 📄 quiz.ts
│   ├── 📄 learning.ts
---

## Key Components

### 1. **Navbar**

- Provides navigation across pages.
- Features role-based links and a responsive design.

### 2. **Auth**

- Handles user login, registration, and role selection.
- Implements password validation and error handling.

### 3. **CourseEditor**

- Allows admins to create and manage courses and quizzes.
- Includes features for adding/editing questions.

### 4. **UserManager**

- Provides tools for adding and managing users.
- Supports role assignment and password validation.

### 5. **Quiz**

- Displays interactive quizzes with support for multiple question types.
- Tracks user progress and scores dynamically.

### 6. **Onboarding**

- A step-based guide to introduce new users to the platform’s features.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
````

3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

---

Let me know if you'd like to adjust or add more details, such as API usage or a deeper dive into any feature!
