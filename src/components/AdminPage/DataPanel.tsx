import BusinessUserPanel from './BusinessUserPanel';
import PersonalUserPanel from './PersonalUserPanel';
import UserDataPanel from './UserDataPanel';

type DataPanelProps = {
  sequenceNumber: number;
};

export const DataPanel = ({ sequenceNumber }: DataPanelProps) => {
  return (
    <>
      <>{sequenceNumber === 1 ? <UserDataPanel></UserDataPanel> : null}</>
      <>
        {sequenceNumber === 2 ? <PersonalUserPanel></PersonalUserPanel> : null}
      </>
      <>
        {sequenceNumber === 3 ? <BusinessUserPanel></BusinessUserPanel> : null}
      </>
    </>
  );
};
