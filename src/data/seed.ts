export const NUTRITION_TARGETS = {
  calories: 2425.5,
  protein: 176.4,
  carbs: 271.2,
  fat: 66.5,
};

export const MEALS = [
  { id: 'm1', time: '06:40', name: 'Prep', summary: 'Mineral Water + RED Detox', cals: 0, p: 0, c: 0, f: 0, items: ['1x Mineral Water, 1g Salt, Half Lemon', '1 Serving RED Detox'] },
  { id: 'm2', time: '07:00', name: 'Breakfast', summary: 'Eggs, Cream of Rice, Corn Flakes, Pineapple...', cals: 543.5, p: 30, c: 60, f: 15, items: ['4x Egg Whites', '1x Whole Egg', '50g Cream of Rice', '50g Corn Flakes', '50g Pineapple', 'Green Salad', 'Cherry Stem Tea'] },
  { id: 'm3', time: '08:00', name: 'Supplements', summary: 'Multivitamin, Vit C, D3K2', cals: 0, p: 0, c: 0, f: 0, items: ['2x Multivitamin', '2x Vit C (500mg)', '2x Vit D3K2'] },
  { id: 'm4', time: '11:00', name: 'Meal 2', summary: 'Minced Meat, Basmati Rice, Roasted Veggies...', cals: 675.2, p: 50.8, c: 60.1, f: 26.2, items: ['190g Lean Minced Beef', '70g Basmati Rice', '1 Portion Roasted Veggies', '1 tbsp Olive Oil'] },
  { id: 'm5', time: '15:00', name: 'Meal 3', summary: 'Turkey Breast, Basmati Rice, Salad...', cals: 542.9, p: 46.5, c: 57.4, f: 12.2, items: ['190g Turkey Breast', '70g Basmati Rice', '1 Portion Green Salad', '1 tsp Olive Oil'] },
  { id: 'm6', time: '16:30', name: 'Pre-Workout', summary: 'Coffee + Pre workout', cals: 0, p: 0, c: 0, f: 0, items: ['Mineral Water + Lemon + Salt', 'Filter / Turkish Coffee', '1 Serving Pre Workout'] },
  { id: 'm7', time: '19:00', name: 'Post-Workout', summary: 'Omega 3', cals: 0, p: 0, c: 0, f: 0, items: ['1x Omega 3 (1000mg)'] },
  { id: 'm8', time: '19:30', name: 'Meal 4', summary: 'Turkey Breast, Potatoes, Roasted Veggies...', cals: 663.9, p: 48.9, c: 65.7, f: 22.5, items: ['190g Turkey Breast', '350g Potatoes', '1 Portion Roasted Veggies', '1 tbsp Olive Oil'] },
  { id: 'm9', time: '23:15', name: 'Night', summary: 'Glutamine + ZMA', cals: 0, p: 0, c: 0, f: 0, items: ['1 Serving Glutamine', '1 Serving ZMA'] },
];

