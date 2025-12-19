import { Course } from '../../../models';

export function sortCoursesBySeqNo(c1: Course, c2: Course) {
  return (c1.seqNo ?? 0) - (c2.seqNo ?? 0);
}
