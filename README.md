# FitLog --- Workout Library

FitLog is a responsive workout library built with Next.js. Browse
workouts, view detailed exercise information, create a daily workout
plan, and save workouts for later.

## Features

1. Workout Library: Browse workouts loaded from the FitLog API.
2. Workout Details: Open a workout's dedicated page to see its
   description, muscle groups, equipment, difficulty, duration,
   calories, rating, sets, reps, and instructions.
3. Today's Plan: Add workouts to a daily plan, with a maximum of
   five workouts.
4. Save for Later: Save workouts separately and remove them when no
   longer needed.
5. Progress Tracking: Mark planned workouts as completed.
6. Plan Summary: View the number of exercises, total duration, and
   estimated calories for the current plan.
7. Toast Notifications: Get feedback when adding, saving,
   completing, or removing workouts.

## Technologies Used

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- React Context API
- react-hot-toast

### API

- All workouts: https://api.abcz.workers.dev/api/fitlog
- A single workout: https://api.abcz.workers.dev/api/fitlog/3
  (replace 3 with the workout ID)

## State Management

The React Context API shares the workout plan and saved workouts across
the Navbar, workout details page, and My Plan page. The plan summary
metrics are calculated from the current plan.


## Future Improvements

- Add workout search and filtering.
- Add user accounts and cloud-based data syncing.
- Add more workout categories and progress analytics.

### FitLog --- Train hard, log honest.


## Submission Links

- Github Repo: https://github.com/saifur18234/B14-A06.git
- Live link: https://assignment-6-tau-sand.vercel.app/
