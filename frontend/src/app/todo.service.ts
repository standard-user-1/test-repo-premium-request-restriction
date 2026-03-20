import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from './todo.model';

const API_URL = 'http://localhost:8080/api/todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(API_URL);
  }

  create(title: string): Observable<TodoItem> {
    return this.http.post<TodoItem>(API_URL, { title });
  }

  toggle(id: number): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${API_URL}/${id}/toggle`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
