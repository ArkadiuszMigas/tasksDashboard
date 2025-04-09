import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Trash2, GripVertical } from "lucide-react";
import { Task } from "../types";
import useTaskStore from "../store/taskStore";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`golden-task p-3 rounded-md mb-2 ${
        isDragging ? "shadow-lg ring-2 ring-yellow-400 ring-opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="cursor-grab hover:text-yellow-400 text-slate-400">
          <GripVertical size={16} />
        </div>
        <div className="flex-1 flex items-center justify-between">
            {task.title}
          <button
            onClick={() => deleteTask(task.id)}
            onMouseDown={() => {
                deleteTask(task.id);
            }}
            className="text-red-400 hover:text-red-300 transition-colors justify-end ml-auto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
