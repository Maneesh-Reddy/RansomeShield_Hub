import React, { useState } from 'react';
import { CheckCircle, PlusCircle, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function DefenseToolkit() {
  const { checklist, toggleChecklistItem, addChecklistItem } = useStore();
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      addChecklistItem(newItem.trim());
      setNewItem('');
      toast.success('Security measure added to checklist');
    }
  };

  const simulateBackup = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Simulating backup process...',
        success: 'Backup completed successfully!',
        error: 'Backup failed. Please try again.',
      }
    );
  };

  return (
    <div className="bg-white py-20" id="toolkit">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Defense Toolkit</h2>
            <p className="text-xl text-gray-600">
              Build your security checklist and simulate backup procedures
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Security Checklist</h3>
            <form onSubmit={handleAddItem} className="mb-6 flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new security measure..."
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <PlusCircle className="h-5 w-5" />
                Add
              </button>
            </form>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <button
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`rounded-full p-1 ${
                      item.completed ? 'text-green-500' : 'text-gray-400'
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" />
                  </button>
                  <span
                    className={`flex-1 ${
                      item.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Backup Simulation</h3>
            <p className="text-gray-600 mb-4">
              Test your backup and restore procedures in a safe environment
            </p>
            <button
              onClick={simulateBackup}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Start Backup Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}