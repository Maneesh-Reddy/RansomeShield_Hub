import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface SecurityAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
}

export const checklistApi = {
  getAll: () => api.get<ChecklistItem[]>('/checklist').then((res) => res.data),
  create: (title: string) => 
    api.post<ChecklistItem>('/checklist', { title }).then((res) => res.data),
  toggle: (id: string) => 
    api.patch<ChecklistItem>(`/checklist/${id}/toggle`).then((res) => res.data),
};

export const alertsApi = {
  getAll: () => api.get<SecurityAlert[]>('/alerts').then((res) => res.data),
  create: (alert: Omit<SecurityAlert, 'id' | 'timestamp'>) =>
    api.post<SecurityAlert>('/alerts', alert).then((res) => res.data),
  clear: () => api.delete('/alerts').then((res) => res.data),
};