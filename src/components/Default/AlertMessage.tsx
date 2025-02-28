import { Alert, AlertIcon } from '@chakra-ui/react';

type AlertMessageProps = {
  message: string;
  status: 'info' | 'warning' | 'success' | 'error' | 'loading';
};
const AlertMessage = ({ message, status }: AlertMessageProps) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default AlertMessage;
