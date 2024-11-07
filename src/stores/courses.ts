import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { quizData } from '../data/quizData';

interface Course {
  id: string;
  title: string;
  description: string;
  questions: any[];
}

interface CoursesState {
  courses: Record<string, Course>;
  addCourse: (id: string, course: Course) => void;
  updateCourse: (id: string, course: Course) => void;
  deleteCourse: (id: string) => void;
  assignCourseToAllUsers: (courseId: string, course: Course) => void;
}

export const useCourses = create<CoursesState>()(
  persist(
    (set) => ({
      courses: quizData,

      addCourse: (id, course) => set((state) => ({
        courses: {
          ...state.courses,
          [id]: course
        }
      })),

      updateCourse: (id, course) => set((state) => ({
        courses: {
          ...state.courses,
          [id]: course
        }
      })),

      deleteCourse: (id) => set((state) => {
        const { [id]: _, ...rest } = state.courses;
        return { courses: rest };
      }),

      assignCourseToAllUsers: (courseId, course) => {
        // In a real app, this would make an API call to assign the course to all users
        console.log(`Assigning course ${courseId} to all users`);
      }
    }),
    {
      name: 'courses-storage'
    }
  )
);