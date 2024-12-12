'use client';
import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data with new structure
const initialUsers = [
  { id: 1, LotteryNumber: "1", Owner: "Test", Class: "12A" },
  { id: 2, LotteryNumber: "2", Owner: "Test", Class: "12B" },
  { id: 3, LotteryNumber: "3", Owner: "Test", Class: "12A" },
  { id: 4, LotteryNumber: "4", Owner: "Test", Class: "12C" },
  { id: 5, LotteryNumber: "5", Owner: "Test", Class: "12B" },
];

export default function ThreeColumnTable() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ LotteryNumber: "", Owner: "", Class: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState(""); // State for the filter input

  // Handle the Add User form submission
  const handleAddUser = () => {
    if (newUser.LotteryNumber && newUser.Owner && newUser.Class) {
      const newId = users.length + 1;  // Unique ID based on the length of users
      const addedUser = { id: newId, ...newUser };
      setUsers([...users, addedUser]);
      setNewUser({ LotteryNumber: "", Owner: "", Class: "" });  // Reset form
      setIsModalOpen(false);  // Close modal
    }
  };

  // Handle the Delete User functionality
  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  // Filter users based on LotteryNumber
  const filteredUsers = users.filter(user => user.LotteryNumber.includes(filter));

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm Vé Số
        </button>
        
        {/* Filter Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Filter by Lottery Number"
            className="p-2 border border-gray-300 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}  // Update filter state on input change
          />
        </div>
      </div>

      <Table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <TableCaption></TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px] px-6 py-3 text-left text-sm font-medium text-gray-500">Lottery Number</TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-500">Owner</TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-500">Class</TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
              <TableCell className="px-6 py-3 text-sm text-gray-800 font-medium">{user.LotteryNumber}</TableCell>
              <TableCell className="px-6 py-3 text-sm text-gray-800">{user.Owner}</TableCell>
              <TableCell className="px-6 py-3 text-sm text-gray-800">{user.Class}</TableCell>
              <TableCell className="px-6 py-3 text-sm text-gray-800">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Adding User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New User</h2>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Lottery Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newUser.LotteryNumber}
                onChange={(e) => setNewUser({ ...newUser, LotteryNumber: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Owner</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newUser.Owner}
                onChange={(e) => setNewUser({ ...newUser, Owner: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Class</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newUser.Class}
                onChange={(e) => setNewUser({ ...newUser, Class: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
