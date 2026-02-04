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
      className={`bg-cyber-dark border-2 border-cyber-border p-4 cursor-grab active:cursor-grabbing hover:border-cyber-accent hover:shadow-lg hover:shadow-cyber-accent transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h3 className="text-cyber-border font-bold mb-2 break-words">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-cyber-secondary text-sm mb-3 break-words">
          {task.description}
        </p>
      )}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => onEdit(task)}
          className="text-cyber-secondary text-xs px-2 py-1 border border-cyber-secondary hover:bg-cyber-secondary hover:text-cyber-bg transition-colors"
        >
          EDIT
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 text-xs px-2 py-1 border border-red-400 hover:bg-red-400 hover:text-cyber-bg transition-colors"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