export const WORKOUT_DAYS = [
  {
    id: 'day1',
    name: 'Chest',
    subtitle: 'Chest, Triceps, Abs',
    blocks: [
      { id: 'w1_1', name: 'Warmup', sets: 1, reps: '2-3 min', type: 'single' },
      { id: 'w1_2', name: 'Bench Press', sets: 4, reps: '12-12-10-10', type: 'single', lastWeight: 60 },
      { id: 'w1_3', name: 'Chest Press Machine', sets: 5, reps: '15-12-10-8-6', type: 'single', lastWeight: 50 },
      { id: 'w1_4', name: 'Chest Fly Machine', sets: 4, reps: '15-12-12-10', type: 'single', lastWeight: 45 },
      { 
        id: 'g1_1', type: 'superset', name: 'Superset',
        exercises: [
          { id: 'w1_5', name: 'Incline Dumbbell Fly', sets: 3, reps: '8', lastWeight: 15 },
          { id: 'w1_6', name: 'Incline Dumbbell Pullover', sets: 3, reps: '8', lastWeight: 20 }
        ]
      },
      { id: 'w1_9', name: 'Triceps Extension Cable', sets: 3, reps: '8', type: 'single', lastWeight: 25 },
      { id: 'w1_10', name: 'Overhead Cable Triceps', sets: 4, reps: '12', type: 'single', lastWeight: 20 },
      {
        id: 'g1_2', type: 'triset', name: 'Tri-set',
        exercises: [
          { id: 'w1_12', name: 'Bench Crunch', sets: 4, reps: '15' },
          { id: 'w1_13', name: 'Abdominal Crunch', sets: 4, reps: '15' },
          { id: 'w1_14', name: 'Plank Exercise', sets: 4, reps: 'Max' }
        ]
      }
    ]
  },
  {
    id: 'day2',
    name: 'Back',
    subtitle: 'Back, Lats, Lower Back, Forearms',
    blocks: [
      { id: 'w2_1', name: 'Warmup', sets: 1, reps: '2-3 min', type: 'single' },
      { id: 'w2_2', name: 'Lat Pulldown', sets: 5, reps: '10', type: 'single', lastWeight: 55 },
      { id: 'w2_3', name: 'Rev Grip BB Row', sets: 4, reps: '12-10-8-6', type: 'single', lastWeight: 50 },
      { id: 'w2_4', name: 'One Arm DB Row', sets: 4, reps: '10', type: 'single', lastWeight: 22.5 },
      { id: 'w2_5', name: 'Seated Row Wide Grip', sets: 4, reps: '15-12-10-10', type: 'single', lastWeight: 60 },
      { 
        id: 'g2_1', type: 'superset', name: 'Superset',
        exercises: [
          { id: 'w2_6', name: 'Straight Arm Pulldown', sets: 3, reps: '8', lastWeight: 40 },
          { id: 'w2_7', name: 'Dumbbell Pullover', sets: 3, reps: '8', lastWeight: 25 }
        ]
      },
      { id: 'w2_10', name: 'Sumo Deadlift', sets: 5, reps: '20-20-15-15-12', type: 'single', lastWeight: 80 },
      { id: 'w2_11', name: 'Cable Biceps Curl', sets: 4, reps: '8', type: 'single', lastWeight: 25 },
      { id: 'w2_12', name: 'Dumbbell Scot Curl', sets: 4, reps: '12', type: 'single', lastWeight: 15 }
    ]
  },
  {
    id: 'day3',
    name: 'Legs',
    subtitle: 'Legs, Calves, Abs',
    blocks: [
      { id: 'w3_1', name: 'Cardio - Upright Bike', sets: 1, reps: '5 min', type: 'single' },
      { id: 'w3_2', name: 'Smith Machine Squat', sets: 3, reps: '12', type: 'single', lastWeight: 60 },
      { id: 'w3_3', name: 'Leg Extension', sets: 4, reps: '12-10-10-8', type: 'single', lastWeight: 55 },
      { id: 'w3_4', name: 'Leg Press V Press', sets: 4, reps: '15-12-12-10', type: 'single', lastWeight: 120 },
      { id: 'w3_5', name: 'Leg Curl Machine', sets: 5, reps: '15', type: 'single', lastWeight: 45 },
      { id: 'w3_6', name: 'Dumbbell Leg Curl', sets: 3, reps: '15', type: 'single', lastWeight: 20 },
      { id: 'w3_7', name: 'Machine Hip Abduction', sets: 3, reps: '15', type: 'single', lastWeight: 50 },
      { id: 'w3_8', name: 'Machine Hip Adduction', sets: 3, reps: '15', type: 'single', lastWeight: 50 },
      { 
        id: 'g3_1', type: 'superset', name: 'Superset',
        exercises: [
          { id: 'w3_9', name: 'Leg Press Calf Press', sets: 5, reps: '20', lastWeight: 100 },
          { id: 'w3_10', name: 'Smith Machine Calf', sets: 5, reps: '15', lastWeight: 60 }
        ]
      },
      { id: 'w3_13', name: 'Rev Standing Wrist Curl', sets: 3, reps: '15', type: 'single', lastWeight: 15 },
      { id: 'w3_14', name: 'Palms Up BB Wrist Curl', sets: 3, reps: '15', type: 'single', lastWeight: 20 },
      {
        id: 'g3_2', type: 'triset', name: 'Tri-set',
        exercises: [
          { id: 'w3_15', name: 'Abdominal Crunch', sets: 4, reps: '15' },
          { id: 'w3_16', name: 'Bench Crunch', sets: 4, reps: '15' },
          { id: 'w3_17', name: 'Plank Exercise', sets: 4, reps: 'Max' }
        ]
      }
    ]
  },
  {
    id: 'day4',
    name: 'Shoulders',
    subtitle: 'Shoulders',
    blocks: [
      { id: 'w4_1', name: 'Warmup', sets: 1, reps: '2-3 min', type: 'single' },
      { id: 'w4_2', name: 'Shoulder Press Machine', sets: 5, reps: '12-12-10-10-8', type: 'single', lastWeight: 45 },
      { id: 'w4_3', name: 'Dumbbell Lateral Raise', sets: 5, reps: '12-12-10-10-8', type: 'single', lastWeight: 12.5 },
      { 
        id: 'g4_1', type: 'superset', name: 'Superset',
        exercises: [
          { id: 'w4_4', name: 'Seated Dumbbell Press', sets: 3, reps: '8', lastWeight: 20 },
          { id: 'w4_5', name: 'Dumbbell Front Raise', sets: 3, reps: '8', lastWeight: 12.5 }
        ]
      },
      { id: 'w4_6', name: 'Upright Barbell Row', sets: 4, reps: '12', type: 'single', lastWeight: 35 },
      { id: 'w4_7', name: 'Rear Deltoid Pec Fly', sets: 3, reps: '8', type: 'single', lastWeight: 40 }
    ]
  }
];
