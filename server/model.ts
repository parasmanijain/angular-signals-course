import { Course, Lesson } from '../models';

export interface Courses {
  [id: number]: Course;
}

export interface Lessons {
  [id: number]: Lesson;
}
