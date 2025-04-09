import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task, Column } from '../types';
import TaskItem from './TaskItem';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="golden-glass rounded-lg p-4 golden-glow">
      <h2 className="text-xl font-semibold mb-4 golden-text-gradient">{column.title}</h2>
      <div
        ref={setNodeRef}
        className={`min-h-[500px] transition-colors rounded-md ${
          isOver ? "bg-yellow-500/10" : ""
        }`}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
