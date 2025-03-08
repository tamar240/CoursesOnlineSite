import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonsService } from '../../services/lessons.service';
import { Lesson } from '../../models/Lesson';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lessons',
  standalone: true,
   styleUrl: './lessons.component.css',
  imports: [
    MatInputModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule
    , MatInputModule
  ],
  templateUrl: './lessons.component.html',
 
})
export class LessonsComponent {
  courseId: number = 0;
  lessons: Lesson[] = [];
  token: string = '';
  openForm: boolean = false;
  isEditMode: boolean = false;  // Flag for edit mode
  currentLessonId: number | null = null;  // Current lesson id for editing
  lessonForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private lessonsService: LessonsService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
    });

    this.token = this.usersService.getToken() || '';
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonsService.getLessons(this.courseId, this.token).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error('Error loading lessons', error);
      }
    });
  }

  openUpdateFormHandler(lesson: Lesson): void {
    this.isEditMode = true;  // Set to edit mode
    this.currentLessonId = lesson.id;  // Set the current lesson id
    this.lessonForm.setValue({
      title: lesson.title,
      content: lesson.content
    });
    this.openForm = true;  // Open the form for editing
  }

  onSubmit() {
    if (this.lessonForm.invalid) {
      alert('Please fill out all fields');
      return;
    }
  
    if (this.isEditMode) {
      this.updateLesson();
    } else {
      this.addLesson();
    }
  }

  addLesson() {
    const body = this.lessonForm?.value;

    this.lessonsService.createLesson(this.courseId, body, this.token).subscribe({
      next: () => {
        alert('Lesson added successfully');
        this.lessonForm.reset();
        this.openForm = false;
        this.loadLessons();
      },
      error: (error) => {
        console.error('Error adding lesson', error);
        alert('An error occurred while adding the lesson.');
      }
    });
  }

  updateLesson() {
    const lesson = {
       id: this.currentLessonId,
      title: this.lessonForm.value.title,
      content: this.lessonForm.value.content
    };

    this.lessonsService.updateLesson(this.courseId, this.currentLessonId!, lesson, this.token).subscribe({
      next: () => {
        alert('Lesson updated successfully');
        this.loadLessons();
        this.openForm = false;
        this.lessonForm.reset();
        this.isEditMode = false;
        this.currentLessonId = null;
      },
      error: (error) => {
        console.error('Error updating lesson', error);
        alert('An error occurred while updating the lesson.');
      }
    });
  }

  deleteLesson(lessonId: number): void {
    this.lessonsService.deleteLesson(this.courseId, lessonId, this.token).subscribe({
      next: () => {
        alert('Lesson deleted successfully');
        this.loadLessons();
      },
      error: (error) => {
        console.error('Error deleting lesson', error);
        alert('Error deleting lesson');
      }
    });
  }
}
