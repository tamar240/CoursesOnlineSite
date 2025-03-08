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

  getLessons(courseId: number, token: string): Observable<Lesson[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`, { headers });
  }

  getLesson(courseId: number, lessonId: number, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  createLesson(courseId: number, lesson: Lesson, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Lesson>(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers });
  }

  updateLesson(courseId: number, lessonId: number, lesson:any, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`,
       {id:lesson.id,title:lesson.title,content:lesson.content,courseId:courseId}, { headers });
  }
  deleteLesson(courseId: number, id: number, token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.apiUrl}/${courseId}/lessons/${id}`, { headers });
  }
}
