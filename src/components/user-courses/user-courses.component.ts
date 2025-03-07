import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Course';
import { UsersService } from '../../services/users.service';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [MatCard],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent {
  courses: Partial<Course>[] = [];
  userId: number = 0;
  token: string ="";
 
  constructor(private courseService: CoursesService, 
    private userService: UsersService) {

  }
  ngOnInit(): void {

    this.userId =this.userService.getUserId()||0;
    this.token = this.userService.getToken()||"";
    this.loadUserCourses();
  }
  loadUserCourses(): void {
    this.courseService.getCoursesByStudentId(this.userId,this.token).subscribe({
      next: (response) => {
       this.courses=response;
      },
      error: (error) => {
        console.error('Error:in get users courses', error);
      }
    })
  }
 
  unenroll(courseId: number): void {
    this.courseService.unenrollStudent(courseId, this.userId, this.token).subscribe({
      next: (res) => {
        alert('Cancellation of registration successfully received.');
        this.loadUserCourses();
      },
      error: (err) => {
        console.error('Error unenrolling in course:', err);
        alert('Unregistration failed...');
      }
    });
  }
}
