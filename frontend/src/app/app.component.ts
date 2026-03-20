import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { TodoItem } from './todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  todos = signal<TodoItem[]>([]);
  newTask = signal('');
  loading = signal(true);
  error = signal('');

  completedCount = computed(() => this.todos().filter((t) => t.completed).length);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.loading.set(true);
    this.error.set('');
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load tasks');
        this.loading.set(false);
      }
    });
  }

  addTodo(event: Event): void {
    event.preventDefault();
    const title = this.newTask().trim();
    if (!title) return;

    this.error.set('');
    this.todoService.create(title).subscribe({
      next: (created) => {
        this.todos.update((list) => [...list, created]);
        this.newTask.set('');
      },
      error: () => this.error.set('Could not add task')
    });
  }

  toggleTodo(id: number): void {
    this.error.set('');
    this.todoService.toggle(id).subscribe({
      next: (updated) =>
        this.todos.update((list) =>
          list.map((t) => (t.id === id ? updated : t))
        ),
      error: () => this.error.set('Could not update task')
    });
  }

  deleteTodo(id: number): void {
    this.error.set('');
    this.todoService.delete(id).subscribe({
      next: () => this.todos.update((list) => list.filter((t) => t.id !== id)),
      error: () => this.error.set('Could not delete task')
    });
  }
}
