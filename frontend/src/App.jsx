import { useEffect, useMemo, useState } from 'react';

const API_URL = 'http://localhost:8080/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to load tasks');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (event) => {
    event.preventDefault();
    const title = newTask.trim();
    if (!title) {
      return;
    }

    try {
      setError('');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });

      if (!response.ok) {
        throw new Error('Could not add task');
      }

      const created = await response.json();
      setTodos((current) => [...current, created]);
      setNewTask('');
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PUT'
      });

      if (!response.ok) {
        throw new Error('Could not update task');
      }

      const updated = await response.json();
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('Could not delete task');
      }

      setTodos((current) => current.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <section className="todo-card">
        <h1>To-Do List</h1>
        <p className="subtitle">
          {todos.length} tasks, {completedCount} completed
        </p>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="status">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="status">No tasks yet. Add your first one.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'done' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
