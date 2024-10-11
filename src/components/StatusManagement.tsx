import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, X, Move } from 'lucide-react';

const StatusManagement: React.FC = () => {
  const [statuses, setStatuses] = useState(['In Queue', 'Ready to Deliver', 'Delivered']);
  const [newStatus, setNewStatus] = useState('');

  const handleReorder = (startIndex: number, endIndex: number) => {
    const result = Array.from(statuses);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setStatuses(result);
  };

  const handleAddStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStatus.trim() && !statuses.includes(newStatus.trim())) {
      setStatuses([...statuses, newStatus.trim()]);
      setNewStatus('');
      toast.success('New status added');
    } else {
      toast.error('Invalid status or already exists');
    }
  };

  const handleDeleteStatus = (status: string) => {
    setStatuses(statuses.filter(s => s !== status));
    toast.success('Status deleted');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Status Management</h1>

        <ul className="mb-6">
          {statuses.map((status, index) => (
            <li
              key={status}
              className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded cursor-move"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const startIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                const endIndex = index;
                handleReorder(startIndex, endIndex);
              }}
            >
              <div className="flex items-center">
                <Move size={20} className="mr-2 text-gray-500" />
                {status}
              </div>
              <button
                onClick={() => handleDeleteStatus(status)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddStatus} className="flex items-center">
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="Enter new status"
            className="flex-grow p-2 border rounded-l"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600"
          >
            <Plus size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default StatusManagement;