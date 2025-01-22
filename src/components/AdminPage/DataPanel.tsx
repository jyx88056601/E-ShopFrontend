import UserDataPanel from './UserDataPanel';

type DataPanelProps = {
  sequenceNumber: number;
};

export const DataPanel = ({ sequenceNumber }: DataPanelProps) => {
  return (
    <>{sequenceNumber === 1 ? <UserDataPanel></UserDataPanel> : null}</>

    // <TableContainer>
    //   <Table variant="simple">
    //     <TableCaption placement="top" fontSize={'lg'}>
    //       {renderContent()}
    //     </TableCaption>
    //     {sequenceNumber >= 1 && sequenceNumber <= 3 ? (
    //       <Thead>
    //         <Tr>
    //           <Th>Email Address</Th>
    //           <Th>ID</Th>
    //           <Th>Username</Th>
    //           <Th>Phone number</Th>
    //           <Th>Authority</Th>
    //           <Th>Active</Th>
    //           <Th>Registration Time</Th>
    //           <Th>Last update time</Th>
    //           <Th>Delete</Th>
    //         </Tr>
    //       </Thead>
    //     ) : null}
    //     <Tbody>
    //       <Tr>
    //         <Td>jyx2018@gmail.com</Td>
    //         <Td>5</Td>
    //         <Td>Ethan</Td>
    //         <Td>7789189888</Td>
    //         <Td>ROLE_ADMIN</Td>
    //         <Td>
    //           <Button>Active</Button>
    //         </Td>
    //         <Th>Today</Th>
    //         <Th>Today</Th>
    //         <Th>
    //           <Button color={'red.500'}>Delete</Button>
    //         </Th>
    //       </Tr>
    //     </Tbody>
    //     <Tfoot>
    //       <Tr>
    //         <Th>Backend : http://localhost:8080</Th>
    //       </Tr>
    //     </Tfoot>
    //   </Table>
    // </TableContainer>
  );
};
