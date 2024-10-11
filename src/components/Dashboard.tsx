import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Shirt } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const transactionData = {
    labels: ['In Queue', 'Ready to Deliver', 'Delivered'],
    datasets: [
      {
        label: 'Transactions by Status',
        data: [40, 30, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Transactions by Status',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Transactions</h2>
            <p className="text-3xl font-bold">100</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold">₹150,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              Avg. Transaction Value
            </h2>
            <p className="text-3xl font-bold">₹1,500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Most Common Items</h2>
            <div className="flex items-center space-x-4">
              <Shirt size={24} />
              <Shirt size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <Bar options={options} data={transactionData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/customer-item"
            className="bg-indigo-600 text-white p-6 rounded-lg shadow text-center hover:bg-indigo-700 transition duration-300"
          >
            <h2 className="text-xl font-semibold">
              Customer & Item Management
            </h2>
          </Link>
          <Link
            to="/transactions"
            className="bg-green-600 text-white p-6 rounded-lg shadow text-center hover:bg-green-700 transition duration-300"
          >
            <h2 className="text-xl font-semibold">Transaction List</h2>
          </Link>
          <Link
            to="/status-management"
            className="bg-yellow-600 text-white p-6 rounded-lg shadow text-center hover:bg-yellow-700 transition duration-300"
          >
            <h2 className="text-xl font-semibold">Status Management</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
