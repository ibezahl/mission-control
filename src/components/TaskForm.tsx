'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Task, KanbanColumn } from '@/types';

interface TaskFormProps {
  task?: Task;
  onSubmit: (title: string, description: string, column: KanbanColumn) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const COLUMNS: { value: KanbanColumn; label: string }[] = [
  { value: 'top_priorities', label: 'Top Priorities' },
  { value: 'job_search_pipe', label: 'Job Search Pipe' },
  { value: 'intelligence_monitoring', label: 'Intelligence & Monitoring' },
  { value: 'tonights_mission', label: "Tonight's Mission" },
  { value: 'family_personal', label: 'Family & Personal' },
  { value: 'done', label: 'Done' },
];

export default function TaskForm({
  task,
  onSubmit,
  onCancel,
  isOpen,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState<KanbanColumn>('top_priorities');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setColumn(task.column);
    } else {
      setTitle('');
      setDescription('');
      setColumn('top_priorities');
    }
  }, [task, isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description, column);
      setTitle('');
      setDescription('');
      setColumn('top_priorities');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-dark border-4 border-cyber-border max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-cyber-border mb-4">
          {task ? '[EDIT TASK]' : '[NEW TASK]'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-cyber-border text-sm mb-2">
              TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-accent focus:shadow-lg focus:shadow-cyber-accent"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-cyber-border text-sm mb-2">
              DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-accent focus:shadow-lg focus:shadow-cyber-accent h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-cyber-border text-sm mb-2">
              COLUMN
            </label>
            <select
              value={column}
              onChange={(e) => setColumn(e.target.value as KanbanColumn)}
              className="w-full bg-cyber-bg border border-cyber-border px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-accent"
            >
              {COLUMNS.map((col) => (
                <option key={col.value} value={col.value}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-cyber-border text-cyber-bg font-bold py-2 hover:bg-cyber-accent transition-colors cursor-pointer"
            >
              {task ? 'UPDATE' : 'CREATE'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-cyber-bg border border-cyber-border text-cyber-border font-bold py-2 hover:bg-cyber-border hover:text-cyber-bg transition-colors cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
