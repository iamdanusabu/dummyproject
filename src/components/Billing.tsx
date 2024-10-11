import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Printer, Mail } from 'lucide-react';

const dummyTransactions = [
  { id: '123456', customer: 'John Doe', date: '2023-03-15', items: [{ name: 'Shirt', quantity: 2, price: 100 }], status: 'Delivered' },
  { id: '234567', customer: 'Jane Smith', date: '2023-03-16', items: [{ name: 'Pants', quantity: 3, price: 250 }], status: 'Delivered' },
  { id: '345678', customer: 'John Doe', date: '2023-03-17', items: [{ name: 'Dress', quantity: 1, price: 1200 }], status: 'Delivered' },
];

const Billing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    // In a real application, you would fetch the transaction details from an API
    const foundTransaction = dummyTransactions.find(t => t.id === id);
    if (foundTransaction) {
      setTransaction(foundTransaction);
    } else {
      toast.error('Transaction not found');
    }
  }, [id]);

  if (!transaction) {
    return <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">Loading...</div>;
  }

  const subtotal = transaction.items.reduce((total: number, item: any) => total + item.quantity * item.price, 0);
  const tax = subtotal * 0.05; // Assuming 5% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Bill</h1>
        
        <div className="mb-6">
          <p><strong>Transaction ID:</strong> {transaction.id}</p>
          <p><strong>Customer:</strong> {transaction.customer}</p>
          <p><strong>Date:</strong> {transaction.date}</p>
        </div>

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

        <div className="flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2">
            <Printer size={20} className="inline mr-1" />
            Print Bill
          </button>
          <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            <Mail size={20} className="inline mr-1" />
            Email Bill to Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;