import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

// shared data type
interface UsernameContext {
  username: string | null;
  setUsername: (username: string | null) => void;
}

// create context object with default data
const UserContext = createContext<UsernameContext>({
  username: null,
  setUsername: () => {},
});

// created context object -> useContext hook -> custom hook
export const useUser = () => useContext(UserContext);

// the provider that can pass the data to any componts that are wrapped by itself
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  );

  useEffect(() => {
    if (username !== null) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username'); // Clean up when username is null
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
