interface CreateCourseCommand {
  title: string;
  description: string;
  category: string;
  questions: any[];
}

interface UpdateCourseCommand extends CreateCourseCommand {
  id: string;
}

export const courseCommands = {
  createCourse: async (command: CreateCourseCommand) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateCourse: async (command: UpdateCourseCommand) => {
    try {
      const response = await fetch(`/api/courses/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteCourse: async (id: string) => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      throw error;
    }
  }
};