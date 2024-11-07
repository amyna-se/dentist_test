export const courseQueries = {
  getCourses: async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getCourseById: async (id: string) => {
    try {
      const response = await fetch(`/api/courses/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch course');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getCoursesByCategory: async (category: string) => {
    try {
      const response = await fetch(`/api/courses?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses by category');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};