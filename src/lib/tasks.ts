import { supabase } from './supabase';
import { Task, KanbanColumn } from '@/types';

export async function getTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('position', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createTask(
  userId: string,
  title: string,
  column: KanbanColumn,
  description?: string
) {
  const { data: tasks } = await supabase
    .from('tasks')
    .select('position')
    .eq('user_id', userId)
    .eq('column', column)
    .order('position', { ascending: false })
    .limit(1);

  const nextPosition = (tasks?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: userId,
      title,
      description,
      column,
      position: nextPosition,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(
  taskId: string,
  updates: Partial<Task>
) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) throw error;
}

export async function moveTask(
  taskId: string,
  targetColumn: KanbanColumn,
  targetPosition: number
) {
  return updateTask(taskId, {
    board_column: targetColumn,
    position: targetPosition,
  });
}
