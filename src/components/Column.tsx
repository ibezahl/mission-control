'use client';

import { Task, KanbanColumn as KanbanColumnType } from '@/types';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface ColumnProps {
  column: KanbanColumnType;
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const COLUMN_COLORS: Record<KanbanColumnType, string> = {
  top_priorities: 'border-cyber-accent',
  job_search_pipe: 'border-cyber-secondary',
  intelligence_monitoring: 'border-yellow-500',
  tonights_mission: 'border-red-500',
  family_personal: 'border-blue-500',
  done: 'border-green-500',
};

export default function Column({
  column,
  title,
  tasks,
  onEditTask,
  onDeleteTask,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column,
    data: {
      type: 'column',
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-cyber-dark border-2 ${COLUMN_COLORS[column]} p-4 rounded-none min-h-screen flex flex-col`}
    >
      <h2 className="text-xl font-bold text-cyber-border mb-4 uppercase">
        [{title}]
      </h2>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 flex-1">
          {tasks.length === 0 ? (
            <div className="text-cyber-secondary text-sm opacity-50">
              // No tasks
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}
