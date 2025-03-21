import { DataPanel } from '@/components/Admin/DataPanel';
import AdminMenu from '@/components/Admin/AdminMenu';
import { useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';

const handleSequence = (sequenceNumber: number): string => {
  switch (sequenceNumber) {
    case 1:
      return 'Displaying registered users';
    case 2:
      return 'Displaying personal accounts';
    case 3:
      return 'Displaying business accounts';
    case 4:
      return 'Displaying all orders';
    case 5:
      return 'Displaying pending orders';
    case 6:
      return 'Displaying finished orders';
    default:
      return 'Please select a menu option to display data.';
  }
};

const AdminPage = () => {
  const [sequenceNumber, setSequenceNumber] = useState(1);

  return (
    <>
      <Box pt={'60px'}>
        <Heading size={'sm'} textAlign="center">
          {handleSequence(sequenceNumber)}
        </Heading>
        <AdminMenu setSequence={setSequenceNumber} />
        <DataPanel sequenceNumber={sequenceNumber} />
      </Box>
    </>
  );
};
export default AdminPage;
