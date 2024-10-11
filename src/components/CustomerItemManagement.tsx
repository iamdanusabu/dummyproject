import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Search, Plus } from 'lucide-react';

const CustomerItemManagement: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [labels, setLabels] = useState('');
  const [tags, setTags] = useState('');
  const [customer, setCustomer] = useState<{ name: string; phone: string } | null>(null);

  const dummyCustomers = [
    { name: 'John Doe', phone: '1234567890' },
    { name: 'Jane Smith', phone: '9876543210' },
  ];

  const handleSearch = () => {
    const foundCustomer = dummyCustomers.find(c => c.phone === phoneNumber);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      toast.success(`Customer found: ${foundCustomer.name}`);
    } else {
      setCustomer(null);
      toast.error('Customer not found. Please add a new customer.');
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) {
      toast.error('Please select a customer first');
      return;
    }
    // In a real application, you would send this data to your backend
    console.log('New item:', { itemName, quantity, price, labels, tags });
    toast.success('Item added successfully');
    // Generate a dummy transaction ID
    const transactionId = Math.floor(100000 + Math.random() * 900000);
    toast.info(`Transaction ID: ${transactionId}`);
    // Reset form
    setItemName('');
    setQuantity('');
    setPrice('');
    setLabels('');
    setTags('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Customer & Item Management</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Search Customer</h2>
          <div className="flex items-center">
            <input
              type="tel"
              placeholder="Enter phone number"
              className="flex-grow p-2 border rounded-l"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {customer && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
          </div>
        )}

        <form onSubmit={handleAddItem}>
          <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Item Name"
              className="p-2 border rounded"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              className="p-2 border rounded"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="p-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Labels (comma-separated)"
              className="p-2 border rounded"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              className="p-2 border rounded"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center w-full"
          >
            <Plus size={20} className="mr-2" />
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerItemManagement;