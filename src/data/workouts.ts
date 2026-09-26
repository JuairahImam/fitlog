export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

/** Static stand-in so the library layout matches the design. Replace with the API. */
export const workouts: Workout[] = [
  {
    id: 1,
    name: "Barbell Bench Press",
    image:
      "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740",
    muscleGroups: ["Chest", "Arms"],
    equipment: "Barbell, Bench",
    duration: 25,
    caloriesBurned: 180,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Pull-Up",
    image:
      "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740",
    muscleGroups: ["Back", "Arms"],
    equipment: "Pull-up Bar",
    duration: 15,
    caloriesBurned: 120,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Back Squat",
    image:
      "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691401.jpg?w=740",
    muscleGroups: ["Legs", "Core"],
    equipment: "Barbell, Rack",
    duration: 30,
    caloriesBurned: 240,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Overhead Press",
    image:
      "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666703.jpg?w=740",
    muscleGroups: ["Shoulders", "Arms"],
    equipment: "Barbell",
    duration: 20,
    caloriesBurned: 150,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Dumbbell Bicep Curl",
    image:
      "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666702.jpg?w=740",
    muscleGroups: ["Arms"],
    equipment: "Dumbbells",
    duration: 12,
    caloriesBurned: 80,
    rating: 4.3,
  },
  {
    id: 6,
    name: "Hollow-Body Plank",
    image:
      "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691489.jpg?w=740",
    muscleGroups: ["Core"],
    equipment: "Bodyweight",
    duration: 10,
    caloriesBurned: 60,
    rating: 4.4,
  },
  {
    id: 7,
    name: "Burpee",
    image:
      "https://img.magnific.com/free-photo/3d-cartoon-business-character_1048-16544.jpg?w=740",
    muscleGroups: ["Full Body"],
    equipment: "Bodyweight",
    duration: 12,
    caloriesBurned: 160,
    rating: 4.2,
  },
  {
    id: 8,
    name: "Conventional Deadlift",
    image:
      "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666704.jpg?w=740",
    muscleGroups: ["Back", "Legs"],
    equipment: "Barbell",
    duration: 28,
    caloriesBurned: 260,
    rating: 4.9,
  },
  {
    id: 9,
    name: "Push-Up",
    image:
      "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691429.jpg?w=740",
    muscleGroups: ["Chest", "Arms", "Core"],
    equipment: "Bodyweight",
    duration: 10,
    caloriesBurned: 90,
    rating: 4.5,
  },
  {
    id: 10,
    name: "Walking Lunge",
    image:
      "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666701.jpg?w=740",
    muscleGroups: ["Legs"],
    equipment: "Dumbbells (optional)",
    duration: 18,
    caloriesBurned: 170,
    rating: 4.4,
  },
  {
    id: 11,
    name: "Russian Twist",
    image:
      "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691487.jpg?w=740",
    muscleGroups: ["Core"],
    equipment: "Medicine Ball",
    duration: 8,
    caloriesBurned: 70,
    rating: 4.1,
  },
  {
    id: 12,
    name: "Kettlebell Swing",
    image:
      "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691505.jpg?w=740",
    muscleGroups: ["Full Body", "Shoulders"],
    equipment: "Kettlebell",
    duration: 16,
    caloriesBurned: 200,
    rating: 4.7,
  },
];
