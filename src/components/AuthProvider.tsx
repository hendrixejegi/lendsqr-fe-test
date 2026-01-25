import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

type AuthContextType = {
  user: string | null;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('lendsqr-session'),
  );

  const signIn = () => {
    const user = 'Test Admin';
    setUser(user);
    localStorage.setItem('lendsqr-session', user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
