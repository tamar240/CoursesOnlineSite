import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCourses(token: string): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, { headers: this.getHeaders(token) });
  }

  getCourseById(courseId: number, token: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`, { headers: this.getHeaders(token) });
  }

  addCourse(course: Course, token: string): Observable<{ courseId: number }> {
    return this.http.post<{ courseId: number }>(this.apiUrl, course, { headers: this.getHeaders(token) });
  }

  updateCourse( id: number,course: Course,token:string): Observable<Partial<Course>> {
    return this.http.put(`${this.apiUrl}/${id}`,course, {headers: this.getHeaders(token)}  )
  }
  deleteCourse(courseId: number, token: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${courseId}`, { headers: this.getHeaders(token) });
  }

  enrollStudent(courseId: number, userId: number, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers: this.getHeaders(token) });
  }

  unenrollStudent(courseId: number, userId: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId }, headers: this.getHeaders(token) });
  }

  getCoursesByStudentId(studentId: number, token: string): Observable<Partial<Course>[]> {
    return this.http.get<Partial<Course>[]>(`${this.apiUrl}/student/${studentId}`, { headers: this.getHeaders(token) });
  }
}