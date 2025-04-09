import React from 'react';
import { DndContext, DragEndEvent, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { PlusCircle, LayoutDashboard } from 'lucide-react';
import TaskColumn from './components/TaskColumn';
import TaskStats from './components/TaskStats';
import AuthButton from './components/AuthButton';
import useTaskStore from './store/taskStore';
import { Column } from './types';

const columns: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {
  const { tasks, addTask, moveTask, isLoading } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = React.useState('');

  const handleDragStart = (event: DragStartEvent) => {
    // Handle drag start if needed
    const { active } = event;
    if (active) {
      const activeTask = tasks.find((task) => task.id === active.id);
      if (activeTask) {
        // Optionally, you can set the active task state here
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveTask(active.id.toString(), over.id as 'todo' | 'inProgress' | 'done');
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        <div className="dark-background">
          <header className="golden-glass p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-8 w-8 text-yellow-500" />
                <h1 className="text-2xl font-bold golden-text-gradient">
                  Task Dashboard
                </h1>
              </div>
              <AuthButton />
            </div>
          </header>
          <main className="max-w-7xl mx-auto p-4">
            {/* Formularz dodawania taska */}
            <form onSubmit={handleAddTask} className="flex gap-4 mb-8">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 rounded-md bg-gray-800 border-gray-700 text-slate-100 placeholder-slate-400 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white golden-button shadow-lg"
              >
                <PlusCircle size={18} />
                Add Task
              </button>
            </form>
            {/* Inne komponenty */}
            <TaskStats tasks={tasks} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {columns.map((column) => (
                <TaskColumn
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.status === column.id)}
                />
              ))}
            </div>
          </main>
        </div>
      </DndContext>
    </React.StrictMode>
  );
}

export default App