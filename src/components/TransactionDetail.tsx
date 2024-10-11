import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Printer, Mail } from 'lucide-react';

const dummyTransactions = [
  {
    id: '123456',
    customer: 'John Doe',
    date: '2023-03-15',
    items: [{ name: 'Shirt', quantity: 2, price: 100 }],
    status: 'In Queue',
  },
  {
    id: '234567',
    customer: 'Jane Smith',
    date: '2023-03-16',
    items: [{ name: 'Pants', quantity: 3, price: 250 }],
    status: 'Ready to Deliver',
  },
  {
    id: '345678',
    customer: 'John Doe',
    date: '2023-03-17',
    items: [{ name: 'Dress', quantity: 1, price: 1200 }],
    status: 'Delivered',
  },
];

const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    // In a real application, you would fetch the transaction details from an API
    const foundTransaction = dummyTransactions.find((t) => t.id === id);
    if (foundTransaction) {
      setTransaction(foundTransaction);
    } else {
      toast.error('Transaction not found');
    }
  }, [id]);

  const handleStatusChange = (newStatus: string) => {
    setTransaction({ ...transaction, status: newStatus });
    toast.success(`Status updated to ${newStatus}`);
  };

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Transaction Detail</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <strong>Transaction ID:</strong> {transaction.id}
            </p>
            <p>
              <strong>Customer:</strong> {transaction.customer}
            </p>
            <p>
              <strong>Date:</strong> {transaction.date}
            </p>
          </div>
          <div>
            <p>
              <strong>Status:</strong> {transaction.status}
            </p>
            <select
              value={transaction.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="mt-2 p-2 border rounded"
            >
              <option value="In Queue">In Queue</option>
              <option value="Ready to Deliver">Ready to Deliver</option>
              <option value="Delivered">Delivered</option>
              <option value="Ironing">Ironing</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Items</h2>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items.map((item: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">₹{item.price}</td>
                <td className="p-2">₹{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center">
          <div>
            <p>
              <strong>Total Amount:</strong> ₹
              {transaction.items.reduce(
                (total: number, item: any) =>
                  total + item.quantity * item.price,
                0
              )}
            </p>
          </div>
          <div>
            {transaction.status === 'Delivered' && (
              <Link
                to={`/billing/${transaction.id}`}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mr-2"
              >
                <Printer size={20} className="inline mr-1" />
                Generate Bill
              </Link>
            )}
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              <Mail size={20} className="inline mr-1" />
              Email Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
