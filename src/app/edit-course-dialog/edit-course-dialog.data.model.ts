import { Course } from '../../../models';

export type EditCourseDialogData = {
  mode: 'create' | 'update';
  title: string;
  course?: Course;
};
