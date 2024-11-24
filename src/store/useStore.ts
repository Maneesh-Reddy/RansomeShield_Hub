import { create } from 'zustand';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

interface SecurityAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
}

interface Store {
  checklist: ChecklistItem[];
  alerts: SecurityAlert[];
  addChecklistItem: (title: string) => void;
  toggleChecklistItem: (id: string) => void;
  addAlert: (alert: Omit<SecurityAlert, 'id' | 'timestamp'>) => void;
  clearAlerts: () => void;
}

export const useStore = create<Store>((set) => ({
  checklist: [
    { id: '1', title: 'Enable two-factor authentication', completed: false },
    { id: '2', title: 'Update system passwords', completed: false },
    { id: '3', title: 'Configure backup schedule', completed: false },
  ],
  alerts: [],
  addChecklistItem: (title) =>
    set((state) => ({
      checklist: [
        ...state.checklist,
        { id: Date.now().toString(), title, completed: false },
      ],
    })),
  toggleChecklistItem: (id) =>
    set((state) => ({
      checklist: state.checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        { ...alert, id: Date.now().toString(), timestamp: Date.now() },
        ...state.alerts,
      ].slice(0, 50), // Keep last 50 alerts
    })),
  clearAlerts: () => set({ alerts: [] }),
}));