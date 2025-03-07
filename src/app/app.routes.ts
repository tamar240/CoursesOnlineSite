import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { MenuComponent } from '../components/menu/menu.component';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { SingleCourseComponent } from '../components/single-course/single-course.component';
import { UserCoursesComponent } from '../components/user-courses/user-courses.component';
import { UpdataCourseComponent } from '../components/updata-course/updata-course.component';
import { ShowCourseComponent } from '../components/show-course/show-course.component';
import { TeacherCoursesComponent } from '../components/teacher-courses/teacher-courses.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'login', component: LoginComponent }
    ,
    {
        path: 'menu', component: MenuComponent, children: [ // תפריט קבוע
            { path: 'showCourses', component: ShowCourseComponent },
            { path: 'course/:id', component: SingleCourseComponent },
            { path: 'yourCourse', component: UserCoursesComponent },
            { path: 'teacherCourse', component: TeacherCoursesComponent},
            { path: 'updateCourse/:id', component: UpdataCourseComponent },
            { path: 'addCourse', component:AddCourseComponent },
            { path: 'lessons/:id', component: LessonsComponent },
        ]
    },



];


