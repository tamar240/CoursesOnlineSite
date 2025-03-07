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

  // קבלת כל הקורסים
  getCourses(token: string): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, { headers: this.getHeaders(token) });
  }

  // קבלת פרטי קורס לפי ID
  getCourseById(courseId: number, token: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`, { headers: this.getHeaders(token) });
  }

  // הוספת קורס חדש (למורה בלבד)
  addCourse(course: Course, token: string): Observable<{ courseId: number }> {
    return this.http.post<{ courseId: number }>(this.apiUrl, course, { headers: this.getHeaders(token) });
  }

  // עדכון קורס לפי ID (למורה בלבד)
  updateCourse(courseId: number, updates: Course, token: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${courseId}`, updates, { headers: this.getHeaders(token) });
  }

  // מחיקת קורס לפי ID (למורה בלבד)
  deleteCourse(courseId: number, token: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${courseId}`, { headers: this.getHeaders(token) });
  }

  // הוספת תלמיד לקורס
  enrollStudent(courseId: number, userId: number, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers: this.getHeaders(token) });
  }

  // הסרת תלמיד מהקורס
  unenrollStudent(courseId: number, userId: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId }, headers: this.getHeaders(token) });
  }

  // קבלת הקורסים של תלמיד לפי ה-ID שלו
  getCoursesByStudentId(studentId: number, token: string): Observable<Partial<Course>[]> {
    return this.http.get<Partial<Course>[]>(`${this.apiUrl}/student/${studentId}`, { headers: this.getHeaders(token) });
  }
}