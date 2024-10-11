import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

const dummyTransactions = [
  { id: '123456', customer: 'John Doe', status: 'In Queue', amount: 500 },
  {
    id: '234567',
    customer: 'Jane Smith',
    status: 'Ready to Deliver',
    amount: 750,
  },
  { id: '345678', customer: 'John Doe', status: 'Delivered', amount: 1200 },
];

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleBulkStatusUpdate = (newStatus: string) => {
    setTransactions(
      transactions.map((t) =>
        selectedTransactions.includes(t.id) ? { ...t, status: newStatus } : t
      )
    );
    setSelectedTransactions([]);
  };

  const filteredTransactions =
    statusFilter === 'All'
      ? transactions
      : transactions.filter((t) => t.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Transaction List</h1>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Filter size={20} className="mr-2" />
              <select
                className="p-2 border rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="In Queue">In Queue</option>
                <option value="Ready to Deliver">Ready to Deliver</option>
                <option value="Delivered">Delivered</option>
                <option value="Ironing">Ironing</option>
              </select>
            </div>
            {selectedTransactions.length > 0 && (
              <div>
                <select
                  className="p-2 border rounded mr-2"
                  onChange={(e) => handleBulkStatusUpdate(e.target.value)}
                >
                  <option value="">Bulk Update Status</option>
                  <option value="In Queue">In Queue</option>
                  <option value="Ready to Deliver">Ready to Deliver</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Ironing">Ironing</option>
                </select>
                <span>{selectedTransactions.length} selected</span>
              </div>
            )}
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTransactions(
                          filteredTransactions.map((t) => t.id)
                        );
                      } else {
                        setSelectedTransactions([]);
                      }
                    }}
                  />
                </th>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTransactions([
                            ...selectedTransactions,
                            transaction.id,
                          ]);
                        } else {
                          setSelectedTransactions(
                            selectedTransactions.filter(
                              (id) => id !== transaction.id
                            )
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="p-2">{transaction.id}</td>
                  <td className="p-2">{transaction.customer}</td>
                  <td className="p-2">
                    <select
                      value={transaction.status}
                      onChange={(e) =>
                        handleStatusChange(transaction.id, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      <option value="In Queue">In Queue</option>
                      <option value="Ready to Deliver">Ready to Deliver</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Ironing">Ironing</option>
                    </select>
                  </td>
                  <td className="p-2">₹{transaction.amount}</td>
                  <td className="p-2">
                    <Link
                      to={`/transaction/${transaction.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
