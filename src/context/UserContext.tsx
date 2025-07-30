
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';



export interface User {
  username: string;
  email: string;
  password?: string; 
}

export type EntryType = 'note' | 'task';
export type EntryStatus = 'pending' | 'completed' | null; 

export interface BaseEntry {
  id: string;
  type: EntryType;
  name: string;
  description: string;
  createdAt: string; 
}

export interface NoteEntry extends BaseEntry {
  type: 'note';
  status: null; 
}

export interface TaskEntry extends BaseEntry {
  type: 'task';
  status: EntryStatus;
}

export type Entry = NoteEntry | TaskEntry;




export interface UserContextType {
  users: User[];
  addUser: (userData: User) => void;
  updateUser: (index: number, userData: User) => void;
  deleteUser: (index: number) => void;
  setAllUsers: (newUsers: User[]) => void;
  authenticateUser: (username: string, password: string) => User | undefined;

  entries: Entry[];  
}


export const UserContext = createContext<UserContextType | undefined>(undefined);


export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};


interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  
  useEffect(() => {
    const stored = localStorage.getItem('users');    
    if (stored) {        
      setUsers(JSON.parse(stored));
    } else {        
      const defaultAdmin: User = {
        username: 'admin',
        email: 'admin@qargo.com',
        password: 'admin123',
      };
      setUsers([defaultAdmin]);
      localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }

    
    const now = new Date();
    const today = now.getDay();
   
    const diffToMonday = today === 0 ? -6 : 1 - today;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(9, 0, 0, 0); 

    const mockEntries: Entry[] = [
      // Notes
      { id: crypto.randomUUID(), type: 'note', name: 'Note 1', description: 'This is Note 1', status: null, createdAt: new Date(monday).toISOString() },
      { id: crypto.randomUUID(), type: 'note', name: 'Note 2', description: 'This is Note 2', status: null, createdAt: new Date(monday.getTime() + 3600000 * 2).toISOString() },
      { id: crypto.randomUUID(), type: 'note', name: 'Note 3', description: 'This is Note 3', status: null, createdAt: new Date(monday.getTime() + 3600000 * 4).toISOString() },
      // Completed Tasks
      { id: crypto.randomUUID(), type: 'task', name: 'Task 1', description: 'Completed task 1', status: 'completed', createdAt: new Date(monday.getTime() + 3600000 * 12).toISOString() },
      { id: crypto.randomUUID(), type: 'task', name: 'Task 2', description: 'Completed task 2', status: 'completed', createdAt: new Date(monday.getTime() + 3600000 * 14).toISOString() },
      { id: crypto.randomUUID(), type: 'task', name: 'Task 3', description: 'Completed task 3', status: 'completed', createdAt: new Date(monday.getTime() + 3600000 * 16).toISOString() },
    ];

    setEntries(mockEntries);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);


  
  const addUser = (userData: User) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const updateUser = (index: number, userData: User) => {
    setUsers((prevUsers) => {
      const updated = [...prevUsers];
      if (index >= 0 && index < updated.length) { // Basic bounds checking
        updated[index] = userData;
      }
      return updated;
    });
  };

  const deleteUser = (index: number) => {
    setUsers((prevUsers) => prevUsers.filter((_, idx) => idx !== index));
  };

  const setAllUsers = (newUsers: User[]) => {
    setUsers(newUsers);
  };

  const authenticateUser = (username: string, password: string): User | undefined => {    
    return users.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password
    );
  }; 

  const contextValue: UserContextType = {
    users,
    addUser,
    updateUser,
    deleteUser,
    setAllUsers,
    authenticateUser,
    entries,   
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};