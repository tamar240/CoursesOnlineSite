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
  imports: [
    MatInputModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule
    , MatInputModule
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
  courseId: number = 0;
  lessons: Lesson[] = [];
  token: string = '';
  openForm: boolean = false;
  lessonForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private lessonsService: LessonsService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {

  }

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
        console.error('erorr in get the lessons', error);
      }
    });
  }


  addLesson() {
    const bady = this.lessonForm?.value;

    this.lessonsService.createLesson(this.courseId, bady, this.token).subscribe({

      next: () => {
        alert('the lesson added successfully');
        this.lessonForm.reset();
        this.openForm = false;
        this.loadLessons();
      },
      error: (error) => {
        console.error('erorr in added lesson', error);
        alert('An error occurred while adding the lesson.');
      }
    });
  }

  updateLesson(lessonId: number, lessonData: { title: string; content: string }): void {

    const updatedLesson = new Lesson(this.courseId, lessonData.title, lessonData.content);

    this.lessonsService.updateLesson(this.courseId, lessonId, updatedLesson, this.token).subscribe({
      next: () => {
        alert('the lesson updated successfully');
        this.loadLessons();
      },
      error: (error) => {
        console.error('erorr in update lesson', error);
        alert('An error occurred while updating the lesson.');
      }
    });
  }

  deleteLesson(lessonId: number): void {

    this.lessonsService.deleteLesson(this.courseId, lessonId, this.token).subscribe({
      next: () => {
        alert('The lesson was successfully deleted.');
        this.loadLessons();
      },
      error: (error) => {
        console.error('Error: Lesson deletion failed', error);
        alert('Error: Lesson deletion failed.');
      }

    })
  }
}

