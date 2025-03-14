import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme.ts';
import App from './App.tsx';
import { UserProvider } from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <UserProvider>
      <App />
    </UserProvider>
  </ChakraProvider>
);
