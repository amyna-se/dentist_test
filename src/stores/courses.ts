// Import necessary libraries
import { create } from 'zustand'; // Zustand for state management
import { persist } from 'zustand/middleware'; // Middleware for persisting state
import { quizData } from '../data/quizData'; // Predefined quiz data
import { QuizCourse } from '../data/quizData'; // Import QuizCourse for type consistency

// Use QuizCourse as the type for courses to ensure compatibility
type Course = QuizCourse;

// Define the Zustand state for courses
interface CoursesState {
  courses: Record<string, Course>; // All courses by ID
  addCourse: (id: string, course: Course) => void; // Add a new course
  updateCourse: (id: string, course: Course) => void; // Update an existing course
  deleteCourse: (id: string) => void; // Delete a course by its ID
  assignCourseToAllUsers: (courseId: string) => void; // Assign a course to all users
}

// Zustand store for managing courses
export const useCourses = create<CoursesState>()(
  persist(
    (set, get) => ({
      /**
       * Initialize courses with quizData.
       */
      courses: quizData, // No transformation needed since types now match

      /**
       * Add a new course to the state.
       * @param id - The unique ID of the new course.
       * @param course - The course object to add.
       */
      addCourse: (id, course) => {
        console.log(`Adding new course with ID: ${id}`);
        console.log(`Course details:`, course);

        set((state) => {
          const updatedCourses = {
            ...state.courses,
            [id]: course // Add the new course
          };

          console.log(`Updated courses state after adding:`, updatedCourses);
          return { courses: updatedCourses };
        });
      },

      /**
       * Update an existing course in the state.
       * @param id - The unique ID of the course to update.
       * @param course - The updated course object.
       */
      updateCourse: (id, course) => {
        console.log(`Updating course with ID: ${id}`);
        console.log(`Updated course details:`, course);

        set((state) => {
          const updatedCourses = {
            ...state.courses,
            [id]: course // Replace the course with the updated one
          };

          console.log(`Updated courses state after update:`, updatedCourses);
          return { courses: updatedCourses };
        });
      },

      /**
       * Delete a course from the state.
       * @param id - The unique ID of the course to delete.
       */
      deleteCourse: (id) => {
        console.log(`Deleting course with ID: ${id}`);

        set((state) => {
          const { [id]: deletedCourse, ...remainingCourses } = state.courses; // Omit the course by ID

          console.log(`Deleted course details:`, deletedCourse);
          console.log(`Remaining courses state:`, remainingCourses);

          return { courses: remainingCourses };
        });
      },

      /**
       * Placeholder function to assign a course to all users.
       * In a real app, this would involve API calls.
       * @param courseId - The unique ID of the course to assign.
       */
      assignCourseToAllUsers: (courseId) => {
        console.log(`Assigning course ${courseId} to all users`);
        // In the real implementation, this would update the users' state or make API calls
        const currentCourses = get().courses;
        if (currentCourses[courseId]) {
          console.log(`Course ${courseId} exists and has been assigned.`);
        } else {
          console.error(`Course ${courseId} does not exist in the state.`);
        }
      }
    }),
    {
      name: 'courses-storage' // Key for localStorage persistence
    }
  )
);
