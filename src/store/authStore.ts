
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  username: string;
  role: 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// In a real app, this would be authenticated against a backend service
const mockAdmin: User = {
  id: '1',
  username: 'admin',
  role: 'admin'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call with setTimeout
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            if (username === 'admin' && password === 'password') {
              set({ 
                user: mockAdmin, 
                isAuthenticated: true,
                isLoading: false
              });
              toast.success('Logged in successfully');
              resolve(true);
            } else {
              set({ isLoading: false });
              toast.error('Invalid username or password');
              resolve(false);
            }
          }, 1000);
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        toast.success('Logged out successfully');
      },
    }),
    {
      name: 'jeyam-cars-auth',
    }
  )
);
