import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Course';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { UsersService } from '../../services/users.service';
import { RouterModule } from '@angular/router';
import { HoverColorDirective } from '../../directives/hover-color.directive';

@Component({
  selector: 'app-show-course',
  standalone: true,
  imports: [MatCardModule, MatListModule, RouterModule, HoverColorDirective],
  templateUrl: './show-course.component.html',
  styleUrl: './show-course.component.css'
})
export class ShowCourseComponent {

  courses: Course[] = [];
  token: string = '';
  userId: number = 0;
  role: string = "";

  constructor(private coursesService: CoursesService, private usersService: UsersService) {
  }

  ngOnInit() {

    this.token = this.usersService.getToken() || ''; 
    this.userId = this.usersService.getUserId() || 0; 
    this.role = this.usersService.getRole() || ''; 

    if (this.token) {
      this.coursesService.getCourses(this.token).subscribe({
        next: (data) => {
          this.courses = data;
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
        }
      });
    }
    else {
      console.error('No token found. Please log in.');
    }
  }

  enroll(courseId: number): void {

    this.coursesService.enrollStudent(courseId, this.userId, this.token).subscribe({
      next: (res) => {
        alert('You have successfully registered for the course!');
      },
      error: (err) => {
        alert('Error registering for the course.');
      }
    });
  }


  createCourse() {
    const newCourse = new Course(0, 'Course Title', 'Course Description', 1);

    this.coursesService.addCourse(newCourse, this.token).subscribe({
      next: (response) => {
        newCourse.id = response.courseId; // עדכון מזהה הקורס
      },
      error: (error) => {
        alert("Error creating course.")
      }
    });
  }

}
