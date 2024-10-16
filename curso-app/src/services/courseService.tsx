// src/services/courseService.ts
import { Course } from '../types';

export async function getCourses(): Promise<Course[]> {
  const response = await fetch('http://localhost:3001/courses');
  const data = await response.json();
  return data;
}
