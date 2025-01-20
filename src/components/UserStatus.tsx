import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const UserStatus = () => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate('/login');
  };

  return (
    <AiOutlineUser
      onClick={handleClick}
      color="white"
      size={28}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default UserStatus;
