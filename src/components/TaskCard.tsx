'use client';

import { Task } from '@/types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-cyber-dark border border-cyber-border p-4 rounded-lg cursor-grab active:cursor-grabbing hover:border-cyber-accent hover:shadow-md transition-shadow transition-colors shadow-sm ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h3 className="text-cyber-text font-semibold mb-2 break-words">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-cyber-secondary text-sm mb-3 break-words leading-relaxed">
          {task.description}
        </p>
      )}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => onEdit(task)}
          className="text-cyber-accent text-sm px-3 py-1 border border-cyber-accent/40 hover:bg-cyber-accent hover:text-cyber-bg transition-colors rounded-md"
        >
          EDIT
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-rose-600 text-sm px-3 py-1 border border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-colors rounded-md"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
