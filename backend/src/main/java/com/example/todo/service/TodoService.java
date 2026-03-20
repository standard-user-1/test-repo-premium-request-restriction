package com.example.todo.service;

import com.example.todo.model.TodoItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoService {

    private final List<TodoItem> todos = new ArrayList<>();
    private final AtomicLong sequence = new AtomicLong(1);

    public List<TodoItem> getAll() {
        return todos;
    }

    public TodoItem create(TodoItem item) {
        TodoItem newItem = new TodoItem(sequence.getAndIncrement(), item.getTitle(), false);
        todos.add(newItem);
        return newItem;
    }

    public Optional<TodoItem> toggle(Long id) {
        return todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst()
                .map(todo -> {
                    todo.setCompleted(!todo.isCompleted());
                    return todo;
                });
    }

    public boolean delete(Long id) {
        return todos.removeIf(todo -> todo.getId().equals(id));
    }
}
