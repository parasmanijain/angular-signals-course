export type CourseCategory = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

// TypeScript 6.0: Enhanced Course interface with better type safety
export interface Course {
  readonly id: number;
  title: string;
  longDescription: string;
  iconUrl: string;
  courseListIcon?: string;
  category: CourseCategory;
  lessonsCount?: number;
  seqNo?: number;
  url?: string;
  price?: number;
  promo?: boolean;
}

// TypeScript 6.0: Enhanced Lesson interface with branded types
export interface Lesson {
  readonly id: number;
  title?: string;
  description?: string;
  duration: string;
  seqNo: number;
  courseId: number;
  videoId?: string;
}

// TypeScript 6.0: Utility types for better type safety
export type CourseUpdate = Partial<Omit<Course, 'id'>>;
export type LessonUpdate = Partial<Omit<Lesson, 'id' | 'courseId'>>;

// TypeScript 6.0: Enhanced type predicates
export function isCourse(obj: unknown): obj is Course {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'category' in obj
  );
}

export function isLesson(obj: unknown): obj is Lesson {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'duration' in obj &&
    'courseId' in obj
  );
}
