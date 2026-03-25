import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GetCoursesResponse } from '../models/get-courses.response';
import { environment } from '../../environments/environment.development';
import { Course } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  http = inject(HttpClient);

  env = environment;

  // TypeScript 6.0: Enhanced async method with better error handling
  async loadAllCourses(): Promise<Course[]> {
    try {
      const courses$ = this.http.get<GetCoursesResponse>(
        `${this.env.apiRoot}/courses`,
      );
      const response = await firstValueFrom(courses$);

      // TypeScript 6.0: Enhanced type validation
      if (!response?.courses || !Array.isArray(response.courses)) {
        throw new Error('Invalid courses response format');
      }

      return response.courses.filter(
        (course): course is Course =>
          typeof course === 'object' &&
          course !== null &&
          'id' in course &&
          'title' in course,
      );
    } catch (error) {
      console.error('Failed to load courses:', error);
      throw new Error('Unable to load courses. Please try again later.');
    }
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course$ = this.http.get<Course>(
      `${this.env.apiRoot}/courses/${courseId}`,
    );
    return firstValueFrom(course$);
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.http.post<Course>(
      `${this.env.apiRoot}/courses`,
      course,
    );
    return firstValueFrom(course$);
  }

  async saveCourse(
    courseId: string,
    changes: Partial<Course>,
  ): Promise<Course> {
    const course$ = this.http.put<Course>(
      `${this.env.apiRoot}/courses/${courseId}`,
      changes,
    );
    return firstValueFrom(course$);
  }

  async deleteCourse(courseId: string) {
    const delete$ = this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }
}
