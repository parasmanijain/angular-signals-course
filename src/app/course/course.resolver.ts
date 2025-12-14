import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

export const courseResolver: ResolveFn<Course | null> = async (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
  const courseId = route.paramMap.get('courseId');
  if (!courseId) {
    return null;
  }
  const coursesService = inject(CoursesService);
  return coursesService.getCourseById(courseId);
};
