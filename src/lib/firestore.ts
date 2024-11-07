import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db, collections } from './firebase';

// User operations
export const createUser = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, collections.users, userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, collections.users, userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Course operations
export const getCourses = async () => {
  try {
    const coursesRef = collection(db, collections.courses);
    const snapshot = await getDocs(coursesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting courses:', error);
    throw error;
  }
};

export const createCourse = async (courseId: string, courseData: any) => {
  try {
    const courseRef = doc(db, collections.courses, courseId);
    await setDoc(courseRef, {
      ...courseData,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Progress operations
export const updateProgress = async (userId: string, courseId: string, progressData: any) => {
  try {
    const progressRef = doc(db, collections.progress, `${userId}_${courseId}`);
    await setDoc(progressRef, {
      userId,
      courseId,
      ...progressData,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

// Analytics operations
export const updateAnalytics = async (data: any) => {
  try {
    const analyticsRef = doc(db, collections.analytics, 'stats');
    await setDoc(analyticsRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating analytics:', error);
    throw error;
  }
};