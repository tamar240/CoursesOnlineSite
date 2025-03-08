import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { Lesson } from '../../models/Lesson';
import { UsersService } from '../../services/users.service';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-updata-course',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './updata-course.component.html',
  styleUrl: './updata-course.component.css'
})
export class UpdataCourseComponent implements OnInit {
  courseId: number = 0;
  token: string = '';
  courseForm!: FormGroup;
  lessons: Lesson[] = [];
  theacherId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {

    this.token = this.usersService.getToken() || "";
    this.theacherId = this.usersService.getUserId() || 0;

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.loadCourse();
      this.loadLessons();
    });
  }

  loadCourse() {
    this.coursesService.getCourseById(this.courseId, this.token).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description
        });
      },
      error: (error) => {
        console.error('Error loading course:', error);
      }
    });
  }

  loadLessons(): void {
    this.lessonService.getLessons(this.courseId, this.token).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error('Error fetching lessons:', error);
      }
    })
  }

  updateCourse() {
    if (this.courseForm.invalid)
      alert('Please fill out all fields');

    else {
      const title = this.courseForm.value.title;
      const description = this.courseForm.value.description;

      const course: Course = new Course(this.courseId, title, description, this.theacherId);


      this.coursesService.updateCourse(this.courseId, course, this.token).subscribe({

        next: () => {

          alert('Course updated successfully!');
          this.router.navigate(['/menu/teacherCourse']);
        },
        error: (error: any) => {
          console.error('Error updating course:', error);
        }
      });
    }
  }


  cancelUpdate() {
    window.history.back();
  }

}
