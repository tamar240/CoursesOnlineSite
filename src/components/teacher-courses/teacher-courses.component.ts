import { Component } from '@angular/core';
import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses.service';
import { UsersService } from '../../services/users.service';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-courses',
  standalone: true,
  imports: [MatIcon, MatCard, RouterLink],
  templateUrl: './teacher-courses.component.html',
  styleUrl: './teacher-courses.component.css'
})
export class TeacherCoursesComponent {
 
  teacherCourses :Course[] = [];
  teacherId :number = 0;
  token :string ='';
  clickAddCourse:boolean = false;

  constructor(private coursesSrevice:CoursesService,private usersService:UsersService,
    private router: Router) { }


  ngOnInit(): void {
   this.teacherId=this.usersService.getUserId()||0;
   this.token=this.usersService.getToken()||"";
   this.loadTeacherCourses();
  }
  loadTeacherCourses(): void {
    this.coursesSrevice.getCourses(this.token).subscribe({
      next: (courses) => {
        this.teacherCourses = courses.filter(course => course.teacherId === this.teacherId);//need to change to teacherId
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    })

  }
  moveLesson(courseId: number): void {
    this.router.navigate(['/menu/lessons/', courseId]);
  }
  deleteCourse(courseId: number) {
    this.coursesSrevice.deleteCourse(courseId,this.token).subscribe({
      next: () => {
        alert('deleted successfully!');
        this.loadTeacherCourses();
      },
      error: (error) => {
        alert("deleted faild")
        console.error('Error deleting course:', error);
      }
    });
  }
}