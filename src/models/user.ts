import { useState } from "react";
import { fetchUsers, getUserById, addUser, updateUser, deleteUser } from "@/services/user";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function useUserModel() {
  const [list, setList] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUserList = async () => {
    const response = await fetchUsers();
    if (response.success) setList(response.data);
  };

  const fetchUserDetail = async (id: string) => {
    const response = await getUserById(id);
    if (response.success) setCurrentUser(response.data);
  };

  const createUser = async (userData: Omit<User, "id">) => {
    const response = await addUser(userData);
    if (response.success) setList((prev) => [...prev, response.data]);
  };

  const modifyUser = async (id: string, userData: Partial<User>) => {
    const response = await updateUser(id, userData);
    if (response.success) {
      setList((prev) => prev.map((user) => (user.id === id ? { ...user, ...response.data } : user)));
    }
  };

  const removeUser = async (id: string) => {
    const response = await deleteUser(id);
    if (response.success) {
      setList((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return {
    list,
    currentUser,
    fetchUserList,
    fetchUserDetail,
    createUser,
    modifyUser,
    removeUser,
  };
}
