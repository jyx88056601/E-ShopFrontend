import DefaultAPIClient from '@/service/DefaultAPIClient';
import { Role, UserSignupDTO } from '../data/entities';
import {
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  Button,
  Container,
  VStack,
} from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react/form-control';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const defaultAPIClient = new DefaultAPIClient('/signup');
// const apiCheck = new APIClient<String>('/check-user-name');

const SignUpForm = () => {
  const navigate = useNavigate();
  // handle username input
  const [username, setUsername] = useState('');
  // const [userExist, setUserExist] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const isValidUsername = (username: string): boolean => {
    return username.length !== 0 && username.length <= 10;
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setIsUsernameValid(isValidUsername(e.target.value));
    // const data = await apiCheck.check(e.target.value); // 等待返回的数据
    // console.log(data);
    // const isUserExist = data === 'true';
    // setUserExist(isUserExist);
    // if (!userExist) {
    // }
  };

  // handle password input
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isValidPassword = (password: string): boolean => {
    return password.length >= 10;
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(isValidPassword(e.target.value));
  };

  const [repeatPassword, setRepeatPassword] = useState('');
  const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState(false);
  const isValidRepeatPassword = (repeatPassword: string): boolean => {
    return repeatPassword === password;
  };
  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value);
    setIsRepeatedPasswordValid(isValidRepeatPassword(e.target.value));
  };

  // handle email input
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(isValidEmail(e.target.value));
  };

  // handle phone number input
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    return phoneNumber.length === 11 || phoneNumber.length === 10;
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setIsPhoneNumberValid(isValidPhoneNumber(e.target.value));
  };

  // handle radio group
  const [radioRole, setRadioRole] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<Role>(Role.ROLE_BUYER);
  const [roleSetup, setRoleSetup] = useState(false);
  const handleRadioGroup = (value: string): void => {
    if (value === 'Personal') {
      setRole(Role.ROLE_BUYER);
    } else {
      setRole(Role.ROLE_SELLER);
    }
    setRadioRole(radioRole);
    setRoleSetup(true);
  };

  // sign up response
  const [signUpResponse, setSignUpResponse] = useState('');

  const isInputValid =
    roleSetup &&
    isUsernameValid &&
    isEmailValid &&
    isRepeatedPasswordValid &&
    isPasswordValid &&
    isPhoneNumberValid;

  const submitButtonInitProps = {
    bg: 'black',
    color: 'white',
    type: 'submit',
    mt: '4',
    p: '20px',
    filter: 'blur(1px)',
    ':hover': {
      bg: 'white',
      color: 'black',
    },
  };

  const submitButtonProps = {
    bg: 'black',
    color: 'white',
    type: 'submit',
    mt: '4',
    p: '20px',
    ':hover': {
      bg: 'white',
      color: 'black',
    },
  };

  // sign up
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!isInputValid) return;
    const userSignupDTO: UserSignupDTO = {
      username,
      email,
      phoneNumber,
      password,
      role,
    };

    defaultAPIClient
      .signup(userSignupDTO)
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setSignUpResponse(error.response.data);
        }
      });
  }

  return (
    <Container maxWidth={'5xl'}>
      <form onSubmit={handleSubmit}>
        <FormControl as="fieldset">
          <FormLabel fontSize={25} textAlign={'center'}>
            Create account
          </FormLabel>

          <Text>
            Username
            <Text as="span" color="red.500">
              *
            </Text>
          </Text>

          <Input
            id="input_1"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          {!isUsernameValid && username.length !== 0 ? (
            <FormHelperText color={'red.300'}>
              Please enter a valid username.
            </FormHelperText>
          ) : (
            <FormErrorMessage></FormErrorMessage>
          )}
          {/* {userExist ? (
            <FormHelperText color={'red.300'}>user existed</FormHelperText>
          ) : null} */}
          <Text>
            Password
            <Text as="span" color="red.500">
              *
            </Text>
          </Text>
          <Input
            id="input_2"
            type={passwordVisibility ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            onMouseEnter={() => setPasswordVisibility(true)}
            onMouseLeave={() => setPasswordVisibility(false)}
          />
          {!isPasswordValid && password.length !== 0 ? (
            <FormHelperText color={'red.300'}>
              Please enter a valid password.
            </FormHelperText>
          ) : null}

          <Text>
            Repeat Password
            <Text as="span" color="red.500">
              *
            </Text>
          </Text>
          <Input
            id="input_3"
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
          {!isRepeatedPasswordValid && repeatPassword.length !== 0 ? (
            <FormHelperText color={'red.300'}>
              Please repeat the password.
            </FormHelperText>
          ) : null}

          {!isValidRepeatPassword && repeatPassword.length !== 0 ? (
            <FormErrorMessage color={'red.300'}>
              Passwords do not match.
            </FormErrorMessage>
          ) : null}

          <Text>
            Phone Number
            <Text as="span" color="red.500">
              *
            </Text>
          </Text>
          <Input
            id="input_4"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {!isPhoneNumberValid && phoneNumber.length !== 0 ? (
            <FormHelperText color={'red.300'}>
              Please enter a valid phone number.
            </FormHelperText>
          ) : null}

          <Text>
            Email
            <Text as="span" color="red.500">
              *
            </Text>
          </Text>
          <Input
            id="input_5"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && email.length !== 0 ? (
            <FormHelperText color={'red.300'}>
              A valid Email address is required
            </FormHelperText>
          ) : null}

          <RadioGroup onChange={handleRadioGroup} value={radioRole}>
            <HStack spacing="24px">
              <Radio value="Personal">Personal</Radio>
              <Radio value="Business">Business</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <VStack>
          <Button
            type="submit"
            loadingText="Signing up"
            sx={isInputValid ? submitButtonProps : submitButtonInitProps}
          >
            Sign up
          </Button>
          {signUpResponse.length !== 0 ? (
            <Text color={'red.300'}>{signUpResponse} </Text>
          ) : null}
        </VStack>
      </form>
    </Container>
  );
};

export default SignUpForm;
