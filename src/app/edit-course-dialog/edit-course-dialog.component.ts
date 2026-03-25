import { Component, effect, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';
import { EditCourseDialogData } from './edit-course-dialog.data.model';
import { CoursesService } from '../services/courses.service';
import { CourseCategory } from '../models/course-category.model';
import { Course } from '../../../models';

@Component({
  selector: 'edit-course-dialog',
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
})
export class EditCourseDialogComponent {
  dialogRef = inject(MatDialogRef) as MatDialogRef<
    EditCourseDialogComponent,
    Course | undefined
  >;

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  // TypeScript 6.0: Enhanced form with proper typing for exactOptionalPropertyTypes
  form = this.fb.group({
    title: [null as string | null],
    longDescription: [null as string | null],
    iconUrl: [null as string | null],
  });

  courseService = inject(CoursesService);

  category = signal<CourseCategory>('BEGINNER');

  constructor() {
    // TypeScript 6.0: Handle exactOptionalPropertyTypes with proper null/undefined handling
    this.form.patchValue({
      title: this.data?.course?.title ?? null,
      longDescription: this.data?.course?.longDescription ?? null,
      iconUrl: this.data?.course?.iconUrl ?? null,
    });
    this.category.set(this.data?.course?.category ?? 'BEGINNER');
    effect(() => {
      console.log(`Course category bi-directional binding:
      ${this.category()}`);
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();
    if (this.data?.mode === 'update') {
      await this.saveCourse(this.data?.course!.id.toString(), courseProps);
    } else if (this.data?.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.courseService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      alert(`Error creating the course: ${errorMessage}`);
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.courseService.saveCourse(
        courseId,
        changes,
      );
      this.dialogRef.close(updatedCourse);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      alert(`Failed to save the course: ${errorMessage}`);
    }
  }
}

export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData,
) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();

  return firstValueFrom(close$);
}
