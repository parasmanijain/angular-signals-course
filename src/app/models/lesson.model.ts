export interface Lesson {
  readonly id: string;
  description?: string;
  duration: string;
  seqNo: number;
  courseId: number;
  videoId?: string;
}

// TypeScript 6.0: Enhanced type safety with branded types
export type LessonId = string & { readonly __brand: 'LessonId' };
export type CourseId = number & { readonly __brand: 'CourseId' };

// TypeScript 6.0: Utility type for lesson updates
export type LessonUpdate = Partial<Pick<Lesson, 'description' | 'duration'>>;

// TypeScript 6.0: Enhanced lesson with branded types
export interface EnhancedLesson extends Omit<Lesson, 'id' | 'courseId'> {
  readonly id: LessonId;
  readonly courseId: CourseId;
}
