import React from 'react';

const Employees = () => {
  const employees = [
    { id: 1, name: 'John Doe', designation: 'Manager', jobType: 'Full-Time', status: 'Active' },
    // More employees here
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">All Employees</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
        Add Employee
      </button>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Designation</th>
            <th className="p-3">Job Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-center">{emp.id}</td>
              <td className="p-3">{emp.name}</td>
              <td className="p-3">{emp.designation}</td>
              <td className="p-3">{emp.jobType}</td>
              <td className="p-3">{emp.status}</td>
              <td className="p-3 text-center">
                <button className="bg-yellow-400 px-3 py-1 rounded text-white mr-2">Edit</button>
                <button className="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
