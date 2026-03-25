import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { environment } from '../../environments/environment.development';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  env = environment;

  http = inject(HttpClient);

  // TypeScript 6.0: Enhanced method with strict typing and better error handling
  async loadLessons(config: {
    readonly courseId?: string;
    readonly query?: string;
  }): Promise<Lesson[]> {
    try {
      const { courseId, query } = config;
      let params = new HttpParams();

      // TypeScript 6.0: Enhanced parameter validation
      if (courseId && typeof courseId === 'string' && courseId.trim()) {
        params = params.set('courseId', courseId.trim());
      }
      if (query && typeof query === 'string' && query.trim()) {
        params = params.set('query', query.trim());
      }

      const lessons$ = this.http.get<GetLessonsResponse>(
        `${this.env.apiRoot}/search-lessons`,
        { params },
      );

      const response = await firstValueFrom(lessons$);

      // TypeScript 6.0: Enhanced type validation with type predicates
      if (!response?.lessons || !Array.isArray(response.lessons)) {
        throw new Error('Invalid lessons response format');
      }

      return response.lessons.filter(
        (lesson): lesson is Lesson =>
          typeof lesson === 'object' &&
          lesson !== null &&
          'id' in lesson &&
          'duration' in lesson,
      );
    } catch (error) {
      console.error('Failed to load lessons:', error);
      throw new Error('Unable to load lessons. Please try again later.');
    }
  }

  async saveLesson(
    lessonId: string,
    changes: Partial<Lesson>,
  ): Promise<Lesson> {
    const saveLesson$ = this.http.put<Lesson>(
      `${this.env.apiRoot}/lessons/${lessonId}`,
      changes,
    );
    return firstValueFrom(saveLesson$);
  }
}
