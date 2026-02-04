'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Column from './Column';
import TaskForm from './TaskForm';
import { Task, KanbanColumn } from '@/types';
import { getTasks, createTask, updateTask, deleteTask, moveTask } from '@/lib/tasks';
import { supabase } from '@/lib/supabase';

interface KanbanBoardProps {
  userId: string;
}

const COLUMNS: { id: KanbanColumn; title: string }[] = [
  { id: 'top_priorities', title: 'Top Priorities' },
  { id: 'job_search_pipe', title: 'Job Search Pipe' },
  { id: 'intelligence_monitoring', title: 'Intelligence & Monitoring' },
  { id: 'tonights_mission', title: "Tonight's Mission" },
  { id: 'family_personal', title: 'Family & Personal' },
  { id: 'done', title: 'Done' },
];

export default function KanbanBoard({ userId }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    })
  );

  // Load initial tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks(userId);
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();

    // Subscribe to real-time updates
    const subscription = supabase
      .from('tasks')
      .on('*', (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks((prev) => [...prev, payload.new as Task]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks((prev) =>
            prev.map((t) => (t.id === payload.new.id ? payload.new : t) as Task)
          );
        } else if (payload.eventType === 'DELETE') {
          setTasks((prev) => prev.filter((t) => t.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  const handleAddTask = async (
    title: string,
    description: string,
    column: KanbanColumn
  ) => {
    try {
      await createTask(userId, title, column, description);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleEditTask = async (
    title: string,
    description: string,
    column: KanbanColumn
  ) => {
    if (!selectedTask) return;

    try {
      await updateTask(selectedTask.id, {
        title,
        description,
        column,
      });
      setIsFormOpen(false);
      setSelectedTask(undefined);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overData = over.data?.current;
    const targetColumn = (overData?.column || overData?.task?.column) as KanbanColumn;

    if (targetColumn && activeTask.column !== targetColumn) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeTask.id ? { ...t, column: targetColumn } : t
        )
      );
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overData = over.data?.current;
    const targetColumn = (overData?.column || overData?.task?.column) as KanbanColumn;

    // Recalculate positions for the target column
    const tasksInTargetColumn = tasks
      .filter((t) => t.column === targetColumn)
      .sort((a, b) => a.position - b.position);

    try {
      await moveTask(activeTask.id, targetColumn, tasksInTargetColumn.length);
    } catch (error) {
      console.error('Failed to move task:', error);
      // Revert on error
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeTask.id ? { ...t, column: activeTask.column } : t
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center text-cyber-border">
        [LOADING MISSION DATA...]
      </div>
    );
  }

  const columnTaskMap = COLUMNS.reduce(
    (acc, col) => {
      acc[col.id] = tasks.filter((t) => t.column === col.id);
      return acc;
    },
    {} as Record<KanbanColumn, Task[]>
  );

  return (
    <div className="bg-cyber-bg min-h-screen">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-0 auto-rows-max">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col.id}
              title={col.title}
              tasks={columnTaskMap[col.id]}
              onEditTask={(task) => {
                setSelectedTask(task);
                setIsFormOpen(true);
              }}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DndContext>

      <button
        onClick={() => {
          setSelectedTask(undefined);
          setIsFormOpen(true);
        }}
        className="fixed bottom-8 right-8 bg-cyber-border text-cyber-bg px-6 py-3 font-bold text-lg hover:bg-cyber-accent transition-colors cursor-pointer shadow-lg shadow-cyber-border"
      >
        [+ NEW TASK]
      </button>

      <TaskForm
        task={selectedTask}
        isOpen={isFormOpen}
        onSubmit={selectedTask ? handleEditTask : handleAddTask}
        onCancel={() => {
          setIsFormOpen(false);
          setSelectedTask(undefined);
        }}
      />
    </div>
  );
}
