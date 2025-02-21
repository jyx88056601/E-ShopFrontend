import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type ProductProps = {
  id: string;
  name: string;
  price: string;
  stock: string;
  category: string;
  createdTime: string;
  updatedTime: string;
  awsUrls: string[];
  mainPictureUrl: string;
};

const Product = ({ mainPictureUrl, price, name, id }: ProductProps) => {
  const navigate = useNavigate();

  const handleClickProduct = (id: string) => {
    navigate('/personal/product/' + id);
  };

  return (
    <Card size={'350px'}>
      <Tooltip label="Click for details">
        <CardBody>
          <HStack justifyContent={'space-between'}>
            <Image
              src={mainPictureUrl}
              onClick={() => handleClickProduct(id)}
            ></Image>
          </HStack>
          <HStack
            justifyContent="space-between"
            marginTop="5px"
            marginBottom={'5px'}
          >
            <Heading fontSize="large">{name}</Heading>
            <Heading fontSize="medium">{'$' + price}</Heading>
          </HStack>
          <Button bg={'black'} color={'white'} width={'100%'}>
            Add to Cart
          </Button>
        </CardBody>
      </Tooltip>
    </Card>
  );
};

export default Product;
