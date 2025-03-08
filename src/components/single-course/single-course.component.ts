import { Component, Input, input } from '@angular/core';
import { Course } from '../../models/Course';
import { Lesson } from '../../models/Lesson';
import { User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../services/lessons.service';
import { CoursesService } from '../../services/courses.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { CapitalizeFirstPipe } from "../../pipes/capitalize-first.pipe";
@Component({
  selector: 'app-single-course',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatIconModule,
    MatExpansionModule,
    MatIcon,
    CapitalizeFirstPipe
],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css'
})
export class SingleCourseComponent {
  courseId!: number;
  course: Course | undefined;
  lessons: Lesson[] = [];
  teacher: User | undefined;
  token: string = "";

  constructor(
    private route: ActivatedRoute,
    private lessonsService: LessonsService,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.token = sessionStorage.getItem('token') || '';

    this.route.params.subscribe(params => {
      this.courseId = +params['id']
    });

    this.loadCourse();
    this.loadLessons();

  }

  loadLessons() {
    this.lessonsService.getLessons(this.courseId, this.token).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error('Error in get lessons:', error);
      }
    })
    
  }

  loadTeacher() {
    this.usersService.getUserById(this.course!.teacherId, this.token).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
      },
      error: (error) => {
        console.error('Error in get teacher:', error);
      }

    });
  }
  loadCourse() {
    this.coursesService.getCourseById(this.courseId, this.token).subscribe({

      next: (course) => {

        this.course = course;
        this.loadTeacher();

      },
      error: (error) => {
        console.error('Error in get course :', error);
      }
    });
  }
  goBack() {
    this.router.navigate(['/menu/showCourses']);
  }
  

}








