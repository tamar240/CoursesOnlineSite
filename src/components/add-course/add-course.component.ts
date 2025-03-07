import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [MatCard,
    MatCardTitle
    , MatFormField
    , MatLabel,
    MatError,
    ReactiveFormsModule
    , MatInputModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  courseForm: FormGroup;
  successMessage: string = '';


  constructor(private fb: FormBuilder, private coursesService: CoursesService, private userService: UsersService) {

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  addCourse() {
    if (this.courseForm.valid) {

      const token = this.userService.getToken() || "";
      const bady = this.courseForm.value;

      this.coursesService.addCourse(bady, token).subscribe({

        next: (cresponse: { courseId: number }) => {
          alert("the course added succsecfull")
          this.courseForm.reset();
        },
        error: (error) => {
          console.error('error in ad', error);
        }
      });
    }
  }

  resetForm() {
    this.courseForm.reset();
  }
}
