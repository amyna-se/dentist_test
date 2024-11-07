export type UserRole = 'admin' | 'staff' | 'patient';

export type UserProfileType = 'admin' | 'staff' | 'patient';

export interface UserProfile {
  type: UserProfileType;
  assignedPaths: string[];
  completedPaths: string[];
  progress: Record<string, number>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  profile: UserProfile;
}