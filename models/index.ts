export type CourseCategory = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Course {
  id: number;
  title: string;
  longDescription: string;
  iconUrl: string;
  courseListIcon?: string;
  category: CourseCategory;
  lessonsCount?: number;
  seqNo: number;
  url: string;
  price: number;
  promo?: boolean;
}
