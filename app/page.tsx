'use client';
import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import thantai from "@/public/z6123997477704_ef40a949fd1bb170c4413b48ddfc6543.gif";
import meothantai from "@/public/pngtree-2020-new-year-god-of-wealth-cartoon-cute-gif-element-png-image_6678268.jpg"
// Define TypeScript types for user data
interface User {
  id: string;
  lotteryNumber: string;
  name: string;
  class: string;
  link: string;
}

// API URL
const apiUrl = "https://675ad58c9ce247eb1934befa.mockapi.io/lottery";

export default function ThreeColumnTable() {
  const [users, setUsers] = useState<User[]>([]);  // Array of users
  const [newUser, setNewUser] = useState<User>({ id: "", lotteryNumber: "", name: "", class: "", link: "" });  // New user form
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal open state
  const [filter, setFilter] = useState("");  // State for filter input

  // Fetch the users from the API when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(apiUrl);
      const data: User[] = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Handle the Add User form submission
  const handleAddUser = async () => {
    if (newUser.lotteryNumber && newUser.name && newUser.class) {
      const addedUser = { ...newUser };

      // Send POST request to the API to add a new user
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addedUser),
      });

      const newUserData = await response.json();

      setUsers((prevUsers) => [...prevUsers, newUserData]);  // Update the local state with the new user
      setNewUser({ id: "", lotteryNumber: "", name: "", class: "", link: "" });  // Reset form
      setIsModalOpen(false);  // Close modal
    }
  };

  // Handle the Delete User functionality
  const handleDeleteUser = async (id: string) => {
    // Send DELETE request to the API to remove the user
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });

    // Remove the user from local state
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Filter users based on LotteryNumber
  const filteredUsers = users.filter(user => user.lotteryNumber.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ backgroundImage: `url(${thantai.src})` }} className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-full shadow-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-lg">✨</span> Thêm Vé Số <span className="text-lg">✨</span>
          </button>

          {/* Filter Input */}
          <div className="mt-4 md:mt-0 flex items-center bg-yellow-100 rounded-full px-4 py-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Lọc theo số vé..."
              className="bg-transparent focus:outline-none w-48 md:w-64"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <Table>
            <TableCaption className="bg-yellow-400 text-white p-4 text-lg font-bold">
              🎉 Danh Sách Vé Số May Mắn 🎉
            </TableCaption>
            <TableHeader className="bg-yellow-300">
              <TableRow>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Số Vé</TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Người Sở Hữu</TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Lớp</TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Facebook</TableHead>
                <TableHead className="px-6 py-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-yellow-50 transition-colors">
                  <TableCell className="px-6 py-4 text-lg font-bold text-yellow-600">{user.lotteryNumber}
                  </TableCell>
                  <TableCell className="px-6 py-4">{user.name}</TableCell>
                  <TableCell className="px-6 py-4">{user.class}</TableCell>
                  <TableCell className="px-6 py-4">
                    <a href={user.link} target="_blank" rel="noopener noreferrer">
                      {user.link}
                    </a>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Xóa
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Modal for Adding User */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-yellow-100 p-8 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4m6 0h4m-4-4v16m2-2h-.5M15 11l-3 3-3-3m0 0V9m3 3h-3" />
                </svg>
                Thêm Vé Số Mới
              </h2>
              <div className="mb-4">
                <label className="block text-yellow-800 font-semibold mb-2" htmlFor="lotteryNumber">
                  Số Vé
                </label>
                <input
                  type="number"
                  id="lotteryNumber"
                  className="w-full px-4 py-3 border border-yellow-400 bg-yellow-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  value={newUser.lotteryNumber}
                  onChange={(e) => setNewUser({ ...newUser, lotteryNumber: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-800 font-semibold mb-2" htmlFor="owner">
                  Người Sở Hữu
                </label>
                <input
                  type="text"
                  id="owner"
                  className="w-full px-4 py-3 border border-yellow-400 bg-yellow-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-yellow-800 font-semibold mb-2" htmlFor="class">
                  Lớp
                </label>
                <input
                  type="text"
                  id="class"
                  className="w-full px-4 py-3 border border-yellow-400 bg-yellow-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  value={newUser.class}
                  onChange={(e) => setNewUser({ ...newUser, class: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-yellow-800 font-semibold mb-2" htmlFor="link">
                  Facebook
                </label>
                <input
                  type="link"
                  id="link"
                  className="w-full px-4 py-3 border border-yellow-400 bg-yellow-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  value={newUser.link}
                  onChange={(e) => setNewUser({ ...newUser, link: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg mr-3 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={handleAddUser}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}