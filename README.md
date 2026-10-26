#FitLog --- Workout Library

FitLog is a responsive workout library built with Next.js. Browse
workouts, view detailed exercise information, create a daily workout
plan, and save workouts to revisit later.

Features

- Workout Library: Browse workouts loaded from the FitLog API.
- Workout Details: Open a workout's dedicated page to see its
  description, muscle groups, equipment, difficulty, duration,
  calories, rating, sets, reps, and instructions.
- Today's Plan: Add workouts to a daily plan, with a maximum of
  five workouts.
- Save for Later: Save workouts separately and remove them when no
  longer needed.
- Progress Tracking: Mark planned workouts as completed.
- Plan Summary: View the number of exercises, total duration, and
  estimated calories for the current plan.
- Sorting: Sort workouts by duration, calories burned, or rating.
- Toast Notifications: Get feedback when adding, saving,
  completing, or removing workouts.
- Persistent Data: Store the plan and saved workouts in
  localStorage so they remain after a page refresh.
- Responsive UI: Use the application on desktop and mobile
  screens.
- Custom 404 Page: Show a helpful page when a route does not
  exist.
  Technologies Used
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- React Context API
- react-hot-toast
- localStorage
- FitLog Workout API
- DaisyUI (optional UI component library)
  Pages and Routes
  Route Description
  / Home page with the hero section and workout library
  /workout/[id] Dynamic workout details page
  /my-plan Today's Plan and Saved workouts
  Not found Custom 404 page
  API
  FitLog fetches workout data from the following API endpoints:
- All workouts: https://api.abcz.workers.dev/api/fitlog
- A single workout: https://api.abcz.workers.dev/api/fitlog/3
  (replace 3 with the workout ID)
  Getting Started
  Prerequisites
- Node.js installed
- npm installed
  Installation

1. Clone this repository:
   git clone <your-github-repository-url>
2. Open the project folder:
   cd <project-folder>
3. Install dependencies:
   npm install
4. Start the development server:
   npm run dev
5. Open http://localhost:3000 in your browser.
   Project Structure
   src/
   ├── app/
   │ ├── layout.tsx
   │ ├── page.tsx
   │ ├── not-found.tsx
   │ ├── workout/
   │ │ └── [id]/
   │ │ └── page.tsx
   │ └── my-plan/
   │ └── page.tsx
   ├── components/
   │ ├── Navbar.tsx
   │ ├── Hero.tsx
   │ ├── WorkoutCard.tsx
   │ ├── LibrarySection.tsx
   │ └── Footer.tsx
   ├── context/
   │ └── PlanContext.tsx
   ├── types/
   │ └── index.ts
   └── utils/
   └── api.ts

###State Management

The React Context API shares the workout plan and saved workouts across
the Navbar, workout details page, and My Plan page. The plan summary
metrics are calculated from the current plan.

The application uses localStorage to persist the plan and saved
workouts across page refreshes.

###Deployment

The project can be deployed to Vercel:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Let Vercel detect the Next.js project.
4. Deploy and open the generated live URL.
   Future Improvements

- Add workout search and filtering.
- Add user accounts and cloud-based data syncing.
- Add more workout categories and progress analytics.

FitLog --- Train hard, log honest.

Github Repo:
Live link:
