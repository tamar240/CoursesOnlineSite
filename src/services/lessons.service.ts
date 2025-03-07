import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  // קבלת כל השיעורים עבור קורס מסוים
  getLessons(courseId: number, token: string): Observable<Lesson[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`, { headers });
  }

  // קבלת שיעור לפי מזהה
  getLesson(courseId: number, lessonId: number, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  // יצירת שיעור חדש
  createLesson(courseId: number, lesson: Lesson, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Lesson>(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers });
  }

  // עדכון שיעור לפי מזהה
  updateLesson(courseId: number, lessonId: number, lesson: Lesson, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers });
  }

  // מחיקת שיעור לפי מזהה
  // deleteLesson(courseId: number, lessonId: number, token: string): Observable<void> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.delete<void>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  // }
  deleteLesson(courseId: number, id: number, token: string): Observable<string> {
    console.log("courseId", courseId);
    console.log("idlesson", id);
    console.log("token", token);
    
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.apiUrl}/${courseId}/lessons/${id}`, { headers });
  }
}
