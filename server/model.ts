import { Course, CourseCategory } from '../models';

export interface Courses {
  [id: number]: Course;
}
