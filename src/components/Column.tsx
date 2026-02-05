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
  intelligence_monitoring: 'border-amber-300',
  tonights_mission: 'border-rose-300',
  family_personal: 'border-sky-300',
  done: 'border-emerald-300',
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
      className={`bg-cyber-dark border ${COLUMN_COLORS[column]} p-5 rounded-xl min-h-screen flex flex-col shadow-sm`}
    >
      <h2 className="text-lg font-semibold text-cyber-text mb-4">
        [{title}]
      </h2>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 flex-1">
          {tasks.length === 0 ? (
            <div className="text-cyber-secondary text-sm opacity-70">
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
