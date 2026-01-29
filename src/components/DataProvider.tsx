import {
  createContext,
  type PropsWithChildren,
  Suspense,
  use,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getUsers } from '@/api/getUsers';

import { ErrorBoundary } from './ErrorBoundary';

const STORAGE_KEY = 'lendsqr_user_data';

type DataContextType = {
  data: User[];
  activateUser(id: string): void;
  blacklistUser(id: string): void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export default function DataProvider({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <DataProviderInner>{children}</DataProviderInner>
      </Suspense>
    </ErrorBoundary>
  );
}

function DataProviderInner({ children }: PropsWithChildren) {
  const fetchedData = use(getUsers());

  // initialized with local storage
  const [cachedData, setCachedData] = useState<User[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback if parse fails
        return fetchedData;
      }
    }
    return fetchedData;
  });

  // sync whenever cache changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedData));
  }, [cachedData]);

  const activateUser = (id: string) => {
    setCachedData((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'active' } : user,
      ),
    );
  };

  const blacklistUser = (id: string) => {
    setCachedData((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'blacklisted' } : user,
      ),
    );
  };

  return (
    <DataContext.Provider
      value={{ data: cachedData, activateUser, blacklistUser }}
    >
      {children}
    </DataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useData must be used within an DataProvider');
  }

  return context;
};
