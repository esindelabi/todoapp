import { useState, useEffect } from 'react';
import './App.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false); // État pour l'erreur

  // Charger les tâches au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Impossible de charger les tâches', e);
      }
    }
  }, []);

  // Sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTask.trim();

    if (!trimmed) {
      setError(true);
      return; // Ne rien faire si vide
    }

    const newTaskObj: Task = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [...prev, newTaskObj]);
    setNewTask('');
    setError(false); // Réinitialise l'erreur
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearAll = () => {
    if (tasks.length > 0 && window.confirm('Supprimer toutes les tâches ?')) {
      setTasks([]);
    }
  };

  return (
    <div className="todo-container">
      <header>
        <h1>📝 Todo App</h1>
      </header>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            if (error) setError(false); 
          }}
          placeholder="Quelle est votre tâche ?"
          className={`task-input ${error ? 'error' : ''}`}
          aria-invalid={error}
          aria-describedby={error ? "error-message" : undefined}
        />
        <button type="submit" className="btn-add">+</button>
      </form>

      {error && (
        <p id="error-message" className="error-inline">
          ⚠️ Veuillez entrer une tâche valide.
        </p>

      )}

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-message">Aucune tâche pour le moment.</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className="task-text">{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn-delete"
                aria-label="Supprimer la tâche"
              >
                🗑︎
              </button>
            </li>
          ))
        )}
      </ul>

      {tasks.length > 0 && (
        <button onClick={clearAll} className="btn-clear">
          Supprimer toutes les tâches
        </button>
      )}

      <footer>
        Réaliser avec ❤ par Areoh
        <br />
        &copy; 2025 Todo App. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;